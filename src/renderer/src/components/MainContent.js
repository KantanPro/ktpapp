import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaClipboardList, FaReceipt, FaUserFriends, FaCogs, FaChartLine,
  FaPlus, FaSearch, FaFilter, FaDownload, FaUpload, FaEdit, FaTrash,
  FaEye, FaPrint, FaComments, FaCalendarAlt, FaMoneyBillWave,
  FaHome, FaWrench, FaCheck, FaFileInvoice, FaMoneyBill, FaDatabase
} from 'react-icons/fa';
import ClientManager from './ClientManager';
import OrderManager from './OrderManager';
import ReportManager from './ReportManager';
import StaffChat from './StaffChat';
import InvoiceManager from './InvoiceManager';

// 画像のKantanPro風のスタイルコンポーネント
const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  background: #f5f5f5;
`;

const Sidebar = styled.div`
  width: 200px;
  background: #2c3e50;
  padding: 0;
  overflow-y: auto;
  box-shadow: 2px 0 5px rgba(0, 0, 0, 0.1);
`;

const SidebarHeader = styled.div`
  padding: 20px 20px 15px 20px;
  border-bottom: 1px solid #34495e;
  
  h3 {
    margin: 0;
    color: #ecf0f1;
    font-size: 16px;
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
`;

const SidebarMenu = styled.div`
  padding: 0;
`;

const MenuItem = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 15px 20px;
  margin: 0;
  border: none;
  background: ${props => props.active ? '#34495e' : 'transparent'};
  color: ${props => props.active ? '#ffffff' : '#bdc3c7'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  border-left: 4px solid ${props => props.active ? '#3498db' : 'transparent'};
  
  &:hover {
    background: ${props => props.active ? '#34495e' : '#34495e'};
    color: ${props => props.active ? '#ffffff' : '#ffffff'};
  }
  
  &:active {
    transform: translateX(2px);
  }
  
  svg {
    font-size: 16px;
    width: 20px;
    text-align: center;
  }
`;

const MainArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
  background: #f5f5f5;
`;

const WorkArea = styled.div`
  background: white;
  border-radius: 8px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  min-height: 500px;
  border: 1px solid #e5e7eb;
`;

const DashboardTitle = styled.h2`
  margin: 0 0 25px 0;
  font-size: 24px;
  font-weight: 600;
  color: #2c3e50;
`;

const DashboardGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 20px;
  margin-bottom: 25px;
`;

const DashboardCard = styled.div`
  background: ${props => props.color || '#f8f9fa'};
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 6px 20px rgba(0, 0, 0, 0.1);
  }
  
  h4 {
    margin: 0 0 12px 0;
    font-size: 13px;
    font-weight: 600;
    color: #7f8c8d;
    text-transform: uppercase;
    letter-spacing: 0.05em;
  }
  
  .card-value {
    font-size: 28px;
    font-weight: 700;
    color: ${props => props.textColor || '#2c3e50'};
    margin: 0;
  }
  
  .card-description {
    margin: 6px 0 0 0;
    font-size: 12px;
    color: #7f8c8d;
  }
`;

const SingleCard = styled(DashboardCard)`
  grid-column: 1 / 2;
  background: #f7e6fa;
  
  .card-value {
    color: #9b59b6;
  }
`;

const SectionTitle = styled.h3`
  margin: 0 0 15px 0;
  font-size: 18px;
  font-weight: 600;
  color: #2c3e50;
`;

const DataTable = styled.div`
  background: white;
  border-radius: 6px;
  border: 1px solid #d5dbdb;
  overflow: hidden;
  box-shadow: 0 1px 5px rgba(0, 0, 0, 0.05);
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  background: #ecf0f1;
  padding: 12px 15px;
  font-weight: 600;
  color: #2c3e50;
  border-bottom: 1px solid #d5dbdb;
  font-size: 12px;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr;
  padding: 12px 15px;
  border-bottom: 1px solid #ecf0f1;
  transition: background 0.2s ease;
  background: white;
  
  &:hover {
    background: #f8f9fa;
  }
  
  &:last-child {
    border-bottom: none;
  }
`;

const StatusBadge = styled.span`
  display: inline-block;
  padding: 4px 10px;
  border-radius: 15px;
  font-size: 11px;
  font-weight: 500;
  background: ${props => {
    switch (props.status) {
      case '進行中': return '#fff8e1';
      case '受注': return '#e8f4fd';
      case '完了': return '#e8f5e8';
      default: return '#f5f5f5';
    }
  }};
  color: ${props => {
    switch (props.status) {
      case '進行中': return '#f57c00';
      case '受注': return '#1976d2';
      case '完了': return '#388e3c';
      default: '#616161';
    }
  }};
`;

const FloatingChatButton = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 56px;
  height: 56px;
  border-radius: 50%;
  background: #9b59b6;
  color: white;
  border: none;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(155, 89, 182, 0.4);
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  
  &:hover {
    background: #8e44ad;
    transform: translateY(-2px);
    box-shadow: 0 6px 16px rgba(155, 89, 182, 0.6);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 20px;
  }
`;

function MainContent({ settings }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    clientCount: 10,
    orderCount: 2,
    revenue: '¥0',
    pendingInvoices: 2
  });

  // サンプルデータ
  const sampleOrders = [
    { id: 1, client: '株式会社サンプル', project: 'Webサイト制作', status: '進行中', amount: '¥500,000' },
    { id: 2, client: 'テスト商事', project: 'システム開発', status: '受注', amount: '¥1,200,000' },
    { id: 3, client: '例示株式会社', project: 'デザイン制作', status: '完了', amount: '¥300,000' },
  ];

  // タブ配列
  const tabs = [
    { id: 'dashboard', name: 'ダッシュボード', icon: FaHome },
    { id: 'orders', name: '仕事リスト', icon: FaClipboardList },
    { id: 'invoices', name: '伝票処理', icon: FaReceipt },
    { id: 'clients', name: '顧客管理', icon: FaUserFriends },
    { id: 'services', name: 'サービス管理', icon: FaCogs },
    { id: 'suppliers', name: '協力会社', icon: FaUserFriends },
    { id: 'reports', name: 'レポート', icon: FaChartLine },
    { id: 'dummy-data', name: 'ダミーデータ管理', icon: FaDatabase },
  ];

  // ダッシュボードデータを取得
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
  }, [activeTab]);

  const loadDashboardData = async () => {
    try {
      if (window.electronAPI) {
        const clients = await window.electronAPI.getClients(1000, 0);
        const orders = await window.electronAPI.getOrders(1000, 0);
        
        setDashboardData({
          clientCount: clients.length,
          orderCount: orders.filter(order => order.status === '進行中').length,
          revenue: '¥0', // 実際の売上計算は後で実装
          pendingInvoices: orders.filter(order => order.status === '受注').length
        });
      }
    } catch (error) {
      console.error('ダッシュボードデータの読み込みエラー:', error);
    }
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <DashboardTitle>ダッシュボード</DashboardTitle>
            
            <DashboardGrid>
              <DashboardCard color="#e0f2f7" textColor="#1976d2">
                <h4>進行中の案件</h4>
                <p className="card-value">{dashboardData.orderCount}件</p>
                <p className="card-description">現在進行中の仕事</p>
              </DashboardCard>
              
              <DashboardCard color="#e6fae6" textColor="#388e3c">
                <h4>今月の売上</h4>
                <p className="card-value">{dashboardData.revenue}</p>
                <p className="card-description">今月の総売上</p>
              </DashboardCard>
              
              <DashboardCard color="#fff0e6" textColor="#f57c00">
                <h4>未請求案件</h4>
                <p className="card-value">{dashboardData.pendingInvoices}件</p>
                <p className="card-description">請求待ちの案件</p>
              </DashboardCard>
            </DashboardGrid>
            
            <SingleCard>
              <h4>顧客数</h4>
              <p className="card-value">{dashboardData.clientCount}社</p>
              <p className="card-description">登録済み顧客</p>
            </SingleCard>
            
            <SectionTitle>最近の活動</SectionTitle>
            
            <DataTable>
              <TableHeader>
                <div>案件名</div>
                <div>顧客</div>
                <div>ステータス</div>
                <div>金額</div>
              </TableHeader>
              {sampleOrders.map(order => (
                <TableRow key={order.id}>
                  <div style={{ fontWeight: '500' }}>{order.project}</div>
                  <div>{order.client}</div>
                  <div><StatusBadge status={order.status}>{order.status}</StatusBadge></div>
                  <div style={{ fontWeight: '600' }}>{order.amount}</div>
                </TableRow>
              ))}
            </DataTable>
          </div>
        );

      case 'orders':
        return <OrderManager />;

      case 'invoices':
        return <InvoiceManager />;

      case 'clients':
        return <ClientManager />;

      case 'services':
        return (
          <div>
            <DashboardTitle>サービス管理</DashboardTitle>
            <div style={{ 
              background: '#ecf0f1', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #d5dbdb',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#7f8c8d' }}>サービス管理</h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px' }}>
                サービス管理機能は開発中です。
              </p>
            </div>
          </div>
        );

      case 'suppliers':
        return (
          <div>
            <DashboardTitle>協力会社</DashboardTitle>
            <div style={{ 
              background: '#ecf0f1', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #d5dbdb',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#7f8c8d' }}>協力会社管理</h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px' }}>
                協力会社管理機能は開発中です。
              </p>
            </div>
          </div>
        );

      case 'reports':
        return <ReportManager />;

      case 'dummy-data':
        return (
          <div>
            <DashboardTitle>ダミーデータ管理</DashboardTitle>
            <div style={{ 
              background: '#ecf0f1', 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid #d5dbdb',
              textAlign: 'center'
            }}>
              <h3 style={{ margin: '0 0 12px 0', color: '#7f8c8d' }}>ダミーデータ管理</h3>
              <p style={{ margin: 0, color: '#7f8c8d', fontSize: '13px' }}>
                ダミーデータ管理機能は開発中です。
              </p>
            </div>
          </div>
        );

      default:
        return <div>タブが見つかりません</div>;
    }
  };

  return (
    <ContentContainer>
      <Sidebar>
        <SidebarHeader>
          <h3>機能メニュー</h3>
        </SidebarHeader>
        <SidebarMenu>
          {tabs.map(tab => {
            const IconComponent = tab.icon;
            return (
              <MenuItem
                key={tab.id}
                active={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
              >
                <IconComponent />
                {tab.name}
              </MenuItem>
            );
          })}
        </SidebarMenu>
      </Sidebar>
      
      <MainArea>
        <WorkArea>
          {renderTabContent()}
          
          {isProcessing && (
            <div style={{ 
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '12px 20px', 
              background: '#3498db', 
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 15px rgba(52, 152, 219, 0.3)',
              zIndex: 1000,
              fontSize: '13px',
              fontWeight: '500'
            }}>
              処理を実行中です...
            </div>
          )}
        </WorkArea>
      </MainArea>
      
      <FloatingChatButton title="スタッフチャット">
        <FaComments />
      </FloatingChatButton>
    </ContentContainer>
  );
}

export default MainContent;