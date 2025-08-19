import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { 
  FaChartBar, FaChartLine, FaChartPie, FaDownload, FaPrint, 
  FaCalendarAlt, FaMoneyBillWave, FaUsers, FaCogs, FaHandshake,
  FaFileExcel, FaFilePdf, FaFilter, FaSync, FaEye, FaPercent
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

const FilterBar = styled.div`
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
  flex-wrap: wrap;
  align-items: center;
  background: #f8f9fa;
  padding: 20px;
  border-radius: 8px;
`;

const FilterGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  font-size: 12px;
  font-weight: 600;
  color: #495057;
  text-transform: uppercase;
`;

const Select = styled.select`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  background: white;
  min-width: 120px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid #ced4da;
  border-radius: 6px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
`;

const ReportGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 20px;
  margin-bottom: 30px;
`;

const ReportCard = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  transition: all 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
  }
`;

const CardHeader = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 15px;
  
  svg {
    font-size: 24px;
    color: #667eea;
  }
  
  h3 {
    margin: 0;
    color: #495057;
    font-size: 18px;
  }
`;

const CardValue = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: #28a745;
  margin-bottom: 8px;
`;

const CardSubtext = styled.div`
  font-size: 14px;
  color: #6c757d;
  margin-bottom: 15px;
`;

const CardActions = styled.div`
  display: flex;
  gap: 8px;
`;

const SmallButton = styled.button`
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px 10px;
  border: none;
  border-radius: 4px;
  background: #f8f9fa;
  color: #495057;
  cursor: pointer;
  font-size: 12px;
  transition: all 0.2s ease;
  
  &:hover {
    background: #e9ecef;
  }
`;

const ChartContainer = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  margin-bottom: 20px;
`;

const ChartHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    color: #495057;
  }
`;

const ChartPlaceholder = styled.div`
  height: 300px;
  background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  border-radius: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  font-size: 16px;
  border: 2px dashed #ced4da;
`;

const DataTable = styled.div`
  background: white;
  border-radius: 8px;
  border: 1px solid #e9ecef;
  overflow: hidden;
  margin-bottom: 20px;
`;

const TableHeader = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
  background: #f8f9fa;
  padding: 15px;
  font-weight: 600;
  color: #495057;
  border-bottom: 1px solid #e9ecef;
`;

const TableRow = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr 1fr 1fr 1fr;
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

const TaxReportSection = styled.div`
  background: white;
  border-radius: 12px;
  padding: 25px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.05);
  border: 1px solid #e9ecef;
  margin-bottom: 20px;
`;

const TaxReportHeader = styled.div`
  display: flex;
  justify-content: between;
  align-items: center;
  margin-bottom: 20px;
  
  h3 {
    margin: 0;
    color: #495057;
    display: flex;
    align-items: center;
    gap: 10px;
  }
`;

