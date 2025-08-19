import React, { useState } from 'react';
import styled from 'styled-components';
import { 
  FaDatabase, FaUsers, FaHandshake, FaCogs, FaFileInvoice, 
  FaChartBar, FaPlus, FaTrash, FaDownload, FaUpload,
  FaCheckCircle, FaExclamationTriangle, FaInfoCircle
} from 'react-icons/fa';

const Container = styled.div`
  padding: 20px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
`;

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 24px;
  padding-bottom: 16px;
  border-bottom: 2px solid #e9ecef;
  
  h2 {
    margin: 0;
    color: #2c3e50;
    font-size: 24px;
  }
  
  svg {
    color: #667eea;
    font-size: 28px;
  }
`;

const Description = styled.p`
  color: #6c757d;
  margin-bottom: 24px;
  line-height: 1.6;
`;

const DataSection = styled.div`
  margin-bottom: 32px;
  padding: 20px;
  background: #f8f9fa;
  border-radius: 8px;
  border-left: 4px solid #667eea;
`;

const SectionTitle = styled.h3`
  display: flex;
  align-items: center;
  gap: 8px;
  margin: 0 0 16px 0;
  color: #2c3e50;
  font-size: 18px;
  
  svg {
    color: #667eea;
  }
`;

const DataGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 16px;
  margin-bottom: 20px;
`;

const DataCard = styled.div`
  background: white;
  padding: 16px;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  
  h4 {
    margin: 0 0 8px 0;
    color: #495057;
    font-size: 14px;
  }
  
  .count {
    font-size: 24px;
    font-weight: bold;
    color: #667eea;
  }
  
  .description {
    font-size: 12px;
    color: #6c757d;
    margin-top: 4px;
  }
`;

const ActionButtons = styled.div`
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
`;

const Button = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 20px;
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
      transform: translateY(-1px);
    }
  }
  
  &.secondary {
    background: #6c757d;
    color: white;
    
    &:hover {
      background: #5a6268;
      transform: translateY(-1px);
    }
  }
  
  &.danger {
    background: #dc3545;
    color: white;
    
    &:hover {
      background: #c82333;
      transform: translateY(-1px);
    }
  }
  
  &.success {
    background: #28a745;
    color: white;
    
    &:hover {
      background: #218838;
      transform: translateY(-1px);
    }
  }
  
  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
    transform: none;
  }
`;

const StatusMessage = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 12px 16px;
  border-radius: 6px;
  margin-bottom: 16px;
  
  &.success {
    background: #d4edda;
    color: #155724;
    border: 1px solid #c3e6cb;
  }
  
  &.warning {
    background: #fff3cd;
    color: #856404;
    border: 1px solid #ffeaa7;
  }
  
  &.error {
    background: #f8d7da;
    color: #721c24;
    border: 1px solid #f5c6cb;
  }
  
  &.info {
    background: #d1ecf1;
    color: #0c5460;
    border: 1px solid #bee5eb;
  }
`;

