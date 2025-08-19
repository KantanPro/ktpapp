const { contextBridge, ipcRenderer } = require('electron');

// レンダラープロセスに安全にAPIを公開
contextBridge.exposeInMainWorld('electronAPI', {
  // 設定関連
  getSettings: () => ipcRenderer.invoke('get-settings'),
  saveSettings: (settings) => ipcRenderer.invoke('save-settings', settings),
  getSetting: (key) => ipcRenderer.invoke('get-setting', key),
  setSetting: (key, value) => ipcRenderer.invoke('set-setting', key, value),

  // メニューイベントリスナー
  onMenuNewFile: (callback) => ipcRenderer.on('menu-new-file', callback),
  onMenuOpenFile: (callback) => ipcRenderer.on('menu-open-file', callback),

  // データベース操作
  // 顧客関連
  getClients: (limit, offset) => ipcRenderer.invoke('db-get-clients', limit, offset),
  createClient: (clientData) => ipcRenderer.invoke('db-create-client', clientData),
  updateClient: (id, clientData) => ipcRenderer.invoke('db-update-client', id, clientData),
  deleteClient: (id) => ipcRenderer.invoke('db-delete-client', id),

  // サービス関連
  getServices: (limit, offset) => ipcRenderer.invoke('db-get-services', limit, offset),
  createService: (serviceData) => ipcRenderer.invoke('db-create-service', serviceData),
  updateService: (id, serviceData) => ipcRenderer.invoke('db-update-service', id, serviceData),
  deleteService: (id) => ipcRenderer.invoke('db-delete-service', id),

  // 協力会社関連
  getSuppliers: (limit, offset) => ipcRenderer.invoke('db-get-suppliers', limit, offset),
  createSupplier: (supplierData) => ipcRenderer.invoke('db-create-supplier', supplierData),
  updateSupplier: (id, supplierData) => ipcRenderer.invoke('db-update-supplier', id, supplierData),
  deleteSupplier: (id) => ipcRenderer.invoke('db-delete-supplier', id),

  // 受注関連
  getOrders: (limit, offset, status) => ipcRenderer.invoke('db-get-orders', limit, offset, status),
  createOrder: (orderData) => ipcRenderer.invoke('db-create-order', orderData),
  updateOrderStatus: (id, status) => ipcRenderer.invoke('db-update-order-status', id, status),

  // チャット関連
  getChatMessages: (orderId, limit) => ipcRenderer.invoke('db-get-chat-messages', orderId, limit),
  addChatMessage: (orderId, userName, message) => ipcRenderer.invoke('db-add-chat-message', orderId, userName, message),

  // レポート関連
  getSalesReport: (startDate, endDate) => ipcRenderer.invoke('db-get-sales-report', startDate, endDate),
  getMonthlyReport: (year, month) => ipcRenderer.invoke('db-get-monthly-report', year, month),

  // PDF・メール関連
  generatePDF: (type, data) => ipcRenderer.invoke('generate-pdf', type, data),
  sendEmail: (emailData) => ipcRenderer.invoke('send-email', emailData),

  // イベントリスナーの削除
  removeAllListeners: (channel) => ipcRenderer.removeAllListeners(channel)
});