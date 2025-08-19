const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const Store = require("electron-store");
const DatabaseManager = require("./database");

// 設定ストア
const store = new Store();

// データベースインスタンス
let database = null;

let mainWindow;
let settingsWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    webPreferences: {
      nodeIntegration: false,
      contextIsolation: true,
      preload: path.join(__dirname, "preload.js"),
    },
    icon: path.join(__dirname, "../assets/icon.png"),
    titleBarStyle: "default",
    show: false,
  });

  // 開発環境では localhost、本番環境では build フォルダを読み込み
  const isDev = process.env.NODE_ENV === "development";
  if (isDev) {
    mainWindow.loadURL("http://localhost:3000");
    mainWindow.webContents.openDevTools();
  } else {
    mainWindow.loadFile(path.join(__dirname, "../renderer/build/index.html"));
  }

  mainWindow.once("ready-to-show", () => {
    mainWindow.show();
  });

  mainWindow.on("closed", () => {
    mainWindow = null;
  });

  // メニューバー設定
  createMenu();
}

function createMenu() {
  const template = [
    {
      label: "ファイル",
      submenu: [
        {
          label: "新規作成",
          accelerator: "CmdOrCtrl+N",
          click: () => {
            mainWindow.webContents.send("menu-new-file");
          },
        },
        {
          label: "開く",
          accelerator: "CmdOrCtrl+O",
          click: async () => {
            const result = await dialog.showOpenDialog(mainWindow, {
              properties: ["openFile"],
              filters: [{ name: "All Files", extensions: ["*"] }],
            });
            if (!result.canceled) {
              mainWindow.webContents.send(
                "menu-open-file",
                result.filePaths[0]
              );
            }
          },
        },
        { type: "separator" },
        {
          label: "終了",
          accelerator: process.platform === "darwin" ? "Cmd+Q" : "Ctrl+Q",
          click: () => {
            app.quit();
          },
        },
      ],
    },
    {
      label: "編集",
      submenu: [
        { role: "undo", label: "元に戻す" },
        { role: "redo", label: "やり直し" },
        { type: "separator" },
        { role: "cut", label: "切り取り" },
        { role: "copy", label: "コピー" },
        { role: "paste", label: "貼り付け" },
      ],
    },
    {
      label: "表示",
      submenu: [
        { role: "reload", label: "再読み込み" },
        { role: "forceReload", label: "強制再読み込み" },
        { role: "toggleDevTools", label: "開発者ツール" },
        { type: "separator" },
        { role: "resetZoom", label: "ズームリセット" },
        { role: "zoomIn", label: "ズームイン" },
        { role: "zoomOut", label: "ズームアウト" },
        { type: "separator" },
        { role: "togglefullscreen", label: "フルスクリーン切り替え" },
      ],
    },
    {
      label: "ヘルプ",
      submenu: [
        {
          label: "KantanProについて",
          click: () => {
            dialog.showMessageBox(mainWindow, {
              type: "info",
              title: "KantanProについて",
              message: "KantanPro Desktop Application",
              detail: "Version 1.0.0\n© 2024 KantanPro",
            });
          },
        },
      ],
    },
  ];

  const menu = Menu.buildFromTemplate(template);
  Menu.setApplicationMenu(menu);
}

// IPC ハンドラー
ipcMain.handle("get-settings", () => {
  return store.store;
});

ipcMain.handle("save-settings", (event, settings) => {
  Object.keys(settings).forEach((key) => {
    store.set(key, settings[key]);
  });
  return true;
});

ipcMain.handle("get-setting", (event, key) => {
  return store.get(key);
});

ipcMain.handle("set-setting", (event, key, value) => {
  store.set(key, value);
  return true;
});

// データベース関連のIPCハンドラー
ipcMain.handle("db-get-clients", async (event, limit, offset) => {
  if (!database) return [];
  return await database.getClients(limit, offset);
});

ipcMain.handle("db-create-client", async (event, clientData) => {
  if (!database) return null;
  return await database.createClient(clientData);
});

ipcMain.handle("db-update-client", async (event, id, clientData) => {
  if (!database) return null;
  return await database.updateClient(id, clientData);
});

ipcMain.handle("db-delete-client", async (event, id) => {
  if (!database) return null;
  return await database.deleteClient(id);
});

ipcMain.handle("db-get-services", async (event, limit, offset) => {
  if (!database) return [];
  return await database.getServices(limit, offset);
});

ipcMain.handle("db-create-service", async (event, serviceData) => {
  if (!database) return null;
  return await database.createService(serviceData);
});

ipcMain.handle("db-update-service", async (event, id, serviceData) => {
  if (!database) return null;
  return await database.updateService(id, serviceData);
});

ipcMain.handle("db-delete-service", async (event, id) => {
  if (!database) return null;
  return await database.deleteService(id);
});

ipcMain.handle("db-get-suppliers", async (event, limit, offset) => {
  if (!database) return [];
  return await database.getSuppliers(limit, offset);
});

ipcMain.handle("db-create-supplier", async (event, supplierData) => {
  if (!database) return null;
  return await database.createSupplier(supplierData);
});

ipcMain.handle("db-update-supplier", async (event, id, supplierData) => {
  if (!database) return null;
  return await database.updateSupplier(id, supplierData);
});

ipcMain.handle("db-delete-supplier", async (event, id) => {
  if (!database) return null;
  return await database.deleteSupplier(id);
});

ipcMain.handle("db-get-orders", async (event, limit, offset, status) => {
  if (!database) return [];
  return await database.getOrders(limit, offset, status);
});

ipcMain.handle("db-create-order", async (event, orderData) => {
  if (!database) return null;
  return await database.createOrder(orderData);
});

ipcMain.handle("db-update-order-status", async (event, id, status) => {
  if (!database) return null;
  return await database.updateOrderStatus(id, status);
});

ipcMain.handle("db-get-chat-messages", async (event, orderId, limit) => {
  if (!database) return [];
  return await database.getChatMessages(orderId, limit);
});

ipcMain.handle(
  "db-add-chat-message",
  async (event, orderId, userName, message) => {
    if (!database) return null;
    return await database.addChatMessage(orderId, userName, message);
  }
);

ipcMain.handle("db-get-sales-report", async (event, startDate, endDate) => {
  if (!database) return [];
  return await database.getSalesReport(startDate, endDate);
});

ipcMain.handle("db-get-monthly-report", async (event, year, month) => {
  if (!database) return [];
  return await database.getMonthlyReport(year, month);
});

// PDF生成関連
ipcMain.handle("generate-pdf", async (event, type, data) => {
  // PDF生成ロジックをここに実装
  console.log("PDF生成:", type, data);
  return { success: true, path: "/path/to/generated.pdf" };
});

// メール送信関連
ipcMain.handle("send-email", async (event, emailData) => {
  // メール送信ロジックをここに実装
  console.log("メール送信:", emailData);
  return { success: true, messageId: "test-message-id" };
});

app.whenReady().then(async () => {
  try {
    // データベース初期化
    database = new DatabaseManager();
    await database.init();
    console.log("データベースが正常に初期化されました");
  } catch (error) {
    console.error("データベース初期化エラー:", error);
  }

  createWindow();
});

app.on("window-all-closed", () => {
  // データベース接続を閉じる
  if (database) {
    database.close();
  }

  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on("before-quit", () => {
  // アプリ終了前にデータベース接続を閉じる
  if (database) {
    database.close();
  }
});
