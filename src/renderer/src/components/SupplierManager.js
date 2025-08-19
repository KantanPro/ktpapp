import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaTimes, 
  FaHandshake, FaCogs, FaIdCard, FaEnvelope, FaPhone,
  FaMapMarkerAlt, FaTools, FaCertificate
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
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr 100px;
  background: #f8f9fa;
  padding: 15px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 1fr 100px;
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
  max-width: 700px;
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

const SkillsDisplay = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 4px;
`;

const SkillTag = styled.span`
  background: #e3f2fd;
  color: #1976d2;
  padding: 2px 6px;
  border-radius: 12px;
  font-size: 11px;
  font-weight: 500;
`;

const QualifiedBadge = styled.span`
  background: #e8f5e8;
  color: #388e3c;
  padding: 2px 6px;
  border-radius: 4px;
  font-size: 11px;
  font-weight: 500;
  display: inline-flex;
  align-items: center;
  gap: 2px;
`;

function SupplierManager() {
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    skills: '',
    qualified_invoice_number: ''
  });

  // サンプルデータ（実際のデータベース実装まで）
  const sampleSuppliers = [
    {
      id: 1,
      name: 'デザインスタジオA',
      contact_person: '山田太郎',
      email: 'yamada@design-a.co.jp',
      phone: '03-1111-2222',
      address: '東京都渋谷区...',
      skills: 'Webデザイン,UI/UX,グラフィックデザイン',
      qualified_invoice_number: 'T1234567890123',
      created_at: '2024-01-15'
    },
    {
      id: 2,
      name: 'システム開発B',
      contact_person: '佐藤花子',
      email: 'sato@system-b.co.jp',
      phone: '06-3333-4444',
      address: '大阪府大阪市...',
      skills: 'PHP,JavaScript,React,Node.js',
      qualified_invoice_number: '',
      created_at: '2024-02-20'
    },
    {
      id: 3,
      name: 'マーケティングC',
      contact_person: '田中一郎',
      email: 'tanaka@marketing-c.co.jp',
      phone: '052-5555-6666',
      address: '愛知県名古屋市...',
      skills: 'SEO,広告運用,コンテンツマーケティング',
      qualified_invoice_number: 'T9876543210987',
      created_at: '2024-03-10'
    }
  ];

  useEffect(() => {
    loadSuppliers();
  }, []);

  const loadSuppliers = async () => {
    try {
      setLoading(true);
      // 実際のデータベース実装まではサンプルデータを使用
      setTimeout(() => {
        setSuppliers(sampleSuppliers);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('協力会社データの読み込みエラー:', error);
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingSupplier(null);
    setFormData({
      name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: '',
      skills: '',
      qualified_invoice_number: ''
    });
    setShowModal(true);
  };

  const handleEdit = (supplier) => {
    setEditingSupplier(supplier);
    setFormData({
      name: supplier.name || '',
      contact_person: supplier.contact_person || '',
      email: supplier.email || '',
      phone: supplier.phone || '',
      address: supplier.address || '',
      skills: supplier.skills || '',
      qualified_invoice_number: supplier.qualified_invoice_number || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      // 実際のデータベース保存処理
      console.log('協力会社データ保存:', formData);
      
      if (editingSupplier) {
        // 更新処理
        const updatedSuppliers = suppliers.map(supplier =>
          supplier.id === editingSupplier.id
            ? { ...supplier, ...formData, updated_at: new Date().toISOString() }
            : supplier
        );
        setSuppliers(updatedSuppliers);
      } else {
        // 新規作成
        const newSupplier = {
          id: Date.now(),
          ...formData,
          created_at: new Date().toISOString()
        };
        setSuppliers([newSupplier, ...suppliers]);
      }
      
      setShowModal(false);
    } catch (error) {
      console.error('協力会社データの保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  const handleDelete = async (supplier) => {
    if (window.confirm(`「${supplier.name}」を削除しますか？`)) {
      try {
        const updatedSuppliers = suppliers.filter(s => s.id !== supplier.id);
        setSuppliers(updatedSuppliers);
      } catch (error) {
        console.error('協力会社データの削除エラー:', error);
        alert('削除に失敗しました');
      }
    }
  };

  const parseSkills = (skillsString) => {
    if (!skillsString) return [];
    return skillsString.split(',').map(skill => skill.trim()).filter(skill => skill);
  };

  const filteredSuppliers = suppliers.filter(supplier =>
    supplier.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.contact_person?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.skills?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    supplier.email?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <Container>読み込み中...</Container>;
  }

  return (
    <Container>
      <ActionBar>
        <ActionButton primary onClick={handleCreate}>
          <FaPlus />
          新規協力会社
        </ActionButton>
        <ActionButton onClick={() => console.log('職能管理')}>
          <FaTools />
          職能管理
        </ActionButton>
        <ActionButton onClick={() => console.log('一括メール送信')}>
          <FaEnvelope />
          一括メール
        </ActionButton>
        <SearchInput
          type="text"
          placeholder="会社名、担当者、職能で検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ActionBar>

      {filteredSuppliers.length === 0 ? (
        <EmptyState>
          <FaHandshake />
          <h3>協力会社データがありません</h3>
          <p>「新規協力会社」ボタンから協力会社を追加してください</p>
        </EmptyState>
      ) : (
        <DataTable>
          <TableHeader>
            <div>会社名</div>
            <div>担当者</div>
            <div>連絡先</div>
            <div>職能・スキル</div>
            <div>適格請求書</div>
            <div>操作</div>
          </TableHeader>
          {filteredSuppliers.map(supplier => (
            <TableRow key={supplier.id}>
              <div>
                <div style={{ fontWeight: '600', marginBottom: '4px' }}>
                  {supplier.name}
                </div>
                {supplier.address && (
                  <div style={{ fontSize: '12px', color: '#6c757d' }}>
                    <FaMapMarkerAlt style={{ marginRight: '4px' }} />
                    {supplier.address}
                  </div>
                )}
              </div>
              <div>{supplier.contact_person || '-'}</div>
              <div>
                {supplier.email && (
                  <div style={{ fontSize: '12px', marginBottom: '2px' }}>
                    <FaEnvelope style={{ marginRight: '4px' }} />
                    {supplier.email}
                  </div>
                )}
                {supplier.phone && (
                  <div style={{ fontSize: '12px' }}>
                    <FaPhone style={{ marginRight: '4px' }} />
                    {supplier.phone}
                  </div>
                )}
              </div>
              <div>
                <SkillsDisplay>
                  {parseSkills(supplier.skills).slice(0, 3).map((skill, index) => (
                    <SkillTag key={index}>{skill}</SkillTag>
                  ))}
                  {parseSkills(supplier.skills).length > 3 && (
                    <SkillTag>+{parseSkills(supplier.skills).length - 3}</SkillTag>
                  )}
                </SkillsDisplay>
              </div>
              <div>
                {supplier.qualified_invoice_number ? (
                  <QualifiedBadge>
                    <FaCertificate />
                    適格
                  </QualifiedBadge>
                ) : (
                  <span style={{ fontSize: '12px', color: '#6c757d' }}>未登録</span>
                )}
              </div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea' }}
                  onClick={() => handleEdit(supplier)}
                  title="編集"
                >
                  <FaEdit />
                </button>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}
                  onClick={() => handleDelete(supplier)}
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
              <h3>{editingSupplier ? '協力会社編集' : '新規協力会社登録'}</h3>
              <button
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </ModalHeader>

            <FormGrid>
              <FormGroup>
                <Label>会社名 *</Label>
                <Input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="デザインスタジオA"
                  required
                />
              </FormGroup>

              <FormGroup>
                <Label>担当者名</Label>
                <Input
                  type="text"
                  value={formData.contact_person}
                  onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                  placeholder="山田太郎"
                />
              </FormGroup>

              <FormGroup>
                <Label>メールアドレス</Label>
                <Input
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="yamada@company.co.jp"
                />
              </FormGroup>

              <FormGroup>
                <Label>電話番号</Label>
                <Input
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="03-1234-5678"
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>住所</Label>
                <Input
                  type="text"
                  value={formData.address}
                  onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                  placeholder="東京都渋谷区..."
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>職能・スキル</Label>
                <TextArea
                  value={formData.skills}
                  onChange={(e) => setFormData({ ...formData, skills: e.target.value })}
                  placeholder="Webデザイン,UI/UX,グラフィックデザイン（カンマ区切りで入力）"
                />
              </FormGroup>

              <FormGroup className="full-width">
                <Label>適格請求書番号</Label>
                <Input
                  type="text"
                  value={formData.qualified_invoice_number}
                  onChange={(e) => setFormData({ ...formData, qualified_invoice_number: e.target.value })}
                  placeholder="T1234567890123"
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

export default SupplierManager;