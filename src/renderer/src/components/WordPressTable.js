import React from 'react';
import styled from 'styled-components';
import { FaEdit, FaTrash, FaEye } from 'react-icons/fa';

const WPTableContainer = styled.div`
  background: #fff;
  box-shadow: 0 1px 1px rgba(0,0,0,.04);
  border: 1px solid #ddd;
  margin: 20px 0;
`;

const WPTableHeader = styled.div`
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
  padding: 8px 12px;
  font-size: 14px;
  font-weight: 600;
  color: #23282d;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const WPTableActions = styled.div`
  display: flex;
  gap: 8px;
  align-items: center;
`;

const WPButton = styled.button`
  display: inline-block;
  text-decoration: none;
  font-size: 13px;
  line-height: 2.15384615;
  min-height: 30px;
  margin: 0;
  padding: 0 10px;
  cursor: pointer;
  border-width: 1px;
  border-style: solid;
  border-radius: 3px;
  white-space: nowrap;
  box-sizing: border-box;
  background: ${props => props.primary ? '#0073aa' : '#f7f7f7'};
  border-color: ${props => props.primary ? '#0073aa' : '#ccc'};
  color: ${props => props.primary ? '#fff' : '#555'};
  vertical-align: top;
  transition: all 0.1s ease-in-out;
  display: flex;
  align-items: center;
  gap: 4px;
  
  &:hover {
    background: ${props => props.primary ? '#005a87' : '#fafafa'};
    border-color: ${props => props.primary ? '#005a87' : '#999'};
    color: ${props => props.primary ? '#fff' : '#23282d'};
  }
  
  &:disabled {
    color: #a0a5aa !important;
    border-color: #ddd !important;
    background: #f7f7f7 !important;
    cursor: default;
  }
`;

const WPTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  border-spacing: 0;
  background: #fff;
`;

const WPTableHead = styled.thead`
  background: #f9f9f9;
`;

const WPTableHeaderCell = styled.th`
  background: #f9f9f9;
  border-bottom: 1px solid #ddd;
  padding: 8px 10px;
  text-align: left;
  font-weight: 600;
  font-size: 13px;
  color: #23282d;
  cursor: ${props => props.sortable ? 'pointer' : 'default'};
  
  &:hover {
    background: ${props => props.sortable ? '#f0f0f0' : '#f9f9f9'};
  }
`;

const WPTableBody = styled.tbody``;

const WPTableRow = styled.tr`
  &:hover {
    background: #f9f9f9;
  }
  
  &:nth-child(even) {
    background: #fafafa;
  }
  
  &:nth-child(even):hover {
    background: #f9f9f9;
  }
`;

const WPTableCell = styled.td`
  padding: 8px 10px;
  border-bottom: 1px solid #e5e5e5;
  font-size: 13px;
  vertical-align: top;
`;

const WPStatusBadge = styled.span`
  display: inline-block;
  padding: 2px 8px;
  font-size: 11px;
  font-weight: 600;
  text-transform: uppercase;
  border-radius: 2px;
  color: #fff;
  background: ${props => {
    switch (props.status) {
      case '受注': return '#0073aa';
      case '進行中': return '#ffb900';
      case '完了': return '#46b450';
      case '請求': return '#9b59b6';
      case '支払い': return '#00a0d2';
      case 'ボツ': return '#dc3232';
      case '見積中': return '#666';
      default: return '#666';
    }
  }};
`;

const WPActionButtons = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const WPActionButton = styled.button`
  background: none;
  border: none;
  color: #0073aa;
  cursor: pointer;
  padding: 4px;
  border-radius: 2px;
  font-size: 14px;
  transition: all 0.1s ease-in-out;
  
  &:hover {
    background: #f0f0f0;
    color: #005a87;
  }
  
  &.danger {
    color: #dc3232;
    
    &:hover {
      color: #a00;
    }
  }
`;

const WPPagination = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 12px;
  background: #f9f9f9;
  border-top: 1px solid #ddd;
  font-size: 13px;
`;

const WPPaginationInfo = styled.div`
  color: #666;
`;

const WPPaginationControls = styled.div`
  display: flex;
  gap: 4px;
  align-items: center;
