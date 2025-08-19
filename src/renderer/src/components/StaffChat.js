import React, { useState, useEffect, useRef } from 'react';
import styled from 'styled-components';
import { 
  FaComments, FaPaperPlane, FaTimes, FaUser, FaTrash,
  FaSmile, FaImage, FaFile, FaClock
} from 'react-icons/fa';

const ChatContainer = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
  border: 1px solid #e9ecef;
  display: flex;
  flex-direction: column;
  z-index: 1000;
  
  @media (max-width: 768px) {
    width: 300px;
    height: 400px;
    bottom: 10px;
    right: 10px;
  }
`;

const ChatHeader = styled.div`
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 15px 20px;
  border-radius: 12px 12px 0 0;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

const ChatTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 600;
  
  svg {
    font-size: 18px;
  }
`;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: white;
  cursor: pointer;
  padding: 5px;
  border-radius: 4px;
  transition: background 0.2s ease;
  
  &:hover {
    background: rgba(255, 255, 255, 0.2);
  }
`;

const ChatMessages = styled.div`
  flex: 1;
  padding: 15px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 12px;
  background: #f8f9fa;
`;

const Message = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  
  &.own-message {
    flex-direction: row-reverse;
    
    .message-content {
      background: #667eea;
      color: white;
    }
  }
`;

const Avatar = styled.div`
  width: 32px;
  height: 32px;
  border-radius: 50%;
  background: ${props => props.color || '#6c757d'};
  display: flex;
  align-items: center;
  justify-content: center;
  color: white;
  font-size: 12px;
  font-weight: 600;
  flex-shrink: 0;
`;

const MessageContent = styled.div`
  background: white;
  padding: 10px 12px;
  border-radius: 12px;
  max-width: 70%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
  
  .message-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 4px;
    font-size: 11px;
    color: #6c757d;
  }
  
  .message-text {
    font-size: 14px;
    line-height: 1.4;
    word-wrap: break-word;
  }
`;

const ChatInput = styled.div`
  padding: 15px;
  border-top: 1px solid #e9ecef;
  background: white;
  border-radius: 0 0 12px 12px;
`;

const InputContainer = styled.div`
  display: flex;
  gap: 8px;
  align-items: flex-end;
`;

const TextInput = styled.textarea`
  flex: 1;
  padding: 10px 12px;
  border: 1px solid #ced4da;
  border-radius: 20px;
  font-size: 14px;
  resize: none;
  min-height: 20px;
  max-height: 80px;
  font-family: inherit;
  
  &:focus {
    outline: none;
    border-color: #667eea;
    box-shadow: 0 0 0 2px rgba(102, 126, 234, 0.2);
  }
  
  &::placeholder {
    color: #6c757d;
  }
