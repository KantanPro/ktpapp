import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaList, FaFileInvoice, FaUsers, FaCogs, FaHandshake, FaChartBar,
  FaTachometerAlt, FaCog
} from 'react-icons/fa';
import '../styles/wordpress-theme.css';

const WordPressContainer = styled.div`
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif;
  font-size: 13px;
  line-height: 1.4em;
  color: #23282d;
  background: #f1f1f1;
  margin: 0;
  padding: 0;
  min-height: 100vh;
`;

const WPHeader = styled.div`
  background: #23282d;
  color: #fff;
  padding: 0;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  box-shadow: 0 1px 1px rgba(0,0,0,.04);
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 99999;
`;

const WPHeaderTitle = styled.div`
  font-size: 14px;
  font-weight: 400;
  color: #fff;
  display: flex;
  align-items: center;
  gap: 8px;
`;

const WPHeaderActions = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
`;

const WPHeaderButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  padding: 4px 8px;
  border-radius: 2px;
  cursor: pointer;
  font-size: 13px;
  transition: background-color 0.1s ease-in-out;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: rgba(255,255,255,0.2);
  }
`;

const WPMain = styled.div`
  margin-top: 32px;
  display: flex;
  min-height: calc(100vh - 32px);
`;

const WPSidebar = styled.div`
  width: 160px;
  background: #32373c;
  border-right: 1px solid #ddd;
  padding: 0;
  overflow-y: auto;
  
  @media screen and (max-width: 782px) {
    width: 36px;
  }
`;

const WPSidebarMenu = styled.ul`
  margin: 0;
  padding: 0;
  list-style: none;
`;

const WPSidebarMenuItem = styled.li`
  margin: 0;
  border-bottom: 1px solid #464b50;
`;

const WPSidebarMenuLink = styled.button`
  display: flex;
  align-items: center;
  padding: 8px 12px;
  color: #eee;
  text-decoration: none;
  font-size: 13px;
  transition: all 0.1s ease-in-out;
  cursor: pointer;
  border: none;
  background: none;
  width: 100%;
  text-align: left;
  
  &:hover {
    background: #0073aa;
    color: #fff;
  }
  
  &.active {
    background: #0073aa;
    color: #fff;
    box-shadow: inset 4px 0 0 #00a0d2;
  }
  
  @media screen and (max-width: 782px) {
    padding: 8px;
    justify-content: center;
  }
`;

const WPSidebarMenuIcon = styled.div`
  margin-right: 8px;
  font-size: 16px;
  width: 16px;
  text-align: center;
  
  @media screen and (max-width: 782px) {
    margin-right: 0;
  }
`;

const WPSidebarMenuText = styled.span`
  @media screen and (max-width: 782px) {
    display: none;
  }
`;

const WPContent = styled.div`
  flex: 1;
  background: #fff;
  padding: 20px;
  overflow-y: auto;
  
  @media screen and (max-width: 782px) {
    padding: 10px;
  }
`;

const WPPageTitle = styled.h1`
  font-size: 23px;
  font-weight: 400;
  margin: 0 0 20px 0;
  padding: 9px 0 4px 0;
  color: #23282d;
  line-height: 1.3;
`;

const WPNotice = styled.div`
  background: #fff;
  border-left: 4px solid ${props => {
    switch (props.type) {
      case 'success': return '#46b450';
      case 'warning': return '#ffb900';
      case 'error': return '#dc3232';
      default: return '#0073aa';
    }
  }};
  box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
  margin: 5px 0 15px 0;
  padding: 1px 12px;
  
  p {
    margin: 0.5em 0;
    padding: 2px;
    font-size: 13px;
  }
`;

function WordPressLayout({ children, onSettingsClick }) {
  const [activeTab, setActiveTab] = useState('dashboard');

  const menuItems = [
    { id: 'dashboard', name: 'ダッシュボード', icon: FaTachometerAlt },
    { id: 'orders', name: '仕事リスト', icon: FaList },
    { id: 'invoices', name: '伝票処理', icon: FaFileInvoice },
    { id: 'clients', name: '顧客管理', icon: FaUsers },
    { id: 'services', name: 'サービス管理', icon: FaCogs },
    { id: 'suppliers', name: '協力会社', icon: FaHandshake },
    { id: 'reports', name: 'レポート', icon: FaChartBar },
  ];

  const getPageTitle = () => {
    const currentItem = menuItems.find(item => item.id === activeTab);
    return currentItem ? currentItem.name : 'KantanPro Desktop';
  };

  return (
    <WordPressContainer>
      <WPHeader>
        <WPHeaderTitle>
          <span>🏢</span>
          KantanPro Desktop
        </WPHeaderTitle>
        <WPHeaderActions>
          <WPHeaderButton onClick={onSettingsClick}>
            <FaCog />
            設定
          </WPHeaderButton>
        </WPHeaderActions>
      </WPHeader>

      <WPMain>
        <WPSidebar>
          <WPSidebarMenu>
            {menuItems.map(item => {
              const IconComponent = item.icon;
              return (
                <WPSidebarMenuItem key={item.id}>
                  <WPSidebarMenuLink
                    className={activeTab === item.id ? 'active' : ''}
                    onClick={() => setActiveTab(item.id)}
                  >
                    <WPSidebarMenuIcon>
                      <IconComponent />
                    </WPSidebarMenuIcon>
                    <WPSidebarMenuText>{item.name}</WPSidebarMenuText>
                  </WPSidebarMenuLink>
                </WPSidebarMenuItem>
              );
            })}
          </WPSidebarMenu>
        </WPSidebar>

        <WPContent>
          <WPPageTitle>{getPageTitle()}</WPPageTitle>
          
          <WPNotice type="success">
            <p>KantanPro Desktop が正常に動作しています。WordPressプラグインと同じ機能をデスクトップアプリでご利用いただけます。</p>
          </WPNotice>

          {React.cloneElement(children, { activeTab, setActiveTab })}
        </WPContent>
      </WPMain>
    </WordPressContainer>
  );
}

export default WordPressLayout;