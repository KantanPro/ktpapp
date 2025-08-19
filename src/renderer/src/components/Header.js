import React from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 15px 20px;
  background: #34495e;
  color: white;
  border-bottom: 1px solid #2c3e50;
  min-height: 60px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  
  .logo-icon {
    width: 32px;
    height: 32px;
    background: linear-gradient(135deg, #3498db 0%, #2980b9 100%);
    border-radius: 6px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: white;
    font-weight: bold;
    font-size: 18px;
  }
  
  .logo-text {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  
  h1 {
    margin: 0;
    font-size: 24px;
    font-weight: 700;
    color: white;
    letter-spacing: -0.025em;
  }
  
  .status-info {
    font-size: 12px;
    color: #bdc3c7;
    margin-top: 2px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 12px;
  background: rgba(46, 204, 113, 0.2);
  border: 1px solid rgba(46, 204, 113, 0.3);
  border-radius: 15px;
  font-size: 12px;
  color: #27ae60;
  font-weight: 500;
  
  &::before {
    content: '';
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #27ae60;
    animation: pulse 2s infinite;
  }
  
  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 36px;
  height: 36px;
  border: none;
  border-radius: 6px;
  background: rgba(255, 255, 255, 0.1);
  color: #ecf0f1;
  cursor: pointer;
  transition: all 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
    color: white;
  }
  
  &:active {
    transform: translateY(1px);
  }
  
  svg {
    font-size: 16px;
  }
`;

function Header({ onSettingsClick, settings }) {
  return (
    <HeaderContainer>
      <Logo>
        <div className="logo-icon">K</div>
        <div className="logo-text">
          <h1>KantanPro</h1>
          <div className="status-info">
            現在のタブ: ダッシュボード | テーマ: ダーク | 自動保存: {settings.autoSave ? 'ON' : 'OFF'}
          </div>
        </div>
      </Logo>
      
      <HeaderActions>
        <StatusIndicator>
          準備完了
        </StatusIndicator>
        
        <SettingsButton 
          onClick={onSettingsClick}
          title="設定"
        >
          <FaCog />
        </SettingsButton>
      </HeaderActions>
    </HeaderContainer>
  );
}

export default Header;