`;

const SendButton = styled.button`
  width: 40px;
  height: 40px;
  border: none;
  border-radius: 50%;
  background: #667eea;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: all 0.2s ease;
  
  &:hover {
    background: #5a67d8;
    transform: scale(1.05);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  &:disabled {
    background: #6c757d;
    cursor: not-allowed;
    transform: none;
  }
`;

const ChatToggle = styled.button`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 60px;
  height: 60px;
  border: none;
  border-radius: 50%;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 24px;
  box-shadow: 0 4px 20px rgba(102, 126, 234, 0.4);
  transition: all 0.2s ease;
  z-index: 999;
  
  &:hover {
    transform: scale(1.1);
    box-shadow: 0 6px 25px rgba(102, 126, 234, 0.5);
  }
  
  &:active {
    transform: scale(0.95);
  }
  
  @media (max-width: 768px) {
    width: 50px;
    height: 50px;
    font-size: 20px;
    bottom: 10px;
    right: 10px;
  }
`;

const OnlineUsers = styled.div`
  padding: 10px 15px;
  border-bottom: 1px solid #e9ecef;
  background: white;
  
  .users-title {
    font-size: 12px;
    color: #6c757d;
    margin-bottom: 8px;
    font-weight: 600;
  }
  
  .users-list {
    display: flex;
    gap: 8px;
    flex-wrap: wrap;
  }
`;

const OnlineUser = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
  padding: 4px 8px;
  background: #e8f5e8;
  border-radius: 12px;
  font-size: 11px;
  color: #388e3c;
  
  .status-dot {
    width: 6px;
    height: 6px;
    border-radius: 50%;
    background: #4caf50;
  }
`;

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  color: #6c757d;
  text-align: center;
  padding: 20px;
  
  svg {
    font-size: 48px;
    margin-bottom: 12px;
    opacity: 0.5;
  }
  
  h4 {
    margin: 0 0 8px 0;
    font-size: 16px;
  }
  
  p {
    margin: 0;
    font-size: 14px;
  }
`;

function StaffChat({ orderId = null, onClose }) {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [currentUser] = useState('田中太郎'); // 実際はログインユーザーから取得
  const [onlineUsers] = useState(['田中太郎', '佐藤花子', '山田一郎']);
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  // サンプルメッセージ
  const sampleMessages = [
    {
      id: 1,
      user_name: '佐藤花子',
      message: 'お疲れ様です！新しい案件の進捗はいかがですか？',
      created_at: new Date(Date.now() - 3600000).toISOString(),
      avatar_color: '#e91e63'
    },
    {
      id: 2,
      user_name: '田中太郎',
      message: 'お疲れ様です。順調に進んでいます。明日には初稿をお見せできそうです。',
      created_at: new Date(Date.now() - 1800000).toISOString(),
      avatar_color: '#2196f3'
    },
    {
      id: 3,
      user_name: '山田一郎',
      message: 'ありがとうございます！楽しみにしています。何かサポートが必要でしたらお声がけください。',
      created_at: new Date(Date.now() - 900000).toISOString(),
      avatar_color: '#4caf50'
    }
  ];

  useEffect(() => {
    if (isOpen) {
      loadMessages();
      // 自動スクロール
      scrollToBottom();
      // 入力フィールドにフォーカス
      if (inputRef.current) {
        inputRef.current.focus();
      }
    }
  }, [isOpen, orderId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const loadMessages = async () => {
    try {
      setLoading(true);
      if (window.electronAPI && orderId) {
        const messageData = await window.electronAPI.getChatMessages(orderId, 50);
        setMessages(messageData);
      } else {
        // サンプルデータを使用
        setTimeout(() => {
          setMessages(sampleMessages);
          setLoading(false);
        }, 300);
        return;
      }
    } catch (error) {
      console.error('メッセージの読み込みエラー:', error);
      setMessages(sampleMessages);
    } finally {
      setLoading(false);
    }
  };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const messageText = newMessage.trim();
    setNewMessage('');

    try {
      if (window.electronAPI && orderId) {
        await window.electronAPI.addChatMessage(orderId, currentUser, messageText);
        await loadMessages();
      } else {
        // ローカルでメッセージを追加（サンプル）
        const newMsg = {
          id: Date.now(),
          user_name: currentUser,
          message: messageText,
          created_at: new Date().toISOString(),
          avatar_color: '#2196f3'
        };
        setMessages(prev => [...prev, newMsg]);
      }
    } catch (error) {
      console.error('メッセージ送信エラー:', error);
      alert('メッセージの送信に失敗しました');
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const formatTime = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const diffMs = now - date;
    const diffMins = Math.floor(diffMs / 60000);
    const diffHours = Math.floor(diffMs / 3600000);
    const diffDays = Math.floor(diffMs / 86400000);

    if (diffMins < 1) return 'たった今';
    if (diffMins < 60) return `${diffMins}分前`;
    if (diffHours < 24) return `${diffHours}時間前`;
    if (diffDays < 7) return `${diffDays}日前`;
    
    return date.toLocaleDateString('ja-JP', { 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getUserInitials = (name) => {
    return name ? name.charAt(0) : '?';
  };

  const getUserColor = (name) => {
    const colors = ['#e91e63', '#2196f3', '#4caf50', '#ff9800', '#9c27b0', '#f44336'];
    const index = name ? name.charCodeAt(0) % colors.length : 0;
    return colors[index];
  };

  if (!isOpen) {
    return (
      <ChatToggle onClick={() => setIsOpen(true)}>
        <FaComments />
      </ChatToggle>
    );
  }

  return (
    <ChatContainer>
      <ChatHeader>
        <ChatTitle>
          <FaComments />
          スタッフチャット
        </ChatTitle>
        <CloseButton onClick={() => setIsOpen(false)}>
          <FaTimes />
        </CloseButton>
      </ChatHeader>

      <OnlineUsers>
        <div className="users-title">オンライン ({onlineUsers.length})</div>
        <div className="users-list">
          {onlineUsers.map((user, index) => (
            <OnlineUser key={index}>
              <div className="status-dot"></div>
              {user}
            </OnlineUser>
          ))}
        </div>
      </OnlineUsers>

      <ChatMessages>
        {loading ? (
          <div style={{ textAlign: 'center', padding: '20px', color: '#6c757d' }}>
            メッセージを読み込み中...
          </div>
        ) : messages.length === 0 ? (
          <EmptyState>
            <FaComments />
            <h4>チャットを開始</h4>
            <p>メッセージを入力してチャットを開始してください</p>
          </EmptyState>
        ) : (
          messages.map((message) => (
            <Message 
              key={message.id} 
              className={message.user_name === currentUser ? 'own-message' : ''}
            >
              <Avatar color={message.avatar_color || getUserColor(message.user_name)}>
                {getUserInitials(message.user_name)}
              </Avatar>
              <MessageContent className="message-content">
                <div className="message-header">
                  <span>{message.user_name}</span>
                  <span>{formatTime(message.created_at)}</span>
                </div>
                <div className="message-text">{message.message}</div>
              </MessageContent>
            </Message>
          ))
        )}
        <div ref={messagesEndRef} />
      </ChatMessages>

      <ChatInput>
        <InputContainer>
          <TextInput
            ref={inputRef}
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="メッセージを入力... (Ctrl+Enterで送信)"
            rows={1}
          />
          <SendButton 
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || loading}
          >
            <FaPaperPlane />
          </SendButton>
        </InputContainer>
      </ChatInput>
    </ChatContainer>
  );
}

export default StaffChat;