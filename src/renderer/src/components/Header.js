import React from 'react';
import styled from 'styled-components';
import { FaCog } from 'react-icons/fa';

const HeaderContainer = styled.header`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px 20px;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 60px;
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  font-size: 24px;
  font-weight: bold;
  
  h1 {
    margin: 0;
    font-size: 24px;
  }
`;

const HeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
`;

const SettingsButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: rgba(255, 255, 255, 0.2);
  color: white;
  cursor: pointer;
  transition: all 0.3s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.3);
    transform: rotate(90deg);
  }
  
  &:active {
    transform: rotate(90deg) scale(0.95);
  }
  
  svg {
    font-size: 18px;
  }
`;

const StatusIndicator = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 14px;
  
  &::before {
    content: '';
    width: 8px;
    height: 8px;
    border-radius: 50%;
    background: #4ade80;
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

function Header({ onSettingsClick }) {
  return (
    <HeaderContainer>
      <Logo>
        <h1>KantanPro</h1>
      </Logo>
      
      <HeaderActions>
        <StatusIndicator>
          準備完了
        </StatusIndicator>
        
        <SettingsButton 
          onClick={onSettingsClick}
          title="設定を開く"
        >
          <FaCog />
        </SettingsButton>
      </HeaderActions>
    </HeaderContainer>
  );
}

export default Header;