`;

const WPPaginationButton = styled.button`
  padding: 4px 8px;
  border: 1px solid #ccc;
  background: #f7f7f7;
  color: #555;
  cursor: pointer;
  font-size: 13px;
  border-radius: 2px;
  
  &:hover {
    background: #fafafa;
    border-color: #999;
  }
  
  &:disabled {
    color: #a0a5aa;
    cursor: default;
    background: #f7f7f7;
  }
  
  &.current {
    background: #0073aa;
    border-color: #0073aa;
    color: #fff;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 40px 20px;
  color: #666;
  
  h3 {
    margin: 0 0 8px 0;
    font-size: 18px;
    color: #23282d;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;

function WordPressTable({ 
  title, 
  data = [], 
  columns = [], 
  actions = [],
  onEdit,
  onDelete,
  onView,
  currentPage = 1,
  totalPages = 1,
  totalItems = 0,
  onPageChange,
  emptyMessage = "データがありません"
}) {
  
  const formatCurrency = (amount) => {
    if (!amount) return '-';
    return new Intl.NumberFormat('ja-JP', {
      style: 'currency',
      currency: 'JPY'
    }).format(amount);
  };

  const formatDate = (dateString) => {
    if (!dateString) return '-';
    return new Date(dateString).toLocaleDateString('ja-JP');
  };

  const renderCellContent = (item, column) => {
    const value = item[column.key];
    
    switch (column.type) {
      case 'currency':
        return formatCurrency(value);
      case 'date':
        return formatDate(value);
      case 'status':
        return <WPStatusBadge status={value}>{value}</WPStatusBadge>;
      case 'actions':
        return (
          <WPActionButtons>
            {onView && (
              <WPActionButton onClick={() => onView(item)} title="詳細">
                <FaEye />
              </WPActionButton>
            )}
            {onEdit && (
              <WPActionButton onClick={() => onEdit(item)} title="編集">
                <FaEdit />
              </WPActionButton>
            )}
            {onDelete && (
              <WPActionButton 
                className="danger" 
                onClick={() => onDelete(item)} 
                title="削除"
              >
                <FaTrash />
              </WPActionButton>
            )}
          </WPActionButtons>
        );
      default:
        return value || '-';
    }
  };

  const renderPagination = () => {
    if (totalPages <= 1) return null;

    const pages = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }

    return (
      <WPPagination>
        <WPPaginationInfo>
          {totalItems}件中 {((currentPage - 1) * 20) + 1}-{Math.min(currentPage * 20, totalItems)}件を表示
        </WPPaginationInfo>
        <WPPaginationControls>
          <WPPaginationButton 
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
          >
            ≪
          </WPPaginationButton>
          <WPPaginationButton 
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            ‹
          </WPPaginationButton>
          
          {pages.map(page => (
            <WPPaginationButton
              key={page}
              className={page === currentPage ? 'current' : ''}
              onClick={() => onPageChange(page)}
            >
              {page}
            </WPPaginationButton>
          ))}
          
          <WPPaginationButton 
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            ›
          </WPPaginationButton>
          <WPPaginationButton 
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            ≫
          </WPPaginationButton>
        </WPPaginationControls>
      </WPPagination>
    );
  };

  return (
    <WPTableContainer>
      <WPTableHeader>
        <div>{title}</div>
        <WPTableActions>
          {actions.map((action, index) => (
            <WPButton 
              key={index}
              primary={action.primary}
              onClick={action.onClick}
            >
              {action.icon && <action.icon />}
              {action.label}
            </WPButton>
          ))}
        </WPTableActions>
      </WPTableHeader>

      {data.length === 0 ? (
        <EmptyState>
          <h3>データなし</h3>
          <p>{emptyMessage}</p>
        </EmptyState>
      ) : (
        <>
          <WPTable>
            <WPTableHead>
              <WPTableRow>
                {columns.map(column => (
                  <WPTableHeaderCell 
                    key={column.key}
                    sortable={column.sortable}
                  >
                    {column.label}
                  </WPTableHeaderCell>
                ))}
              </WPTableRow>
            </WPTableHead>
            <WPTableBody>
              {data.map((item, index) => (
                <WPTableRow key={item.id || index}>
                  {columns.map(column => (
                    <WPTableCell key={column.key}>
                      {renderCellContent(item, column)}
                    </WPTableCell>
                  ))}
                </WPTableRow>
              ))}
            </WPTableBody>
          </WPTable>
          
          {renderPagination()}
        </>
      )}
    </WPTableContainer>
  );
}

export default WordPressTable;