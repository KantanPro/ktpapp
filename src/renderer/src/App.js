import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import WordPressLayout from './components/WordPressLayout';
import MainContent from './components/MainContent';
import SettingsModal from './components/SettingsModal';

// Modal のルート要素を設定
Modal.setAppElement('#root');

function App() {
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [settings, setSettings] = useState({
    theme: 'light',
    language: 'ja',
    autoSave: true,
    notifications: true,
    apiEndpoint: 'https://api.kantanpro.com',
    apiKey: '',
    maxFileSize: 10,
    defaultEncoding: 'UTF-8',
    // KantanPro固有設定
    companyName: 'サンプル株式会社',
    companyAddress: '東京都渋谷区...',
    companyPhone: '03-1234-5678',
    companyEmail: 'info@sample.co.jp',
    taxMode: 'with_tax', // with_tax / without_tax
    defaultTaxRate: 10,
    workListRange: 20,
    deliveryWarningDays: 3,
    qualifiedInvoiceNumber: '',
    smtpHost: '',
    smtpPort: 587,
    smtpUser: '',
    smtpPassword: '',
    smtpSecurity: 'tls'
  });

  useEffect(() => {
    // 設定を読み込み
    loadSettings();

    // メニューイベントリスナーを設定
    if (window.electronAPI) {
      window.electronAPI.onMenuNewFile(() => {
        console.log('新規ファイル作成');
      });

      window.electronAPI.onMenuOpenFile((event, filePath) => {
        console.log('ファイルを開く:', filePath);
      });
    }

    return () => {
      // クリーンアップ
      if (window.electronAPI) {
        window.electronAPI.removeAllListeners('menu-new-file');
        window.electronAPI.removeAllListeners('menu-open-file');
      }
    };
  }, []);

  const loadSettings = async () => {
    if (window.electronAPI) {
      try {
        const savedSettings = await window.electronAPI.getSettings();
        setSettings(prev => ({ ...prev, ...savedSettings }));
      } catch (error) {
        console.error('設定の読み込みに失敗しました:', error);
      }
    }
  };

  const handleSettingsOpen = () => {
    setIsSettingsOpen(true);
  };

  const handleSettingsClose = () => {
    setIsSettingsOpen(false);
  };

  const handleSettingsSave = async (newSettings) => {
    if (window.electronAPI) {
      try {
        await window.electronAPI.saveSettings(newSettings);
        setSettings(newSettings);
        setIsSettingsOpen(false);
        console.log('設定が保存されました');
      } catch (error) {
        console.error('設定の保存に失敗しました:', error);
      }
    } else {
      setSettings(newSettings);
      setIsSettingsOpen(false);
    }
  };

  return (
    <AppContainer>
      <Header onSettingsClick={handleSettingsOpen} />
      <ContentArea>
        <MainContent settings={settings} />
      </ContentArea>
      
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={handleSettingsClose}
        onSave={handleSettingsSave}
        settings={settings}
      />
    </AppContainer>
  );
}

export default App;