const Database = require('better-sqlite3');
const path = require('path');
const { app } = require('electron');

class DatabaseManager {
  constructor() {
    this.db = null;
    this.dbPath = path.join(app.getPath('userData'), 'kantanpro.db');
  }

  async init() {
    try {
      this.db = new Database(this.dbPath);
      console.log('データベースに接続しました:', this.dbPath);
      await this.createTables();
      return Promise.resolve();
    } catch (error) {
      console.error('データベース接続エラー:', error);
      return Promise.reject(error);
    }
  }

  createTables() {
    const tables = [
      // 顧客テーブル
      `CREATE TABLE IF NOT EXISTS clients (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact_person TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        department TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // サービステーブル
      `CREATE TABLE IF NOT EXISTS services (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT,
        unit_price DECIMAL(10,2),
        unit TEXT DEFAULT '式',
        tax_rate DECIMAL(5,2) DEFAULT 10.0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // 協力会社テーブル
      `CREATE TABLE IF NOT EXISTS suppliers (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        contact_person TEXT,
        email TEXT,
        phone TEXT,
        address TEXT,
        skills TEXT,
        qualified_invoice_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`,
      
      // 受注テーブル
      `CREATE TABLE IF NOT EXISTS orders (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        client_id INTEGER,
        project_name TEXT NOT NULL,
        description TEXT,
        status TEXT DEFAULT '受注',
        total_amount DECIMAL(12,2),
        tax_amount DECIMAL(12,2),
        deadline DATE,
        completion_date DATE,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (client_id) REFERENCES clients (id)
      )`,
      
      // 受注項目テーブル
      `CREATE TABLE IF NOT EXISTS order_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        service_id INTEGER,
        service_name TEXT,
        quantity DECIMAL(10,2) DEFAULT 1,
        unit_price DECIMAL(10,2),
        tax_rate DECIMAL(5,2) DEFAULT 10.0,
        amount DECIMAL(12,2),
        notes TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders (id),
        FOREIGN KEY (service_id) REFERENCES services (id)
      )`,
      
      // コスト項目テーブル
      `CREATE TABLE IF NOT EXISTS cost_items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        supplier_id INTEGER,
        supplier_name TEXT,
        item_name TEXT,
        quantity DECIMAL(10,2) DEFAULT 1,
        unit_price DECIMAL(10,2),
        tax_rate DECIMAL(5,2) DEFAULT 10.0,
        amount DECIMAL(12,2),
        notes TEXT,
        qualified_invoice_number TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders (id),
        FOREIGN KEY (supplier_id) REFERENCES suppliers (id)
      )`,
      
      // チャットメッセージテーブル
      `CREATE TABLE IF NOT EXISTS chat_messages (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        order_id INTEGER,
        user_name TEXT,
        message TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (order_id) REFERENCES orders (id)
      )`,
      
      // 設定テーブル
      `CREATE TABLE IF NOT EXISTS settings (
        key TEXT PRIMARY KEY,
        value TEXT,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )`
    ];

    for (const sql of tables) {
      this.db.exec(sql);
    }

    // インデックス作成
    const indexes = [
      'CREATE INDEX IF NOT EXISTS idx_orders_client_id ON orders(client_id)',
      'CREATE INDEX IF NOT EXISTS idx_orders_status ON orders(status)',
      'CREATE INDEX IF NOT EXISTS idx_order_items_order_id ON order_items(order_id)',
      'CREATE INDEX IF NOT EXISTS idx_cost_items_order_id ON cost_items(order_id)',
      'CREATE INDEX IF NOT EXISTS idx_chat_messages_order_id ON chat_messages(order_id)'
    ];

    for (const sql of indexes) {
      this.db.exec(sql);
    }

    console.log('データベーステーブルを作成しました');
  }

  run(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      const result = stmt.run(params);
      return Promise.resolve({ id: result.lastInsertRowid, changes: result.changes });
    } catch (error) {
      console.error('SQL実行エラー:', error, sql);
      return Promise.reject(error);
    }
  }

