import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { 
  FaPlus, FaFileInvoice, FaPrint, FaDownload, FaEdit, FaTrash, FaEye,
  FaSearch, FaFilter, FaCalendarAlt, FaMoneyBillWave, FaUser, FaSave
} from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 30px;
  
  h2 {
    margin: 0;
    color: #495057;
  }
`;

const ActionBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  flex-wrap: wrap;
`;

const ActionButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 16px;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-size: 14px;
  font-weight: 500;
  transition: all 0.2s ease;
  
  &.primary {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
    }
  }
  
  &.secondary {
    background: #f8f9fa;
    color: #495057;
    border: 1px solid #e9ecef;
    
    &:hover {
      background: #e9ecef;
    }
  }
  
  &.danger {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const SearchBar = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  padding: 10px 16px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
  }
`;

const FilterSelect = styled.select`
  padding: 10px 16px;
  border: 1px solid #e9ecef;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
  }
`;

const DataTable = styled.div`
  background: white;
  border-radius: 8px;
  overflow: hidden;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  background: #f8f9fa;
  border-bottom: 1px solid #e9ecef;
  font-weight: 600;
  color: #495057;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr;
  gap: 16px;
  padding: 16px;
  border-bottom: 1px solid #f1f3f4;
  align-items: center;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  
  &.受注 {
    background: #e3f2fd;
    color: #1976d2;
  }
  
  &.進行中 {
    background: #fff3e0;
    color: #f57c00;
  }
  
  &.完了 {
    background: #e8f5e8;
    color: #388e3c;
  }
  
  &.支払い {
    background: #f3e5f5;
    color: #7b1fa2;
  }
