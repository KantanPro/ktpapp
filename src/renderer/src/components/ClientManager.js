import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { FaPlus, FaEdit, FaTrash, FaSearch, FaSave, FaTimes } from 'react-icons/fa';

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
  grid-template-columns: 2fr 1fr 2fr 1fr 100px;
  background: #f8f9fa;
  padding: 15px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 2fr 1fr 100px;
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
  max-width: 500px;
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

const FormGroup = styled.div`
  margin-bottom: 15px;
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
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;

function ClientManager() {
  const [clients, setClients] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [formData, setFormData] = useState({
    name: '',
    contact_person: '',
    email: '',
    phone: '',
    address: '',
    department: ''
  });

  useEffect(() => {
    loadClients();
  }, []);

  const loadClients = async () => {
    try {
      setLoading(true);
      if (window.electronAPI) {
        const clientData = await window.electronAPI.getClients(100, 0);
        setClients(clientData);
      }
    } catch (error) {
      console.error('顧客データの読み込みエラー:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreate = () => {
    setEditingClient(null);
    setFormData({
      name: '',
      contact_person: '',
      email: '',
      phone: '',
      address: '',
      department: ''
    });
    setShowModal(true);
  };

  const handleEdit = (client) => {
    setEditingClient(client);
    setFormData({
      name: client.name || '',
      contact_person: client.contact_person || '',
      email: client.email || '',
      phone: client.phone || '',
      address: client.address || '',
      department: client.department || ''
    });
    setShowModal(true);
  };

  const handleSave = async () => {
    try {
      if (window.electronAPI) {
        if (editingClient) {
          await window.electronAPI.updateClient(editingClient.id, formData);
        } else {
          await window.electronAPI.createClient(formData);
        }
        await loadClients();
        setShowModal(false);
      }
    } catch (error) {
      console.error('顧客データの保存エラー:', error);
      alert('保存に失敗しました');
    }
  };

  const handleDelete = async (client) => {
    if (window.confirm(`「${client.name}」を削除しますか？`)) {
      try {
        if (window.electronAPI) {
          await window.electronAPI.deleteClient(client.id);
          await loadClients();
        }
      } catch (error) {
        console.error('顧客データの削除エラー:', error);
        alert('削除に失敗しました');
      }
    }
  };

  const filteredClients = clients.filter(client =>
    client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (client.contact_person && client.contact_person.toLowerCase().includes(searchTerm.toLowerCase())) ||
    (client.email && client.email.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (loading) {
    return <Container>読み込み中...</Container>;
  }

  return (
    <Container>
      <ActionBar>
        <ActionButton primary onClick={handleCreate}>
          <FaPlus />
          新規顧客
        </ActionButton>
        <SearchInput
          type="text"
          placeholder="顧客名、担当者、メールアドレスで検索..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </ActionBar>

      {filteredClients.length === 0 ? (
        <EmptyState>
          <h3>顧客データがありません</h3>
          <p>「新規顧客」ボタンから顧客を追加してください</p>
        </EmptyState>
      ) : (
        <DataTable>
          <TableHeader>
            <div>会社名</div>
            <div>担当者</div>
            <div>メールアドレス</div>
            <div>電話番号</div>
            <div>操作</div>
          </TableHeader>
          {filteredClients.map(client => (
            <TableRow key={client.id}>
              <div>{client.name}</div>
              <div>{client.contact_person || '-'}</div>
              <div>{client.email || '-'}</div>
              <div>{client.phone || '-'}</div>
              <div style={{ display: 'flex', gap: '5px' }}>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#667eea' }}
                  onClick={() => handleEdit(client)}
                  title="編集"
                >
                  <FaEdit />
                </button>
                <button
                  style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#dc3545' }}
                  onClick={() => handleDelete(client)}
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
              <h3>{editingClient ? '顧客編集' : '新規顧客登録'}</h3>
              <button
                style={{ border: 'none', background: 'none', cursor: 'pointer', fontSize: '18px' }}
                onClick={() => setShowModal(false)}
              >
                <FaTimes />
              </button>
            </ModalHeader>

            <FormGroup>
              <Label>会社名 *</Label>
              <Input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="株式会社サンプル"
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>担当者名</Label>
              <Input
                type="text"
                value={formData.contact_person}
                onChange={(e) => setFormData({ ...formData, contact_person: e.target.value })}
                placeholder="田中太郎"
              />
            </FormGroup>

            <FormGroup>
              <Label>メールアドレス</Label>
              <Input
                type="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                placeholder="tanaka@sample.co.jp"
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

            <FormGroup>
              <Label>住所</Label>
              <Input
                type="text"
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="東京都渋谷区..."
              />
            </FormGroup>

            <FormGroup>
              <Label>部署</Label>
              <Input
                type="text"
                value={formData.department}
                onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                placeholder="営業部"
              />
            </FormGroup>

            <ButtonGroup>
              <ActionButton onClick={() => setShowModal(false)}>
                <FaTimes />
                キャンセル
              </ActionButton>
              <ActionButton primary onClick={handleSave} disabled={!formData.name.trim()}>
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

export default ClientManager;