  get(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      const result = stmt.get(params);
      return Promise.resolve(result);
    } catch (error) {
      console.error('SQL取得エラー:', error, sql);
      return Promise.reject(error);
    }
  }

  all(sql, params = []) {
    try {
      const stmt = this.db.prepare(sql);
      const result = stmt.all(params);
      return Promise.resolve(result);
    } catch (error) {
      console.error('SQL全取得エラー:', error, sql);
      return Promise.reject(error);
    }
  }

  // 顧客関連メソッド
  async getClients(limit = 20, offset = 0) {
    return this.all(
      'SELECT * FROM clients ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
  }

  async createClient(clientData) {
    const { name, contact_person, email, phone, address, department } = clientData;
    return this.run(
      `INSERT INTO clients (name, contact_person, email, phone, address, department)
       VALUES (?, ?, ?, ?, ?, ?)`,
      [name, contact_person, email, phone, address, department]
    );
  }

  async updateClient(id, clientData) {
    const { name, contact_person, email, phone, address, department } = clientData;
    return this.run(
      `UPDATE clients SET 
       name = ?, contact_person = ?, email = ?, phone = ?, address = ?, department = ?,
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, contact_person, email, phone, address, department, id]
    );
  }

  async deleteClient(id) {
    return this.run('DELETE FROM clients WHERE id = ?', [id]);
  }

  // サービス関連メソッド
  async getServices(limit = 20, offset = 0) {
    return this.all(
      'SELECT * FROM services ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
  }

  async createService(serviceData) {
    const { name, description, unit_price, unit, tax_rate } = serviceData;
    return this.run(
      `INSERT INTO services (name, description, unit_price, unit, tax_rate)
       VALUES (?, ?, ?, ?, ?)`,
      [name, description, unit_price, unit, tax_rate]
    );
  }

  async updateService(id, serviceData) {
    const { name, description, unit_price, unit, tax_rate } = serviceData;
    return this.run(
      `UPDATE services SET 
       name = ?, description = ?, unit_price = ?, unit = ?, tax_rate = ?,
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, description, unit_price, unit, tax_rate, id]
    );
  }

  async deleteService(id) {
    return this.run('DELETE FROM services WHERE id = ?', [id]);
  }

  // 協力会社関連メソッド
  async getSuppliers(limit = 20, offset = 0) {
    return this.all(
      'SELECT * FROM suppliers ORDER BY created_at DESC LIMIT ? OFFSET ?',
      [limit, offset]
    );
  }

  async createSupplier(supplierData) {
    const { name, contact_person, email, phone, address, skills, qualified_invoice_number } = supplierData;
    return this.run(
      `INSERT INTO suppliers (name, contact_person, email, phone, address, skills, qualified_invoice_number)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [name, contact_person, email, phone, address, skills, qualified_invoice_number]
    );
  }

  async updateSupplier(id, supplierData) {
    const { name, contact_person, email, phone, address, skills, qualified_invoice_number } = supplierData;
    return this.run(
      `UPDATE suppliers SET 
       name = ?, contact_person = ?, email = ?, phone = ?, address = ?, skills = ?, qualified_invoice_number = ?,
       updated_at = CURRENT_TIMESTAMP
       WHERE id = ?`,
      [name, contact_person, email, phone, address, skills, qualified_invoice_number, id]
    );
  }

  async deleteSupplier(id) {
    return this.run('DELETE FROM suppliers WHERE id = ?', [id]);
  }

  // 受注関連メソッド
  async getOrders(limit = 20, offset = 0, status = null) {
    let sql = `
      SELECT o.*, c.name as client_name 
      FROM orders o 
      LEFT JOIN clients c ON o.client_id = c.id
    `;
    let params = [];

    if (status) {
      sql += ' WHERE o.status = ?';
      params.push(status);
    }

    sql += ' ORDER BY o.created_at DESC LIMIT ? OFFSET ?';
    params.push(limit, offset);

    return this.all(sql, params);
  }

  async createOrder(orderData) {
    const { client_id, project_name, description, status, total_amount, tax_amount, deadline } = orderData;
    return this.run(
      `INSERT INTO orders (client_id, project_name, description, status, total_amount, tax_amount, deadline)
       VALUES (?, ?, ?, ?, ?, ?, ?)`,
      [client_id, project_name, description, status, total_amount, tax_amount, deadline]
    );
  }

  async updateOrderStatus(id, status) {
    const completion_date = (status === '完了') ? new Date().toISOString().split('T')[0] : null;
    return this.run(
      'UPDATE orders SET status = ?, completion_date = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?',
      [status, completion_date, id]
    );
  }

  // チャット関連メソッド
  async getChatMessages(order_id, limit = 50) {
    return this.all(
      'SELECT * FROM chat_messages WHERE order_id = ? ORDER BY created_at DESC LIMIT ?',
      [order_id, limit]
    );
  }

  async addChatMessage(order_id, user_name, message) {
    return this.run(
      'INSERT INTO chat_messages (order_id, user_name, message) VALUES (?, ?, ?)',
      [order_id, user_name, message]
    );
  }

  // 設定関連メソッド
  async getSetting(key) {
    const row = await this.get('SELECT value FROM settings WHERE key = ?', [key]);
    return row ? JSON.parse(row.value) : null;
  }

  async setSetting(key, value) {
    const jsonValue = JSON.stringify(value);
    return this.run(
      `INSERT OR REPLACE INTO settings (key, value, updated_at) 
       VALUES (?, ?, CURRENT_TIMESTAMP)`,
      [key, jsonValue]
    );
  }

  // レポート関連メソッド
  async getSalesReport(startDate, endDate) {
    return this.all(
      `SELECT 
        DATE(o.created_at) as date,
        SUM(o.total_amount) as total_sales,
        COUNT(*) as order_count
       FROM orders o 
       WHERE o.status IN ('完了', '支払い') 
       AND DATE(o.created_at) BETWEEN ? AND ?
       GROUP BY DATE(o.created_at)
       ORDER BY date DESC`,
      [startDate, endDate]
    );
  }

  async getMonthlyReport(year, month) {
    const startDate = `${year}-${month.toString().padStart(2, '0')}-01`;
    const endDate = `${year}-${month.toString().padStart(2, '0')}-31`;
    
    return this.all(
      `SELECT 
        o.*,
        c.name as client_name,
        SUM(oi.amount) as item_total
       FROM orders o
       LEFT JOIN clients c ON o.client_id = c.id
       LEFT JOIN order_items oi ON o.id = oi.order_id
       WHERE o.status IN ('完了', '支払い')
       AND DATE(o.completion_date) BETWEEN ? AND ?
       GROUP BY o.id
       ORDER BY o.completion_date DESC`,
      [startDate, endDate]
    );
  }

  close() {
    if (this.db) {
      try {
        this.db.close();
        console.log('データベース接続を切断しました');
      } catch (error) {
        console.error('データベース切断エラー:', error);
      }
    }
  }
}

module.exports = DatabaseManager;