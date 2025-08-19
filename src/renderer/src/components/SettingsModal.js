import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import styled from 'styled-components';
import { FaTimes, FaSave, FaUndo } from 'react-icons/fa';

const ModalContent = styled.div`
  background: white;
  border-radius: 12px;
  padding: 0;
  max-width: 600px;
  width: 90vw;
  max-height: 80vh;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

const ModalHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  
  h2 {
    margin: 0;
    font-size: 20px;
    font-weight: 600;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  font-size: 18px;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ModalBody = styled.div`
  flex: 1;
  padding: 25px;
  overflow-y: auto;
`;

const SettingsSection = styled.div`
  margin-bottom: 25px;
  
  &:last-child {
    margin-bottom: 0;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  color: #495057;
  font-size: 16px;
  font-weight: 600;
  border-bottom: 2px solid #e9ecef;
  padding-bottom: 8px;
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
  transition: border-color 0.2s ease;
  
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
  transition: border-color 0.2s ease;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const CheckboxContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const Checkbox = styled.input`
  width: 16px;
  height: 16px;
  accent-color: #667eea;
`;

const ModalFooter = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 25px;
  background: #f8f9fa;
  border-top: 1px solid #e9ecef;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  border: none;
  border-radius: 6px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &.primary {
    background: #667eea;
    color: white;
    
    &:hover {
      background: #5a67d8;
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
    }
  }
  
  &:active {
    transform: translateY(1px);
  }
`;

const customModalStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1000
  },
  content: {
    position: 'relative',
    top: 'auto',
    left: 'auto',
    right: 'auto',
    bottom: 'auto',
    border: 'none',
    background: 'transparent',
    padding: 0,
    overflow: 'visible'
  }
};

function SettingsModal({ isOpen, onClose, onSave, settings }) {
  const [formData, setFormData] = useState(settings);

  useEffect(() => {
    setFormData(settings);
  }, [settings]);

  const handleInputChange = (key, value) => {
    setFormData(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
  };

  const handleReset = () => {
    setFormData(settings);
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={customModalStyles}
      contentLabel="設定"
    >
      <ModalContent>
        <ModalHeader>
          <h2>設定</h2>
          <CloseButton onClick={onClose}>
            <FaTimes />
          </CloseButton>
        </ModalHeader>
        
        <ModalBody>
          <SettingsSection>
            <SectionTitle>一般設定</SectionTitle>
            
            <FormGroup>
              <Label>テーマ</Label>
              <Select
                value={formData.theme}
                onChange={(e) => handleInputChange('theme', e.target.value)}
              >
                <option value="light">ライト</option>
                <option value="dark">ダーク</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <Label>言語</Label>
              <Select
                value={formData.language}
                onChange={(e) => handleInputChange('language', e.target.value)}
              >
                <option value="ja">日本語</option>
                <option value="en">English</option>
              </Select>
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={formData.autoSave}
                  onChange={(e) => handleInputChange('autoSave', e.target.checked)}
                />
                <Label>自動保存を有効にする</Label>
              </CheckboxContainer>
            </FormGroup>
            
            <FormGroup>
              <CheckboxContainer>
                <Checkbox
                  type="checkbox"
                  checked={formData.notifications}
                  onChange={(e) => handleInputChange('notifications', e.target.checked)}
                />
                <Label>通知を有効にする</Label>
              </CheckboxContainer>
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>API設定</SectionTitle>
            
            <FormGroup>
              <Label>APIエンドポイント</Label>
              <Input
                type="url"
                value={formData.apiEndpoint}
                onChange={(e) => handleInputChange('apiEndpoint', e.target.value)}
                placeholder="https://api.example.com"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>APIキー</Label>
              <Input
                type="password"
                value={formData.apiKey}
                onChange={(e) => handleInputChange('apiKey', e.target.value)}
                placeholder="APIキーを入力してください"
              />
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>会社情報</SectionTitle>
            
            <FormGroup>
              <Label>会社名</Label>
              <Input
                type="text"
                value={formData.companyName}
                onChange={(e) => handleInputChange('companyName', e.target.value)}
                placeholder="株式会社サンプル"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>住所</Label>
              <Input
                type="text"
                value={formData.companyAddress}
                onChange={(e) => handleInputChange('companyAddress', e.target.value)}
                placeholder="東京都渋谷区..."
              />
            </FormGroup>
            
            <FormGroup>
              <Label>電話番号</Label>
              <Input
                type="tel"
                value={formData.companyPhone}
                onChange={(e) => handleInputChange('companyPhone', e.target.value)}
                placeholder="03-1234-5678"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>メールアドレス</Label>
              <Input
                type="email"
                value={formData.companyEmail}
                onChange={(e) => handleInputChange('companyEmail', e.target.value)}
                placeholder="info@company.co.jp"
              />
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>消費税設定</SectionTitle>
            
            <FormGroup>
              <Label>税制モード</Label>
              <Select
                value={formData.taxMode}
                onChange={(e) => handleInputChange('taxMode', e.target.value)}
              >
                <option value="with_tax">消費税あり</option>
                <option value="without_tax">消費税なし</option>
              </Select>
            </FormGroup>
            
            {formData.taxMode === 'with_tax' && (
              <FormGroup>
                <Label>デフォルト税率 (%)</Label>
                <Input
                  type="number"
                  min="0"
                  max="100"
                  step="0.1"
                  value={formData.defaultTaxRate}
                  onChange={(e) => handleInputChange('defaultTaxRate', parseFloat(e.target.value))}
                />
              </FormGroup>
            )}
            
            <FormGroup>
              <Label>適格請求書番号</Label>
              <Input
                type="text"
                value={formData.qualifiedInvoiceNumber}
                onChange={(e) => handleInputChange('qualifiedInvoiceNumber', e.target.value)}
                placeholder="T1234567890123"
              />
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>業務設定</SectionTitle>
            
            <FormGroup>
              <Label>仕事リスト表示件数</Label>
              <Input
                type="number"
                min="10"
                max="100"
                value={formData.workListRange}
                onChange={(e) => handleInputChange('workListRange', parseInt(e.target.value))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>納期警告日数</Label>
              <Input
                type="number"
                min="1"
                max="30"
                value={formData.deliveryWarningDays}
                onChange={(e) => handleInputChange('deliveryWarningDays', parseInt(e.target.value))}
              />
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>メール設定</SectionTitle>
            
            <FormGroup>
              <Label>SMTPホスト</Label>
              <Input
                type="text"
                value={formData.smtpHost}
                onChange={(e) => handleInputChange('smtpHost', e.target.value)}
                placeholder="smtp.gmail.com"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>SMTPポート</Label>
              <Input
                type="number"
                value={formData.smtpPort}
                onChange={(e) => handleInputChange('smtpPort', parseInt(e.target.value))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>SMTPユーザー名</Label>
              <Input
                type="text"
                value={formData.smtpUser}
                onChange={(e) => handleInputChange('smtpUser', e.target.value)}
                placeholder="user@gmail.com"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>SMTPパスワード</Label>
              <Input
                type="password"
                value={formData.smtpPassword}
                onChange={(e) => handleInputChange('smtpPassword', e.target.value)}
                placeholder="アプリパスワード"
              />
            </FormGroup>
            
            <FormGroup>
              <Label>セキュリティ</Label>
              <Select
                value={formData.smtpSecurity}
                onChange={(e) => handleInputChange('smtpSecurity', e.target.value)}
              >
                <option value="none">なし</option>
                <option value="tls">TLS</option>
                <option value="ssl">SSL</option>
              </Select>
            </FormGroup>
          </SettingsSection>
          
          <SettingsSection>
            <SectionTitle>ファイル設定</SectionTitle>
            
            <FormGroup>
              <Label>最大ファイルサイズ (MB)</Label>
              <Input
                type="number"
                min="1"
                max="100"
                value={formData.maxFileSize}
                onChange={(e) => handleInputChange('maxFileSize', parseInt(e.target.value))}
              />
            </FormGroup>
            
            <FormGroup>
              <Label>デフォルト文字エンコーディング</Label>
              <Select
                value={formData.defaultEncoding}
                onChange={(e) => handleInputChange('defaultEncoding', e.target.value)}
              >
                <option value="UTF-8">UTF-8</option>
                <option value="Shift_JIS">Shift_JIS</option>
                <option value="EUC-JP">EUC-JP</option>
              </Select>
            </FormGroup>
          </SettingsSection>
        </ModalBody>
        
        <ModalFooter>
          <Button className="secondary" onClick={handleReset}>
            <FaUndo />
            リセット
          </Button>
          
          <Button className="primary" onClick={handleSave}>
            <FaSave />
            保存
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}

export default SettingsModal;