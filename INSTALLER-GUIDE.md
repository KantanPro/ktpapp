# 📦 KantanPro Desktop インストーラー作成ガイド

## 🎯 アプリアイコンの場所

### 現在のアイコンファイル
```
📱 アプリアイコン:
├── src/assets/icon.png          # メインアイコン（17.70 KB）
├── build/icons/icon.png         # ビルド用アイコン
└── KantanPro/images/default/icon.png  # 元のプラグインアイコン
```

### アイコンの特徴
- **サイズ**: 17.70 KB
- **形式**: PNG
- **用途**: アプリケーションアイコン、インストーラーアイコン
- **対応プラットフォーム**: Windows、macOS、Linux

## 🚀 インストーラー作成手順

### 1. 事前準備
```bash
# アセット確認
npm run check-assets

# 依存関係インストール
npm install
cd src/renderer && npm install && cd ../..

# ネイティブモジュールリビルド
npm run rebuild
```

### 2. インストーラー作成（推奨）
```bash
# 自動ビルド＆インストーラー作成
npm run build-installer
```

### 3. 手動ビルド（上級者向け）
```bash
# Reactアプリビルド
cd src/renderer && npm run build && cd ../..

# Electronアプリビルド
npm run dist
```

## 📁 インストーラー保存場所

### 生成されるファイル
```
dist/
├── KantanPro Desktop-1.0.0.dmg          # macOS用インストーラー
├── KantanPro Desktop Setup 1.0.0.exe    # Windows用インストーラー
└── KantanPro Desktop-1.0.0.AppImage     # Linux用インストーラー
```

### ファイルサイズ目安
- **Windows (.exe)**: 約 150-200 MB
- **macOS (.dmg)**: 約 150-200 MB  
- **Linux (.AppImage)**: 約 150-200 MB

## 🔧 設定詳細

### package.json 設定
```json
{
  "build": {
    "appId": "com.kantanpro.desktop",
    "productName": "KantanPro Desktop",
    "mac": {
      "icon": "build/icons/icon.png",
      "target": ["dmg"]
    },
    "win": {
      "icon": "build/icons/icon.png", 
      "target": ["nsis"]
    },
    "linux": {
      "icon": "build/icons/icon.png",
      "target": ["AppImage"]
    }
  }
}
```

## 🎨 アイコンカスタマイズ

### アイコン変更方法
1. 新しいアイコンファイル（PNG、512x512推奨）を準備
2. `src/assets/icon.png` を置き換え
3. `build/icons/icon.png` を更新
4. インストーラーを再作成

### アイコン要件
- **形式**: PNG（推奨）、ICO、ICNS
- **サイズ**: 512x512px（推奨）
- **背景**: 透明背景推奨
- **品質**: 高解像度対応

## 🚨 トラブルシューティング

### よくある問題

#### 1. アイコンが表示されない
```bash
# アイコンファイル確認
npm run check-assets

# アイコンファイル再配置
cp KantanPro/images/default/icon.png src/assets/
cp src/assets/icon.png build/icons/
```

#### 2. ビルドエラー
```bash
# 依存関係再インストール
rm -rf node_modules
npm install

# ネイティブモジュール再ビルド
npm run rebuild
```

#### 3. インストーラーが生成されない
```bash
# Reactアプリが正しくビルドされているか確認
cd src/renderer && npm run build

# Electron Builderの詳細ログ
DEBUG=electron-builder npm run dist
```

## 📋 チェックリスト

### ビルド前確認
- [ ] アイコンファイルが配置されている
- [ ] 依存関係がインストールされている
- [ ] Reactアプリがビルドできる
- [ ] データベースファイルが作成される

### ビルド後確認
- [ ] distフォルダにインストーラーが生成されている
- [ ] インストーラーのサイズが適切
- [ ] アイコンが正しく表示される
- [ ] アプリが正常に起動する

## 🎉 配布方法

### インストーラー配布
1. `dist/` フォルダ内のインストーラーファイルを配布
2. 各プラットフォーム用のファイルを提供
3. インストール手順書を添付

### 直接配布
1. `dist/` フォルダ内の実行ファイルを配布
2. 必要な依存関係も含めて配布
3. 設定ファイルの初期化手順を提供

## 💡 最適化のヒント

### ファイルサイズ削減
- 不要な依存関係を削除
- 画像ファイルを最適化
- 開発用ファイルを除外

### パフォーマンス向上
- SQLiteデータベースの最適化
- メモリ使用量の監視
- 起動時間の短縮

---

**🎯 目標**: 簡単にインストールできる、プロフェッショナルなデスクトップアプリケーションの提供

**📞 サポート**: 問題が発生した場合は、`npm run check-assets` でアセット状況を確認してください。