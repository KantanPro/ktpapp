import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaTimes, FaEye, 
  FaFilter, FaDownload, FaFileInvoice, FaPrint, FaComments,
  FaCalendarAlt, FaMoneyBillWave, FaUser, FaClock
} from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
`;

const ActionBar = styled.div`
  display: flex;
  gap: 10px;
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
  background: ${props => props.primary ? '#667eea' : '#f8f9fa'};
  color: ${props => props.primary ? 'white' : '#495057'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  
  &:hover {
    background: ${props => props.primary ? '#5a67d8' : '#e9ecef'};
    transform: translateY(-1px);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const FilterBar = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
  flex-wrap: wrap;
  align-items: center;
`;

const SearchInput = styled.input`
  flex: 1;
  max-width: 300px;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const Select = styled.select`
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const DataTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 120px;
  background: #f8f9fa;
  padding: 15px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 1fr 120px;
  padding: 15px;
  border-bottom: 1px solid #f1f3f4;
  transition: background 0.2s ease;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case '受注': return '#e3f2fd';
      case '進行中': return '#fff3e0';
      case '完了': return '#e8f5e8';
      case '請求': return '#f3e5f5';
      case '支払い': return '#e0f2f1';
      case 'ボツ': return '#ffebee';
      case '見積中': return '#f5f5f5';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '受注': return '#1976d2';
      case '進行中': return '#f57c00';
      case '完了': return '#388e3c';
      case '請求': return '#7b1fa2';
      case '支払い': return '#00796b';
      case 'ボツ': return '#d32f2f';
      case '見積中': return '#616161';
      default: return '#616161';
    }
  }};
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
  width: 90%;
  max-width: 800px;
  max-height: 80vh;
  overflow-y: auto;
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
`;

const FormGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 20px;
  margin-bottom: 20px;
  
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const FormGroup = styled.div`
  margin-bottom: 15px;
  
  &.full-width {
    grid-column: 1 / -1;
  }
`;

const Label = styled.label`
  display: block;
  margin-bottom: 5px;
  color: #495057;
  font-weight: 500;
  font-size: 14px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const TextArea = styled.textarea`
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  min-height: 100px;
  resize: vertical;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const ButtonGroup = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-end;
  margin-top: 20px;
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

const WarningBadge = styled.span`
  color: #f57c00;
  font-size: 16px;
  margin-left: 5px;
  title: ${props => props.title};
`;

function OrderManager() {
  const [orders, setOrders] = useState([]);
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingOrder, setEditingOrder] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('');
  const [formData, setFormData] = useState({
    client_id: '',
    project_name: '',
    description: '',
    status: '受注',
    total_amount: '',
    tax_amount: '',
    deadline: ''
  });

  const statusOptions = ['受注', '進行中', '完了', '請求', '支払い', 'ボツ', '見積中'];

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      setLoading(true);
      if (window.electronAPI) {
        const [orderData, clientData] = await Promise.all([
          window.electronAPI.getOrders(100, 0, statusFilter || null),
          window.electronAPI.getClients(100, 0)
        ]);
        setOrders(orderData);
        setClients(clientData);
      }
    } catch (error) {
      console.error('データの読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingOrder(null);
    setFormData({
      client_id: '',
      project_name: '',
      description: '',
      status: '受注',
      total_amount: '',
      tax_amount: '',
      deadline: ''
    });
    setShowModal(true);
  };

  const handleEdit = (order) => {
    setEditingOrder(order);
    setFormData({
      client_id: order.client_id || '',
      project_name: order.project_name || '',
      description: order.description || '',
      status: order.status || '受注',
      total_amount: order.total_amount || '',
      tax_amount: order.tax_amount || '',
      deadline: order.deadline || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (window.electronAPI) {
        if (editingOrder) {
          // 更新処理（今回は新規作成のみ実装）
          console.log('更新機能は今後実装予定');
        } else {
          await window.electronAPI.createOrder(formData);
        }
        await loadData();
        setShowModal(false);
      }
    } catch (error) {
      console.error('受注データの保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  const handleStatusChange = async (order, newStatus) => {
    try {
      if (window.electronAPI) {
        await window.electronAPI.updateOrderStatus(order.id, newStatus);
        await loadData();
      }
    } catch (error) {
      console.error('ステータス更新エラー:', error);
      alert('ステータス更新に失敗しました');
    }
  };

  const isDeadlineWarning = (deadline) => {
    if (!deadline) return false;
    const deadlineDate = new Date(deadline);
    const today = new Date();
    const diffDays = Math.ceil((deadlineDate - today) / (1000 * 60 * 60 * 24));
    return diffDays <= 3 && diffDays >= 0;
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order.project_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.client_name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.description?.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesStatus = !statusFilter || order.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  if (loading) {
    return <Container>読み込み中...</Container>;
  }

  return (
    <Container>
      <ActionBar>
        <ActionButton primary onClick={handleCreate}>
          <FaPlus />
          新規受注
        </ActionButton>
        <ActionButton onClick={() => console.log('一括処理')}>
          <FaDownload />
          一括処理
        </ActionButton>
        <ActionButton onClick={() => console.log('PDF出力')}>
          <FaPrint />
          PDF出力
        </ActionButton>
        <ActionButton onClick={() => console.log('請求書作成')}>
          <FaFileInvoice />
          請求書作成
        </ActionButton>
      </ActionBar>

      <FilterBar>
        <SearchInput
          type="text"
          placeholder="案件名、顧客名で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">全てのステータス</option>
          {statusOptions.map(status => (
            <option key={status} value={status}>{status}</option>
          ))}
        </Select>
        <ActionButton onClick={loadData}>
          <FaSearch />
          検索
        </ActionButton>
      </FilterBar>

      {filteredOrders.length === 0 ? (
        <EmptyState>
          <FaFileInvoice />
          <h3>受注データがありません</h3>
          <p>「新規受注」ボタンから受注を追加してください</p>
        </EmptyState>
      ) : (
        <DataTable>
          <TableHeader>
            <div>案件名</div>
            <div>顧客</div>
            <div>ステータス</div>
            <div>金額</div>
            <div>納期</div>
            <div>作成日</div>
            <div>操作</div>
          </TableHeader>
          {filteredOrders.map(order => (
            <TableRow key={order.id}>
              <div>
                {order.project_name}
                {isDeadlineWarning(order.deadline) && (
                  <WarningBadge title="納期が近づいています">⚠️</WarningBadge>
                )}
              </div>
              <div>{order.client_name || '-'}</div>
              <div>
                <Select
                  value={order.status}
                  onChange={(e) => handleStatusChange(order, e.target.value)}
                  style={{ padding: '4px 8px', fontSize: '12px', border: 'none', background: 'transparent' }}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Select>
              </div>
              <div>{formatCurrency(order.total_amount)}</div>
              <div>{formatDate(order.deadline)}</div>
              <div>{formatDate(order.created_at)}</div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea' }}
                  onClick={() => console.log('詳細表示', order.id)}
                  title="詳細"
                >
                  <FaEye />
                </button>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea' }}
                  onClick={() => handleEdit(order)}
                  title="編集"
                >
                  <FaEdit />
                </button>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#28a745' }}
                  onClick={() => console.log('チャット', order.id)}
                  title="チャット"
                >
                  <FaComments />
                </button>
              </div>
            </TableRow>
          ))}
        </DataTable>
      )}

      {showModal && (
        <Modal onClick={(e) => e.target === e.currentTarget && setShowModal(false)}>
          <ModalContent>
            <ModalHeader>
              <h3>{editingOrder ? '受注編集' : '新規受注登録'}</h3>
              <button
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </ModalHeader>

            <FormGrid>
              <FormGroup>
                <Label>顧客 *</Label>
                <Select
                  value={formData.client_id}
                  onChange={(e) => setFormData({ ...formData, client_id: e.target.value })}
                  required
                >
                  <option value="">顧客を選択してください</option>
                  {clients.map(client => (
                    <option key={client.id} value={client.id}>{client.name}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>ステータス</Label>
                <Select
                  value={formData.status}
                  onChange={(e) => setFormData({ ...formData, status: e.target.value })}
                >
                  {statusOptions.map(status => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup className="full-width">
                <Label>案件名 *</Label>
                <Input
                  type="text"
                  value={formData.project_name}
                  onChange={(e) => setFormData({ ...formData, project_name: e.target.value })}
                  placeholder="Webサイト制作"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>金額</Label>
                <Input
                  type="number"
                  value={formData.total_amount}
                  onChange={(e) => setFormData({ ...formData, total_amount: e.target.value })}
                  placeholder="500000"
                />
              </FormGroup>

              <FormGroup>
                <Label>納期</Label>
                <Input
                  type="date"
                  value={formData.deadline}
                  onChange={(e) => setFormData({ ...formData, deadline: e.target.value })}
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>案件詳細</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="案件の詳細説明を入力してください"
                />
              </FormGroup>
            </FormGrid>

            <ButtonGroup>
              <ActionButton onClick={() => setShowModal(false)}>
                <FaTimes />
                キャンセル
              </ActionButton>
              <ActionButton 
                primary 
                onClick={handleSave} 
                disabled={!formData.client_id || !formData.project_name.trim()}
              >
                <FaSave />
                保存
              </ActionButton>
            </ButtonGroup>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
}

export default OrderManager;