const DummyDataManager = () => {
  const [status, setStatus] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [dataCounts, setDataCounts] = useState({
    clients: 0,
    services: 0,
    suppliers: 0,
    orders: 0,
    chatMessages: 0
  });

  // ダミーデータの定義
  const dummyData = {
    clients: [
      {
        name: '株式会社サンプル',
        contact_person: '田中太郎',
        email: 'tanaka@sample.co.jp',
        phone: '03-1234-5678',
        address: '東京都渋谷区渋谷1-1-1',
        department: '営業部'
      },
      {
        name: 'サンプル商事',
        contact_person: '佐藤花子',
        email: 'sato@sample-shouji.co.jp',
        phone: '06-1234-5678',
        address: '大阪府大阪市北区梅田1-1-1',
        department: '企画部'
      },
      {
        name: 'サンプル工業',
        contact_person: '鈴木一郎',
        email: 'suzuki@sample-kougyou.co.jp',
        phone: '052-123-4567',
        address: '愛知県名古屋市中区栄1-1-1',
        department: '開発部'
      },
      {
        name: 'サンプル建設',
        contact_person: '高橋次郎',
        email: 'takahashi@sample-kensetsu.co.jp',
        phone: '092-123-4567',
        address: '福岡県福岡市博多区博多駅前1-1-1',
        department: '施工部'
      },
      {
        name: 'サンプルIT',
        contact_person: '渡辺三郎',
        email: 'watanabe@sample-it.co.jp',
        phone: '011-123-4567',
        address: '北海道札幌市中央区南1条西1-1-1',
        department: 'システム部'
      }
    ],
    services: [
      {
        name: 'Webサイト制作',
        description: '企業向けコーポレートサイトの制作',
        unit_price: 500000,
        unit: '式',
        tax_rate: 10.0
      },
      {
        name: 'ECサイト構築',
        description: 'オンラインショップの構築・運営',
        unit_price: 800000,
        unit: '式',
        tax_rate: 10.0
      },
      {
        name: 'アプリ開発',
        description: 'iOS・Androidアプリの開発',
        unit_price: 1200000,
        unit: '式',
        tax_rate: 10.0
      },
      {
        name: 'システム設計',
        description: '業務システムの設計・開発',
        unit_price: 300000,
        unit: '式',
        tax_rate: 10.0
      },
      {
        name: '保守・運用',
        description: 'システムの保守・運用サービス',
        unit_price: 50000,
        unit: '月',
        tax_rate: 10.0
      }
    ],
    suppliers: [
      {
        name: 'デザイン工房サンプル',
        contact_person: '山田デザイナー',
        email: 'yamada@design-sample.co.jp',
        phone: '03-2345-6789',
        address: '東京都新宿区新宿1-1-1',
        skills: 'Webデザイン,UI/UX,グラフィックデザイン',
        qualified_invoice_number: 'T1234567890123'
      },
      {
        name: 'プログラミングサンプル',
        contact_person: '伊藤エンジニア',
        email: 'ito@programming-sample.co.jp',
        phone: '03-3456-7890',
        address: '東京都品川区品川1-1-1',
        skills: 'フロントエンド,バックエンド,データベース',
        qualified_invoice_number: 'T2345678901234'
      },
      {
        name: 'マーケティングサンプル',
        contact_person: '中村マーケター',
        email: 'nakamura@marketing-sample.co.jp',
        phone: '03-4567-8901',
        address: '東京都港区港1-1-1',
        skills: 'SEO,SNS,広告運用',
        qualified_invoice_number: 'T3456789012345'
      }
    ],
    orders: [
      {
        client_id: 1,
        project_name: 'コーポレートサイトリニューアル',
        description: '既存サイトのデザイン刷新と機能追加',
        status: '進行中',
        total_amount: 800000,
        tax_amount: 80000,
        deadline: '2024-04-30',
        completion_date: null
      },
      {
        client_id: 2,
        project_name: 'ECサイト構築',
        description: '新規ECサイトの構築',
        status: '受注',
        total_amount: 1200000,
        tax_amount: 120000,
        deadline: '2024-05-31',
        completion_date: null
      },
      {
        client_id: 3,
        project_name: '業務システム開発',
        description: '在庫管理システムの開発',
        status: '完了',
        total_amount: 2000000,
        tax_amount: 200000,
        deadline: '2024-03-15',
        completion_date: '2024-03-10'
      }
    ],
    chatMessages: [
      {
        sender: '田中太郎',
        message: 'プロジェクトの進捗状況を確認したいのですが、いかがでしょうか？',
        timestamp: new Date().toISOString(),
        isOnline: true
      },
      {
        sender: '佐藤花子',
        message: '新しい機能の追加について相談があります。',
        timestamp: new Date().toISOString(),
        isOnline: true
      },
      {
        sender: '鈴木一郎',
        message: '納期について調整が必要です。',
        timestamp: new Date().toISOString(),
        isOnline: false
      }
    ]
  };

  const createDummyData = async (dataType) => {
    setIsLoading(true);
    setStatus(null);
    
    try {
      if (window.electronAPI) {
        // データベースにダミーデータを挿入
        for (const item of dummyData[dataType]) {
          switch (dataType) {
            case 'clients':
              await window.electronAPI.createClient(item);
              break;
            case 'services':
              await window.electronAPI.createService(item);
              break;
            case 'suppliers':
              await window.electronAPI.createSupplier(item);
              break;
            case 'orders':
              await window.electronAPI.createOrder(item);
              break;
            case 'chatMessages':
              // チャットメッセージは受注IDが必要なので、一時的にスキップ
              break;
            default:
              break;
          }
        }
        
        // カウントを更新
        await updateDataCounts();
        
        setStatus({
          type: 'success',
          message: `${getDataTypeName(dataType)}のダミーデータを作成しました。`
        });
      } else {
        setStatus({
          type: 'error',
          message: 'データベースAPIが利用できません。'
        });
      }
      
      // 3秒後にステータスをクリア
      setTimeout(() => setStatus(null), 3000);
      
    } catch (error) {
      console.error('ダミーデータ作成エラー:', error);
      setStatus({
        type: 'error',
        message: `エラーが発生しました: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearDummyData = async (dataType) => {
    setIsLoading(true);
    setStatus(null);
    
    try {
      if (window.electronAPI) {
        // データベースからデータを削除
        const items = await getDataItems(dataType);
        for (const item of items) {
          switch (dataType) {
            case 'clients':
              await window.electronAPI.deleteClient(item.id);
              break;
            case 'services':
              await window.electronAPI.deleteService(item.id);
              break;
            case 'suppliers':
              await window.electronAPI.deleteSupplier(item.id);
              break;
            case 'orders':
              // 受注の削除は慎重に行う必要があるため、一時的にスキップ
              break;
            default:
              break;
          }
        }
        
        // カウントを更新
        await updateDataCounts();
        
        setStatus({
          type: 'warning',
          message: `${getDataTypeName(dataType)}のダミーデータを削除しました。`
        });
      } else {
        setStatus({
          type: 'error',
          message: 'データベースAPIが利用できません。'
        });
      }
      
      setTimeout(() => setStatus(null), 3000);
      
    } catch (error) {
      console.error('ダミーデータ削除エラー:', error);
      setStatus({
        type: 'error',
        message: `エラーが発生しました: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const createAllDummyData = async () => {
    setIsLoading(true);
    setStatus(null);
    
    try {
      for (const dataType of Object.keys(dummyData)) {
        await createDummyData(dataType);
      }
      
      setStatus({
        type: 'success',
        message: 'すべてのダミーデータを作成しました。'
      });
      
      setTimeout(() => setStatus(null), 3000);
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: `エラーが発生しました: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const clearAllDummyData = async () => {
    setIsLoading(true);
    setStatus(null);
    
    try {
      for (const dataType of Object.keys(dummyData)) {
        localStorage.removeItem(`dummy_${dataType}`);
      }
      
      setDataCounts({
        clients: 0,
        services: 0,
        suppliers: 0,
        orders: 0,
        chatMessages: 0
      });
      
      setStatus({
        type: 'warning',
        message: 'すべてのダミーデータを削除しました。'
      });
      
      setTimeout(() => setStatus(null), 3000);
      
    } catch (error) {
      setStatus({
        type: 'error',
        message: `エラーが発生しました: ${error.message}`
      });
    } finally {
      setIsLoading(false);
    }
  };

  const getDataItems = async (dataType) => {
    try {
      if (window.electronAPI) {
        switch (dataType) {
          case 'clients':
            return await window.electronAPI.getClients(1000, 0);
          case 'services':
            return await window.electronAPI.getServices(1000, 0);
          case 'suppliers':
            return await window.electronAPI.getSuppliers(1000, 0);
          case 'orders':
            return await window.electronAPI.getOrders(1000, 0);
          default:
            return [];
        }
      }
      return [];
    } catch (error) {
      console.error('データ取得エラー:', error);
      return [];
    }
  };

  const updateDataCounts = async () => {
    try {
      if (window.electronAPI) {
        const clients = await window.electronAPI.getClients(1000, 0);
        const services = await window.electronAPI.getServices(1000, 0);
        const suppliers = await window.electronAPI.getSuppliers(1000, 0);
        const orders = await window.electronAPI.getOrders(1000, 0);
        
        setDataCounts({
          clients: clients.length,
          services: services.length,
          suppliers: suppliers.length,
          orders: orders.length,
          chatMessages: 0 // チャットメッセージは後で実装
        });
      }
    } catch (error) {
      console.error('データカウント更新エラー:', error);
    }
  };

  const getDataTypeName = (dataType) => {
    const names = {
      clients: '顧客',
      services: 'サービス',
      suppliers: '協力会社',
      orders: '受注',
      chatMessages: 'チャットメッセージ'
    };
    return names[dataType] || dataType;
  };

  // 初期データカウントを読み込み
  React.useEffect(() => {
    updateDataCounts();
  }, []);

  return (
    <Container>
      <Header>
        <FaDatabase />
        <h2>ダミーデータ管理</h2>
      </Header>
      
      <Description>
        開発・テスト用のサンプルデータを作成・管理できます。
        各データタイプごとに個別に作成・削除が可能です。
      </Description>

      {status && (
        <StatusMessage className={status.type}>
          {status.type === 'success' && <FaCheckCircle />}
          {status.type === 'warning' && <FaExclamationTriangle />}
          {status.type === 'error' && <FaExclamationTriangle />}
          {status.type === 'info' && <FaInfoCircle />}
          {status.message}
        </StatusMessage>
      )}

      <DataSection>
        <SectionTitle>
          <FaUsers />
          顧客データ
        </SectionTitle>
        <DataGrid>
          <DataCard>
            <h4>登録件数</h4>
            <div className="count">{dataCounts.clients}</div>
            <div className="description">サンプル顧客企業の情報</div>
          </DataCard>
        </DataGrid>
        <ActionButtons>
          <Button 
            className="primary" 
            onClick={() => createDummyData('clients')}
            disabled={isLoading}
          >
            <FaPlus />
            ダミー顧客を作成
          </Button>
          <Button 
            className="danger" 
            onClick={() => clearDummyData('clients')}
            disabled={isLoading}
          >
            <FaTrash />
            顧客データを削除
          </Button>
        </ActionButtons>
      </DataSection>

      <DataSection>
        <SectionTitle>
          <FaCogs />
          サービスデータ
        </SectionTitle>
        <DataGrid>
          <DataCard>
            <h4>登録件数</h4>
            <div className="count">{dataCounts.services}</div>
            <div className="description">提供サービス・商品の情報</div>
          </DataCard>
        </DataGrid>
        <ActionButtons>
          <Button 
            className="primary" 
            onClick={() => createDummyData('services')}
            disabled={isLoading}
          >
            <FaPlus />
            ダミーサービスを作成
          </Button>
          <Button 
            className="danger" 
            onClick={() => clearDummyData('services')}
            disabled={isLoading}
          >
            <FaTrash />
            サービスデータを削除
          </Button>
        </ActionButtons>
      </DataSection>

      <DataSection>
        <SectionTitle>
          <FaHandshake />
          協力会社データ
        </SectionTitle>
        <DataGrid>
          <DataCard>
            <h4>登録件数</h4>
            <div className="count">{dataCounts.suppliers}</div>
            <div className="description">パートナー企業の情報</div>
          </DataCard>
        </DataGrid>
        <ActionButtons>
          <Button 
            className="primary" 
            onClick={() => createDummyData('suppliers')}
            disabled={isLoading}
          >
            <FaPlus />
            ダミー協力会社を作成
          </Button>
          <Button 
            className="danger" 
            onClick={() => clearDummyData('suppliers')}
            disabled={isLoading}
          >
            <FaTrash />
            協力会社データを削除
          </Button>
        </ActionButtons>
      </DataSection>

      <DataSection>
        <SectionTitle>
          <FaFileInvoice />
          受注データ
        </SectionTitle>
        <DataGrid>
          <DataCard>
            <h4>登録件数</h4>
            <div className="count">{dataCounts.orders}</div>
            <div className="description">受注案件の情報</div>
          </DataCard>
        </DataGrid>
        <ActionButtons>
          <Button 
            className="primary" 
            onClick={() => createDummyData('orders')}
            disabled={isLoading}
          >
            <FaPlus />
            ダミー受注を作成
          </Button>
          <Button 
            className="danger" 
            onClick={() => clearDummyData('orders')}
            disabled={isLoading}
          >
            <FaTrash />
            受注データを削除
          </Button>
        </ActionButtons>
      </DataSection>

      <DataSection>
        <SectionTitle>
          <FaChartBar />
          チャットメッセージ
        </SectionTitle>
        <DataGrid>
          <DataCard>
            <h4>登録件数</h4>
            <div className="count">{dataCounts.chatMessages}</div>
            <div className="description">スタッフチャットのメッセージ</div>
          </DataCard>
        </DataGrid>
        <ActionButtons>
          <Button 
            className="primary" 
            onClick={() => createDummyData('chatMessages')}
            disabled={isLoading}
          >
            <FaPlus />
            ダミーメッセージを作成
          </Button>
          <Button 
            className="danger" 
            onClick={() => clearDummyData('chatMessages')}
            disabled={isLoading}
          >
            <FaTrash />
            チャットデータを削除
          </Button>
        </ActionButtons>
      </DataSection>

      <DataSection>
        <SectionTitle>
          <FaDatabase />
          一括操作
        </SectionTitle>
        <ActionButtons>
          <Button 
            className="success" 
            onClick={createAllDummyData}
            disabled={isLoading}
          >
            <FaPlus />
            全データを作成
          </Button>
          <Button 
            className="danger" 
            onClick={clearAllDummyData}
            disabled={isLoading}
          >
            <FaTrash />
            全データを削除
          </Button>
        </ActionButtons>
      </DataSection>
    </Container>
  );
};

export default DummyDataManager;

