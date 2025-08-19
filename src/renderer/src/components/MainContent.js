import React, { useState, useMemo, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaList, FaFileInvoice, FaUsers, FaCogs, FaHandshake, FaChartBar,
  FaPlus, FaSearch, FaFilter, FaDownload, FaUpload, FaEdit, FaTrash,
  FaEye, FaPrint, FaComments, FaCalendarAlt, FaMoneyBillWave, FaDatabase
} from 'react-icons/fa';
import ClientManager from './ClientManager';
import OrderManager from './OrderManager';
import ServiceManager from './ServiceManager';
import SupplierManager from './SupplierManager';
import ReportManager from './ReportManager';
import StaffChat from './StaffChat';
import DummyDataManager from './DummyDataManager';
import InvoiceManager from './InvoiceManager';

const ContentContainer = styled.div`
  flex: 1;
  display: flex;
  background: #ffffff;
`;

const TabNavigation = styled.div`
  width: 250px;
  background: #f8f9fa;
  border-right: 1px solid #e9ecef;
  padding: 20px;
  overflow-y: auto;
`;

const MainArea = styled.div`
  flex: 1;
  padding: 20px;
  overflow-y: auto;
`;

const TabButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  padding: 15px 18px;
  margin-bottom: 8px;
  border: none;
  border-radius: 8px;
  background: ${props => props.active ? '#667eea' : '#f8f9fa'};
  color: ${props => props.active ? 'white' : '#495057'};
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 14px;
  font-weight: 500;
  text-align: left;
  
  &:hover {
    background: ${props => props.active ? '#5a67d8' : '#e9ecef'};
    transform: translateY(-1px);
  }
  
  &:active {
    transform: translateY(0);
  }
  
  svg {
    font-size: 16px;
  }
`;

const WorkArea = styled.div`
  background: white;
  border-radius: 12px;
  padding: 30px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  min-height: 500px;
