import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaTimes, 
  FaCogs, FaMoneyBillWave, FaPercent, FaBoxes
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

const DataTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
  background: #f8f9fa;
  padding: 15px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr 100px;
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
  max-width: 600px;
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

const Select = styled.select`
  width: 100%;
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

const PriceDisplay = styled.div`
  font-weight: 600;
  color: #28a745;
`;

const TaxRateDisplay = styled.div`
  font-size: 12px;
  color: #6c757d;
  background: #f8f9fa;
  padding: 2px 6px;
  border-radius: 4px;
  display: inline-block;
`;

function ServiceManager() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingService, setEditingService] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    unit_price: '',
    unit: '式',
    tax_rate: '10.0'
  });

  const unitOptions = ['式', '個', '時間', '日', '月', 'ページ', '件', 'セット', 'その他'];

  useEffect(() => {
    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      setLoading(true);
      if (window.electronAPI) {
        const serviceData = await window.electronAPI.getServices(100, 0);
        setServices(serviceData);
      }
    } catch (error) {
      console.error('サービスデータの読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingService(null);
    setFormData({
      name: '',
      description: '',
      unit_price: '',
      unit: '式',
      tax_rate: '10.0'
    });
    setShowModal(true);
  };

  const handleEdit = (service) => {
    setEditingService(service);
    setFormData({
      name: service.name || '',
      description: service.description || '',
      unit_price: service.unit_price || '',
      unit: service.unit || '式',
      tax_rate: service.tax_rate || '10.0'
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (window.electronAPI) {
        const serviceData = {
          ...formData,
          unit_price: parseFloat(formData.unit_price) || 0,
          tax_rate: parseFloat(formData.tax_rate) || 10.0
        };

        if (editingService) {
          // 更新処理（今回は新規作成のみ実装）
          console.log('更新機能は今後実装予定');
        } else {
          await window.electronAPI.createService(serviceData);
        }
        await loadServices();
        setShowModal(false);
      }
    } catch (error) {
      console.error('サービスデータの保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  const handleDelete = async (service) => {
    if (window.confirm(`「${service.name}」を削除しますか？`)) {
      try {
        // 削除機能は今後実装
        console.log('削除機能は今後実装予定');
      } catch (error) {
        console.error('サービスデータの削除エラー:', error);
        alert('削除に失敗しました');
      }
    }
  };

  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const filteredServices = services.filter(service =>
    service.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    service.description?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Container>読み込み中...</Container>;
  }

  return (
    <Container>
      <ActionBar>
        <ActionButton primary onClick={handleCreate}>
          <FaPlus />
          新規サービス
        </ActionButton>
        <ActionButton onClick={() => console.log('価格一括更新')}>
          <FaMoneyBillWave />
          価格一括更新
        </ActionButton>
        <ActionButton onClick={() => console.log('税率一括更新')}>
          <FaPercent />
          税率一括更新
        </ActionButton>
        <SearchInput
          type="text"
          placeholder="サービス名、説明で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ActionBar>

      {filteredServices.length === 0 ? (
        <EmptyState>
          <FaCogs />
          <h3>サービスデータがありません</h3>
          <p>「新規サービス」ボタンからサービスを追加してください</p>
        </EmptyState>
      ) : (
        <DataTable>
          <TableHeader>
            <div>サービス名</div>
            <div>単価</div>
            <div>単位</div>
            <div>税率</div>
            <div>作成日</div>
            <div>操作</div>
          </TableHeader>
          {filteredServices.map(service => (
            <TableRow key={service.id}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {service.name}
                </div>
                {service.description && (
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    {service.description}
                  </div>
                )}
              </div>
              <div>
                <PriceDisplay>{formatCurrency(service.unit_price)}</PriceDisplay>
              </div>
              <div>{service.unit || '式'}</div>
              <div>
                <TaxRateDisplay>{service.tax_rate || 10}%</TaxRateDisplay>
              </div>
              <div>
                {service.created_at ? new Date(service.created_at).toLocaleDateString('ja-JP') : '-'}
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea' }}
                  onClick={() => handleEdit(service)}
                  title="編集"
                >
                  <FaEdit />
                </button>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}
                  onClick={() => handleDelete(service)}
                  title="削除"
                >
                  <FaTrash />
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
              <h3>{editingService ? 'サービス編集' : '新規サービス登録'}</h3>
              <button
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </ModalHeader>

            <FormGrid>
              <FormGroup className="full-width">
                <Label>サービス名 *</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Webサイト制作"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>単価</Label>
                <Input
                  type="number"
                  value={formData.unit_price}
                  onChange={(e) => setFormData({ ...formData, unit_price: e.target.value })}
                  placeholder="100000"
                  min="0"
                  step="0.01"
                />
              </FormGroup>

              <FormGroup>
                <Label>単位</Label>
                <Select
                  value={formData.unit}
                  onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                >
                  {unitOptions.map(unit => (
                    <option key={unit} value={unit}>{unit}</option>
                  ))}
                </Select>
              </FormGroup>

              <FormGroup>
                <Label>税率 (%)</Label>
                <Select
                  value={formData.tax_rate}
                  onChange={(e) => setFormData({ ...formData, tax_rate: e.target.value })}
                >
                  <option value="0">0% (非課税)</option>
                  <option value="8">8% (軽減税率)</option>
                  <option value="10">10% (標準税率)</option>
                </Select>
              </FormGroup>

              <FormGroup className="full-width">
                <Label>サービス説明</Label>
                <TextArea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="サービスの詳細説明を入力してください"
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
                disabled={!formData.name.trim()}
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

export default ServiceManager;