`;

const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  max-width: 600px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    color: #495057;
  }
  
  button {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #6c757d;
    
    &:hover {
      color: #495057;
    }
  }
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
  
  label {
    display: block;
    margin-bottom: 8px;
    font-weight: 500;
    color: #495057;
  }
  
  input, select, textarea {
    width: 100%;
    padding: 10px 12px;
    border: 1px solid #e9ecef;
    border-radius: 6px;
    font-size: 14px;
    
    &:focus {
      outline: none;
      border-color: #667eea;
      box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
    }
  }
  
  textarea {
    resize: vertical;
    min-height: 80px;
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 30px;
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 60px 20px;
  color: #6c757d;
  
  svg {
    font-size: 48px;
    margin-bottom: 16px;
    opacity: 0.5;
  }
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;

const formatCurrency = (amount) => {
  if (!amount) return '¥0';
  return `¥${Number(amount).toLocaleString()}`;
};

const formatDate = (dateString) => {
  if (!dateString) return '-';
  return new Date(dateString).toLocaleDateString('ja-JP');
};

function InvoiceManager() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [showInvoiceModal, setShowInvoiceModal] = useState(false);
  const [showPreviewModal, setShowPreviewModal] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [invoiceForm, setInvoiceForm] = useState({
    invoiceNumber: '',
    issueDate: new Date().toISOString().split('T')[0],
    dueDate: '',
    notes: '',
    taxRate: 10
  });
  const [pdfData, setPdfData] = useState(null);
  const pdfRef = useRef(null);

  useEffect(() => {
    loadOrders();
  }, []);

  const loadOrders = async () => {
    try {
      setLoading(true);
      if (window.electronAPI) {
        const orderData = await window.electronAPI.getOrders(1000, 0);
        setOrders(orderData);
      }
    } catch (error) {
      console.error('受注データの読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateInvoice = (orderId) => {
    if (orderId === 'new') {
      // 新規請求書作成
      setSelectedOrder(null);
      setInvoiceForm({
        invoiceNumber: `INV-${Date.now()}`,
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        notes: '',
        taxRate: 10
      });
    } else {
      // 既存受注から請求書作成
      const order = orders.find(o => o.id === orderId);
      if (order) {
        setSelectedOrder(order);
        setInvoiceForm({
          invoiceNumber: `INV-${order.id}-${Date.now()}`,
          issueDate: new Date().toISOString().split('T')[0],
          dueDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
          notes: `案件: ${order.project_name}`,
          taxRate: 10
        });
      }
    }
    setShowInvoiceModal(true);
  };

  const handleInvoiceSubmit = async () => {
    try {
      // 請求書データを保存（実際の実装ではデータベースに保存）
      const invoiceData = {
        ...invoiceForm,
        orderId: selectedOrder?.id,
        orderData: selectedOrder,
        totalAmount: selectedOrder?.total_amount || 0,
        taxAmount: (selectedOrder?.total_amount || 0) * (invoiceForm.taxRate / 100),
        status: '未払い'
      };
      
      console.log('請求書作成:', invoiceData);
      
      // 請求書をPDFとして生成・保存
      if (window.electronAPI) {
        try {
          const result = await window.electronAPI.generatePDF('invoice', invoiceData);
          if (result.success) {
            alert(`請求書が正常に作成されました！\n保存場所: ${result.path}`);
          } else {
            alert('請求書の作成に失敗しました。');
          }
        } catch (error) {
          console.error('PDF生成エラー:', error);
          alert('PDFの生成に失敗しました。');
        }
      } else {
        // PDF生成APIが利用できない場合
        alert('請求書が正常に作成されました！\n（PDF出力機能は利用できません）');
      }
      
      // モーダルを閉じる
      setShowInvoiceModal(false);
      setSelectedOrder(null);
      setInvoiceForm({
        invoiceNumber: '',
        issueDate: new Date().toISOString().split('T')[0],
        dueDate: '',
        notes: '',
        taxRate: 10
      });
      
    } catch (error) {
      console.error('請求書作成エラー:', error);
      alert('請求書の作成に失敗しました。');
    }
  };

  const generatePDFPreview = () => {
    try {
      // HTMLベースの請求書プレビューを生成
      const invoiceHTML = generateInvoiceHTML();
      
      // HTMLをBlobとして生成
      const htmlBlob = new Blob([invoiceHTML], { type: 'text/html' });
      const htmlUrl = URL.createObjectURL(htmlBlob);
      setPdfData(htmlUrl);
      setShowPreviewModal(true);
      
    } catch (error) {
      console.error('プレビュー生成エラー:', error);
      alert('プレビューの生成に失敗しました。');
    }
  };

  const generateInvoiceHTML = () => {
    const totalAmount = selectedOrder?.total_amount || 0;
    const taxAmount = totalAmount * (invoiceForm.taxRate / 100);
    const totalWithTax = totalAmount + taxAmount;
    
    return `
      <!DOCTYPE html>
      <html>
      <head>
        <meta charset="UTF-8">
        <title>請求書 - ${invoiceForm.invoiceNumber}</title>
        <style>
          body { 
            font-family: 'Hiragino Sans', 'Yu Gothic', 'Meiryo', sans-serif; 
            margin: 40px; 
            line-height: 1.6;
          }
          .header { 
            text-align: center; 
            border-bottom: 2px solid #333; 
            padding-bottom: 20px; 
            margin-bottom: 30px; 
          }
          .title { 
            font-size: 28px; 
            font-weight: bold; 
            margin: 0; 
          }
          .info-section { 
            margin-bottom: 30px; 
          }
          .info-row { 
            margin-bottom: 15px; 
            display: flex;
            align-items: center;
          }
          .label { 
            font-weight: bold; 
            display: inline-block; 
            width: 120px; 
            margin-right: 20px;
          }
          .amount-section { 
            background: #f8f9fa; 
            padding: 20px; 
            border-radius: 8px; 
            margin: 20px 0; 
            border: 1px solid #e9ecef;
          }
          .amount-row { 
            display: flex; 
            justify-content: space-between; 
            margin-bottom: 10px; 
            padding: 5px 0;
          }
          .total { 
            font-size: 18px; 
            font-weight: bold; 
            border-top: 1px solid #333; 
            padding-top: 10px; 
            margin-top: 15px;
          }
          .footer { 
            text-align: center; 
            margin-top: 40px; 
            padding-top: 20px; 
            border-top: 1px solid #ccc; 
          }
          @media print {
            body { margin: 20px; }
            .amount-section { background: #f8f9fa !important; }
            .header, .footer { border-color: #333 !important; }
          }
        </style>
      </head>
      <body>
        <div class="header">
          <h1 class="title">請求書</h1>
        </div>
        
        <div class="info-section">
          <div class="info-row">
            <span class="label">請求書番号:</span>
            <span>${invoiceForm.invoiceNumber}</span>
          </div>
          <div class="info-row">
            <span class="label">発行日:</span>
            <span>${invoiceForm.issueDate}</span>
          </div>
          <div class="info-row">
            <span class="label">支払期限:</span>
            <span>${invoiceForm.dueDate}</span>
          </div>
          ${selectedOrder ? `
          <div class="info-row">
            <span class="label">案件名:</span>
            <span>${selectedOrder.project_name}</span>
          </div>
          <div class="info-row">
            <span class="label">顧客名:</span>
            <span>${selectedOrder.client_name || '未設定'}</span>
          </div>
          ` : ''}
        </div>
        
        <div class="amount-section">
          <div class="amount-row">
            <span>税抜金額:</span>
            <span>¥${totalAmount.toLocaleString()}</span>
          </div>
          <div class="amount-row">
            <span>消費税 (${invoiceForm.taxRate}%):</span>
            <span>¥${taxAmount.toLocaleString()}</span>
          </div>
          <div class="amount-row total">
            <span>税込金額:</span>
            <span>¥${totalWithTax.toLocaleString()}</span>
          </div>
        </div>
        
        ${invoiceForm.notes ? `
        <div class="info-section">
          <div class="label">備考:</div>
          <div style="margin-top: 10px;">${invoiceForm.notes}</div>
        </div>
        ` : ''}
        
        <div class="footer">
          <p>この度はご利用いただき、ありがとうございます。</p>
        </div>
      </body>
      </html>
    `;
  };

  const downloadPDF = () => {
    try {
      // 印刷用のウィンドウを開く
      const printWindow = window.open('', '_blank');
      const invoiceHTML = generateInvoiceHTML();
      
      printWindow.document.write(invoiceHTML);
      printWindow.document.close();
      
      // 印刷ダイアログを開く（PDFとして保存可能）
      printWindow.focus();
      printWindow.print();
      
      // 印刷完了後にウィンドウを閉じる
      setTimeout(() => {
        printWindow.close();
      }, 1000);
      
    } catch (error) {
      console.error('PDF生成エラー:', error);
      alert('PDFの生成に失敗しました。');
    }
  };

  const closeInvoiceModal = () => {
    setShowInvoiceModal(false);
    setSelectedOrder(null);
    setInvoiceForm({
      invoiceNumber: '',
      issueDate: new Date().toISOString().split('T')[0],
      dueDate: '',
      notes: '',
      taxRate: 10
    });
  };

  const closePreviewModal = () => {
    setShowPreviewModal(false);
    if (pdfData) {
      URL.revokeObjectURL(pdfData);
      setPdfData(null);
    }
  };

  const handleCreateOrderForm = (orderId) => {
    // 受注書作成処理
    console.log('受注書作成:', orderId);
  };

  const handlePrint = (orderId) => {
    // 印刷処理
    console.log('印刷:', orderId);
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.project_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client_name?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <Container>読み込み中...</Container>;
  }

  return (
    <Container>
      <Header>
        <h2>伝票処理</h2>
      </Header>

      <ActionBar>
        <ActionButton primary onClick={() => handleCreateOrderForm('new')}>
          <FaPlus />
          新規受注書
        </ActionButton>
        <ActionButton secondary onClick={() => handleCreateInvoice('new')}>
          <FaFileInvoice />
          請求書作成
        </ActionButton>
        <ActionButton secondary onClick={() => handlePrint('all')}>
          <FaPrint />
          一括印刷
        </ActionButton>
        <ActionButton secondary onClick={() => handlePrint('export')}>
          <FaDownload />
          データ出力
        </ActionButton>
      </ActionBar>

      <SearchBar>
        <SearchInput
          type="text"
          placeholder="案件名、顧客名で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <FilterSelect
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="all">すべてのステータス</option>
          <option value="受注">受注</option>
          <option value="進行中">進行中</option>
          <option value="完了">完了</option>
          <option value="支払い">支払い</option>
        </FilterSelect>
      </SearchBar>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          <FaFileInvoice />
          <h3>受注データがありません</h3>
          <p>受注データを作成するか、ダミーデータ管理からサンプルデータを追加してください</p>
        </EmptyState>
      ) : (
        <DataTable>
          <TableHeader>
            <div>案件名</div>
            <div>顧客</div>
            <div>ステータス</div>
            <div>金額</div>
            <div>納期</div>
            <div>操作</div>
          </TableHeader>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <div>
                <div style={{ fontWeight: '500' }}>{order.project_name}</div>
                <div style={{ fontSize: '12px', color: '#6c757d' }}>
                  {order.description}
                </div>
              </div>
              <div>{order.client_name || '未設定'}</div>
              <div>
                <StatusBadge className={order.status}>
                  {order.status}
                </StatusBadge>
              </div>
              <div>{formatCurrency(order.total_amount)}</div>
              <div>{formatDate(order.deadline)}</div>
              <div style={{ display: 'flex', gap: '8px' }}>
                <ActionButton
                  secondary
                  onClick={() => handleCreateOrderForm(order.id)}
                  title="受注書作成"
                >
                  <FaFileInvoice />
                </ActionButton>
                <ActionButton
                  secondary
                  onClick={() => handleCreateInvoice(order.id)}
                  title="請求書作成"
                >
                  <FaMoneyBillWave />
                </ActionButton>
                <ActionButton
                  secondary
                  onClick={() => handlePrint(order.id)}
                  title="印刷"
                >
                  <FaPrint />
                </ActionButton>
              </div>
            </TableRow>
          ))}
                  </DataTable>
        )}

      {/* 請求書作成モーダル */}
      {showInvoiceModal && (
        <Modal onClick={closeInvoiceModal}>
          <ModalContent onClick={(e) => e.stopPropagation()}>
            <ModalHeader>
              <h3>請求書作成</h3>
              <button onClick={closeInvoiceModal}>&times;</button>
            </ModalHeader>
            
            {selectedOrder && (
              <FormGroup>
                <label>対象案件</label>
                <input
                  type="text"
                  value={selectedOrder.project_name}
                  disabled
                />
              </FormGroup>
            )}
            
            <FormGroup>
              <label>請求書番号</label>
              <input
                type="text"
                value={invoiceForm.invoiceNumber}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, invoiceNumber: e.target.value }))}
                placeholder="請求書番号を入力"
              />
            </FormGroup>
            
            <FormGroup>
              <label>発行日</label>
              <input
                type="date"
                value={invoiceForm.issueDate}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, issueDate: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup>
              <label>支払期限</label>
              <input
                type="date"
                value={invoiceForm.dueDate}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, dueDate: e.target.value }))}
              />
            </FormGroup>
            
            <FormGroup>
              <label>税率 (%)</label>
              <select
                value={invoiceForm.taxRate}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, taxRate: Number(e.target.value) }))}
              >
                <option value={0}>0%</option>
                <option value={8}>8%</option>
                <option value={10}>10%</option>
              </select>
            </FormGroup>
            
            <FormGroup>
              <label>備考</label>
              <textarea
                value={invoiceForm.notes}
                onChange={(e) => setInvoiceForm(prev => ({ ...prev, notes: e.target.value }))}
                placeholder="備考を入力"
              />
            </FormGroup>
            
            {selectedOrder && (
              <FormGroup>
                <label>請求金額</label>
                <div style={{ padding: '10px', background: '#f8f9fa', borderRadius: '6px' }}>
                  <div>税抜金額: {formatCurrency(selectedOrder.total_amount)}</div>
                  <div>消費税 ({invoiceForm.taxRate}%): {formatCurrency((selectedOrder.total_amount || 0) * (invoiceForm.taxRate / 100))}</div>
                  <div style={{ fontWeight: 'bold', marginTop: '8px' }}>
                    税込金額: {formatCurrency((selectedOrder.total_amount || 0) * (1 + invoiceForm.taxRate / 100))}
                  </div>
                </div>
              </FormGroup>
            )}
            
            <ButtonGroup>
              <ActionButton secondary onClick={closeInvoiceModal}>
                キャンセル
              </ActionButton>
              <ActionButton secondary onClick={generatePDFPreview}>
                <FaEye />
                プレビュー
              </ActionButton>
              <ActionButton primary onClick={downloadPDF}>
                <FaPrint />
                PDF印刷
              </ActionButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}

      {/* PDFプレビューモーダル */}
      {showPreviewModal && (
        <Modal onClick={closePreviewModal}>
          <ModalContent onClick={(e) => e.stopPropagation()} style={{ maxWidth: '800px', width: '95%' }}>
            <ModalHeader>
              <h3>請求書プレビュー</h3>
              <button onClick={closePreviewModal}>&times;</button>
            </ModalHeader>
            
            <div style={{ marginBottom: '20px' }}>
              <p>請求書のプレビューが表示されます。内容を確認してから保存してください。</p>
            </div>
            
            {pdfData && (
              <div style={{ border: '1px solid #e9ecef', borderRadius: '8px', overflow: 'hidden' }}>
                <iframe
                  ref={pdfRef}
                  src={pdfData}
                  width="100%"
                  height="500px"
                  title="PDFプレビュー"
                  style={{ border: 'none' }}
                />
              </div>
            )}
            
            <ButtonGroup>
              <ActionButton secondary onClick={closePreviewModal}>
                閉じる
              </ActionButton>
              <ActionButton primary onClick={downloadPDF}>
                <FaPrint />
                PDF印刷
              </ActionButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default InvoiceManager;