`;

const StatusCard = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 20px;
  border-radius: 12px;
  margin-bottom: 20px;
  
  h4 {
    margin: 0 0 10px 0;
    font-size: 18px;
  }
  
  p {
    margin: 0;
    opacity: 0.9;
  }
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
  
  &:active {
    transform: translateY(0);
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
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
  grid-template-columns: ${props => props.columns || '1fr 1fr 1fr 1fr'};
  background: #f8f9fa;
  padding: 15px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: ${props => props.columns || '1fr 1fr 1fr 1fr'};
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
      default: return '#616161';
    }
  }};
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

function MainContent({ settings }) {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isProcessing, setIsProcessing] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    clientCount: 0,
    orderCount: 0,
    revenue: '¥0',
    pendingInvoices: 0
  });

  // サンプルデータ
  const sampleOrders = [
    { id: 1, client: '株式会社サンプル', project: 'Webサイト制作', status: '進行中', amount: '¥500,000', deadline: '2024-03-15' },
    { id: 2, client: 'テスト商事', project: 'システム開発', status: '受注', amount: '¥1,200,000', deadline: '2024-04-20' },
    { id: 3, client: '例示株式会社', project: 'デザイン制作', status: '完了', amount: '¥300,000', deadline: '2024-02-28' },
  ];

  const sampleClients = [
    { id: 1, name: '株式会社サンプル', contact: '田中太郎', email: 'tanaka@sample.co.jp', phone: '03-1234-5678' },
    { id: 2, name: 'テスト商事', contact: '佐藤花子', email: 'sato@test.co.jp', phone: '06-9876-5432' },
    { id: 3, name: '例示株式会社', contact: '鈴木一郎', email: 'suzuki@example.co.jp', phone: '052-1111-2222' },
  ];

  // tabs配列をuseMemoで最適化
  const tabs = useMemo(() => [
    { id: 'dashboard', name: 'ダッシュボード', icon: FaChartBar },
    { id: 'orders', name: '仕事リスト', icon: FaList },
    { id: 'invoices', name: '伝票処理', icon: FaFileInvoice },
    { id: 'clients', name: '顧客管理', icon: FaUsers },
    { id: 'services', name: 'サービス管理', icon: FaCogs },
    { id: 'suppliers', name: '協力会社', icon: FaHandshake },
    { id: 'reports', name: 'レポート', icon: FaChartBar },
    { id: 'dummy-data', name: 'ダミーデータ管理', icon: FaDatabase },
  ], []);

  // ダッシュボードデータを取得
  useEffect(() => {
    if (activeTab === 'dashboard') {
      loadDashboardData();
    }
  }, [activeTab]);

  // デバッグ用：コンポーネントマウント時にタブ情報を出力
  useEffect(() => {
    console.log('=== MainContent コンポーネントがマウントされました ===');
    console.log('利用可能なタブ:', tabs);
    console.log('現在のアクティブタブ:', activeTab);
    console.log('タブの数:', tabs.length);
    
    // 各タブの詳細を確認
    tabs.forEach((tab, index) => {
      console.log(`タブ${index + 1}:`, tab.id, tab.name, tab.icon);
    });
  }, [tabs, activeTab]);

  // アクティブタブが変更されたときのログ
  useEffect(() => {
    console.log('アクティブタブが変更されました:', activeTab);
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

  const handleAction = (actionName) => {
    console.log(`実行中: ${actionName}`);
    setIsProcessing(true);
    
    setTimeout(() => {
      setIsProcessing(false);
      console.log(`完了: ${actionName}`);
    }, 1500);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return (
          <div>
            <h2>ダッシュボード</h2>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px', marginBottom: '30px' }}>
              <div style={{ background: '#e3f2fd', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#1976d2' }}>進行中の案件</h4>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#1976d2' }}>{dashboardData.orderCount}件</p>
              </div>
              <div style={{ background: '#e8f5e8', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#388e3c' }}>今月の売上</h4>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#388e3c' }}>{dashboardData.revenue}</p>
              </div>
              <div style={{ background: '#fff3e0', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#f57c00' }}>未請求案件</h4>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#f57c00' }}>{dashboardData.pendingInvoices}件</p>
              </div>
              <div style={{ background: '#f3e5f5', padding: '20px', borderRadius: '12px' }}>
                <h4 style={{ margin: '0 0 10px 0', color: '#7b1fa2' }}>顧客数</h4>
                <p style={{ margin: 0, fontSize: '24px', fontWeight: 'bold', color: '#7b1fa2' }}>{dashboardData.clientCount}社</p>
              </div>
            </div>
            
            <h3>最近の活動</h3>
            <DataTable>
              <TableHeader columns="2fr 1fr 1fr 1fr">
                <div>案件名</div>
                <div>顧客</div>
                <div>ステータス</div>
                <div>金額</div>
              </TableHeader>
              {sampleOrders.map(order => (
                <TableRow key={order.id} columns="2fr 1fr 1fr 1fr">
                  <div>{order.project}</div>
                  <div>{order.client}</div>
                  <div><StatusBadge status={order.status}>{order.status}</StatusBadge></div>
                  <div>{order.amount}</div>
                </TableRow>
              ))}
            </DataTable>
          </div>
        );

      case 'orders':
        return <OrderManager />;

      case 'clients':
        return <ClientManager />;

      case 'invoices':
        return <InvoiceManager />;

      case 'services':
        return <ServiceManager />;

      case 'suppliers':
        return <SupplierManager />;

      case 'reports':
        return <ReportManager />;

      case 'dummy-data':
        return <DummyDataManager />;

      default:
        return <div>タブが見つかりません</div>;
    }
  };

  return (
    <ContentContainer>
      <TabNavigation>
        <h3 style={{ margin: '0 0 20px 0', color: '#495057', fontSize: '16px' }}>機能メニュー</h3>
        {tabs.map(tab => {
          const IconComponent = tab.icon;
          return (
            <TabButton
              key={tab.id}
              active={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            >
              <IconComponent />
              {tab.name}
            </TabButton>
          );
        })}
      </TabNavigation>
      
      <MainArea>
        <StatusCard>
          <h4>KantanPro Desktop - 業務管理システム</h4>
          <p>
            現在のタブ: {tabs.find(tab => tab.id === activeTab)?.name} | 
            テーマ: {settings.theme === 'light' ? 'ライト' : 'ダーク'} | 
            自動保存: {settings.autoSave ? 'ON' : 'OFF'}
          </p>
        </StatusCard>
        
        <WorkArea>
          {renderTabContent()}
          
          {isProcessing && (
            <div style={{ 
              position: 'fixed',
              bottom: '20px',
              right: '20px',
              padding: '15px 20px', 
              background: '#667eea', 
              color: 'white',
              borderRadius: '8px',
              boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
              zIndex: 1000
            }}>
              処理を実行中です...
            </div>
          )}
        </WorkArea>
      </MainArea>
      
      {/* スタッフチャット */}
      <StaffChat />
    </ContentContainer>
  );
}

export default MainContent;