function ReportManager() {
  const [loading, setLoading] = useState(false);
  const [reportType, setReportType] = useState('sales');
  const [dateRange, setDateRange] = useState('thisMonth');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [reportData, setReportData] = useState(null);

  // サンプルデータ
  const sampleReportData = {
    sales: {
      totalSales: 2450000,
      totalOrders: 15,
      averageOrderValue: 163333,
      completedOrders: 12,
      pendingOrders: 3,
      monthlyData: [
        { month: '1月', sales: 1800000, orders: 8 },
        { month: '2月', sales: 2200000, orders: 12 },
        { month: '3月', sales: 2450000, orders: 15 }
      ]
    },
    clients: {
      totalClients: 28,
      activeClients: 18,
      newClients: 5,
      topClients: [
        { name: '株式会社サンプル', orders: 8, sales: 1200000 },
        { name: 'テスト商事', orders: 5, sales: 800000 },
        { name: '例示株式会社', orders: 3, sales: 450000 }
      ]
    },
    services: {
      totalServices: 12,
      popularServices: [
        { name: 'Webサイト制作', count: 8, revenue: 1600000 },
        { name: 'システム開発', count: 5, revenue: 2500000 },
        { name: 'デザイン制作', count: 12, revenue: 600000 }
      ]
    },
    tax: {
      totalTaxableAmount: 2227273,
      totalTaxAmount: 222727,
      taxRate10: { amount: 2000000, tax: 200000 },
      taxRate8: { amount: 227273, tax: 18182 },
      taxFree: { amount: 222727, tax: 0 }
    }
  };

  useEffect(() => {
    loadReportData();
  }, [reportType, dateRange, startDate, endDate]);

  const loadReportData = async () => {
    try {
      setLoading(true);
      // 実際のデータベースからレポートデータを取得
      setTimeout(() => {
        setReportData(sampleReportData);
        setLoading(false);
      }, 500);
    } catch (error) {
      console.error('レポートデータの読み込みエラー:', error);
      setLoading(false);
    }
  };

  const handleExport = (format) => {
    console.log(`${format}形式でエクスポート:`, reportType);
    // 実際のエクスポート処理
  };

  const handlePrint = () => {
    window.print();
  };

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const getCurrentYear = () => new Date().getFullYear();
  const getCurrentMonth = () => new Date().getMonth() + 1;

  if (loading) {
    return <Container>レポートを生成中...</Container>;
  }

  return (
    <Container>
      <ActionBar>
        <ActionButton primary onClick={() => setReportType('sales')}>
          <FaChartBar />
          売上レポート
        </ActionButton>
        <ActionButton onClick={() => setReportType('clients')}>
          <FaUsers />
          顧客レポート
        </ActionButton>
        <ActionButton onClick={() => setReportType('services')}>
          <FaCogs />
          サービスレポート
        </ActionButton>
        <ActionButton onClick={() => setReportType('tax')}>
          <FaCalendarAlt />
          確定申告
        </ActionButton>
        <ActionButton onClick={loadReportData}>
          <FaSync />
          更新
        </ActionButton>
      </ActionBar>

      <FilterBar>
        <FilterGroup>
          <Label>期間</Label>
          <Select
            value={dateRange}
            onChange={(e) => setDateRange(e.target.value)}
          >
            <option value="thisMonth">今月</option>
            <option value="lastMonth">先月</option>
            <option value="thisYear">今年</option>
            <option value="lastYear">昨年</option>
            <option value="custom">カスタム</option>
          </Select>
        </FilterGroup>

        {dateRange === 'custom' && (
          <>
            <FilterGroup>
              <Label>開始日</Label>
              <Input
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
              />
            </FilterGroup>
            <FilterGroup>
              <Label>終了日</Label>
              <Input
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
              />
            </FilterGroup>
          </>
        )}

        <FilterGroup>
          <Label>エクスポート</Label>
          <div style={{ display: 'flex', gap: '5px' }}>
            <SmallButton onClick={() => handleExport('excel')}>
              <FaFileExcel />
              Excel
            </SmallButton>
            <SmallButton onClick={() => handleExport('pdf')}>
              <FaFilePdf />
              PDF
            </SmallButton>
            <SmallButton onClick={handlePrint}>
              <FaPrint />
              印刷
            </SmallButton>
          </div>
        </FilterGroup>
      </FilterBar>

      {reportType === 'sales' && reportData && (
        <>
          <ReportGrid>
            <ReportCard>
              <CardHeader>
                <FaMoneyBillWave />
                <h3>総売上</h3>
              </CardHeader>
              <CardValue>{formatCurrency(reportData.sales.totalSales)}</CardValue>
              <CardSubtext>今月の売上合計</CardSubtext>
              <CardActions>
                <SmallButton>
                  <FaEye />
                  詳細
                </SmallButton>
              </CardActions>
            </ReportCard>

            <ReportCard>
              <CardHeader>
                <FaChartBar />
                <h3>受注件数</h3>
              </CardHeader>
              <CardValue>{reportData.sales.totalOrders}件</CardValue>
              <CardSubtext>完了: {reportData.sales.completedOrders}件 / 進行中: {reportData.sales.pendingOrders}件</CardSubtext>
              <CardActions>
                <SmallButton>
                  <FaEye />
                  詳細
                </SmallButton>
              </CardActions>
            </ReportCard>

            <ReportCard>
              <CardHeader>
                <FaChartLine />
                <h3>平均受注額</h3>
              </CardHeader>
              <CardValue>{formatCurrency(reportData.sales.averageOrderValue)}</CardValue>
              <CardSubtext>1件あたりの平均金額</CardSubtext>
              <CardActions>
                <SmallButton>
                  <FaEye />
                  詳細
                </SmallButton>
              </CardActions>
            </ReportCard>
          </ReportGrid>

          <ChartContainer>
            <ChartHeader>
              <h3>月別売上推移</h3>
              <div>
                <SmallButton>
                  <FaChartLine />
                  線グラフ
                </SmallButton>
              </div>
            </ChartHeader>
            <ChartPlaceholder>
              📊 売上推移グラフ（Chart.js実装予定）
            </ChartPlaceholder>
          </ChartContainer>
        </>
      )}

      {reportType === 'clients' && reportData && (
        <>
          <ReportGrid>
            <ReportCard>
              <CardHeader>
                <FaUsers />
                <h3>総顧客数</h3>
              </CardHeader>
              <CardValue>{reportData.clients.totalClients}社</CardValue>
              <CardSubtext>アクティブ: {reportData.clients.activeClients}社</CardSubtext>
            </ReportCard>

            <ReportCard>
              <CardHeader>
                <FaChartLine />
                <h3>新規顧客</h3>
              </CardHeader>
              <CardValue>{reportData.clients.newClients}社</CardValue>
              <CardSubtext>今月の新規獲得</CardSubtext>
            </ReportCard>
          </ReportGrid>

          <DataTable>
            <TableHeader>
              <div>顧客名</div>
              <div>受注件数</div>
              <div>売上金額</div>
              <div>最終取引</div>
              <div>ステータス</div>
            </TableHeader>
            {reportData.clients.topClients.map((client, index) => (
              <TableRow key={index}>
                <div>{client.name}</div>
                <div>{client.orders}件</div>
                <div>{formatCurrency(client.sales)}</div>
                <div>2024-03-15</div>
                <div>アクティブ</div>
              </TableRow>
            ))}
          </DataTable>
        </>
      )}

      {reportType === 'services' && reportData && (
        <>
          <ReportGrid>
            <ReportCard>
              <CardHeader>
                <FaCogs />
                <h3>総サービス数</h3>
              </CardHeader>
              <CardValue>{reportData.services.totalServices}種</CardValue>
              <CardSubtext>提供中のサービス</CardSubtext>
            </ReportCard>
          </ReportGrid>

          <DataTable>
            <TableHeader>
              <div>サービス名</div>
              <div>利用回数</div>
              <div>売上金額</div>
              <div>平均単価</div>
              <div>人気度</div>
            </TableHeader>
            {reportData.services.popularServices.map((service, index) => (
              <TableRow key={index}>
                <div>{service.name}</div>
                <div>{service.count}回</div>
                <div>{formatCurrency(service.revenue)}</div>
                <div>{formatCurrency(service.revenue / service.count)}</div>
                <div>★★★★☆</div>
              </TableRow>
            ))}
          </DataTable>
        </>
      )}

      {reportType === 'tax' && reportData && (
        <TaxReportSection>
          <TaxReportHeader>
            <h3>
              <FaCalendarAlt />
              確定申告用売上台帳 - {getCurrentYear()}年{getCurrentMonth()}月
            </h3>
            <div>
              <ActionButton primary onClick={() => handleExport('pdf')}>
                <FaFilePdf />
                売上台帳PDF出力
              </ActionButton>
            </div>
          </TaxReportHeader>

          <ReportGrid>
            <ReportCard>
              <CardHeader>
                <FaMoneyBillWave />
                <h3>課税売上合計</h3>
              </CardHeader>
              <CardValue>{formatCurrency(reportData.tax.totalTaxableAmount)}</CardValue>
              <CardSubtext>消費税対象売上</CardSubtext>
            </ReportCard>

            <ReportCard>
              <CardHeader>
                <FaPercent />
                <h3>消費税額</h3>
              </CardHeader>
              <CardValue>{formatCurrency(reportData.tax.totalTaxAmount)}</CardValue>
              <CardSubtext>納税予定額</CardSubtext>
            </ReportCard>
          </ReportGrid>

          <DataTable>
            <TableHeader>
              <div>税率区分</div>
              <div>課税売上高</div>
              <div>消費税額</div>
              <div>備考</div>
              <div>-</div>
            </TableHeader>
            <TableRow>
              <div>標準税率 (10%)</div>
              <div>{formatCurrency(reportData.tax.taxRate10.amount)}</div>
              <div>{formatCurrency(reportData.tax.taxRate10.tax)}</div>
              <div>一般的なサービス</div>
              <div>-</div>
            </TableRow>
            <TableRow>
              <div>軽減税率 (8%)</div>
              <div>{formatCurrency(reportData.tax.taxRate8.amount)}</div>
              <div>{formatCurrency(reportData.tax.taxRate8.tax)}</div>
              <div>軽減税率対象</div>
              <div>-</div>
            </TableRow>
            <TableRow>
              <div>非課税</div>
              <div>{formatCurrency(reportData.tax.taxFree.amount)}</div>
              <div>{formatCurrency(reportData.tax.taxFree.tax)}</div>
              <div>非課税取引</div>
              <div>-</div>
            </TableRow>
          </DataTable>
        </TaxReportSection>
      )}
    </Container>
  );
}

export default ReportManager;