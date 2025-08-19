import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaPlus, FaFileInvoice, FaPrint, FaDownload, FaEdit, FaTrash, FaEye,
  FaSearch, FaFilter, FaCalendarAlt, FaMoneyBillWave, FaUser
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
    // 請求書作成処理
    console.log('請求書作成:', orderId);
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
    </Container>
  );
}

export default InvoiceManager;
