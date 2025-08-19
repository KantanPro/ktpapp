const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 KantanPro Desktop インストーラー作成開始...');

// 1. 依存関係のインストール
console.log('📦 依存関係をインストール中...');
try {
  execSync('npm install', { stdio: 'inherit' });
  execSync('cd src/renderer && npm install', { stdio: 'inherit' });
  console.log('✅ 依存関係のインストール完了');
} catch (error) {
  console.error('❌ 依存関係のインストールに失敗:', error.message);
  process.exit(1);
}

// 2. Reactアプリのビルド
console.log('🔨 Reactアプリをビルド中...');
try {
  execSync('cd src/renderer && npm run build', { stdio: 'inherit' });
  console.log('✅ Reactアプリのビルド完了');
} catch (error) {
  console.error('❌ Reactアプリのビルドに失敗:', error.message);
  process.exit(1);
}

// 3. Electronアプリのビルド
console.log('📱 Electronアプリをビルド中...');
try {
  execSync('npm run dist', { stdio: 'inherit' });
  console.log('✅ Electronアプリのビルド完了');
} catch (error) {
  console.error('❌ Electronアプリのビルドに失敗:', error.message);
  process.exit(1);
}

// 4. ビルド結果の確認
const distDir = path.join(__dirname, 'dist');
if (fs.existsSync(distDir)) {
  const files = fs.readdirSync(distDir);
  console.log('📁 生成されたインストーラー:');
  files.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    const size = (stats.size / 1024 / 1024).toFixed(2);
    const fullPath = path.resolve(filePath);
    console.log(`   📦 ${file} (${size} MB)`);
    console.log(`      場所: ${fullPath}`);
  });
  
  console.log('\n📍 インストーラーの場所:');
  console.log(`   ${path.resolve(distDir)}`);
} else {
  console.error('❌ distディレクトリが見つかりません');
  process.exit(1);
}

console.log('🎉 インストーラー作成完了！');
console.log('📍 インストーラーは dist/ フォルダにあります');

// プラットフォーム別の説明
const platform = process.platform;
switch (platform) {
  case 'win32':
    console.log('🪟 Windows: .exe ファイルを実行してインストールしてください');
    break;
  case 'darwin':
    console.log('🍎 macOS: .dmg ファイルをマウントしてアプリケーションフォルダにドラッグしてください');
    break;
  case 'linux':
    console.log('🐧 Linux: .AppImage ファイルに実行権限を付与して実行してください');
    break;
  default:
    console.log('📦 生成されたファイルを使用してインストールしてください');
}

console.log('\n🔧 開発モードで実行する場合:');
console.log('   npm run dev');
console.log('\n📚 詳細な使用方法は README.md をご確認ください');