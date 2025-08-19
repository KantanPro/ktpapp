const fs = require('fs');
const path = require('path');

console.log('🔍 KantanPro Desktop アセット確認');
console.log('=====================================\n');

// アイコンファイルの確認
const iconPaths = [
  'src/assets/icon.png',
  'build/icons/icon.png',
  'KantanPro/images/default/icon.png'
];

console.log('📱 アプリアイコン:');
iconPaths.forEach(iconPath => {
  if (fs.existsSync(iconPath)) {
    const stats = fs.statSync(iconPath);
    const size = (stats.size / 1024).toFixed(2);
    console.log(`   ✅ ${iconPath} (${size} KB)`);
  } else {
    console.log(`   ❌ ${iconPath} (見つかりません)`);
  }
});

// ビルドディレクトリの確認
console.log('\n📁 ビルドディレクトリ:');
const buildDirs = ['build', 'dist', 'src/renderer/build'];
buildDirs.forEach(dir => {
  if (fs.existsSync(dir)) {
    console.log(`   ✅ ${dir}/`);
    if (dir === 'dist') {
      try {
        const files = fs.readdirSync(dir);
        files.forEach(file => {
          const filePath = path.join(dir, file);
          const stats = fs.statSync(filePath);
          const size = (stats.size / 1024 / 1024).toFixed(2);
          console.log(`      📦 ${file} (${size} MB)`);
        });
      } catch (error) {
        console.log(`      ⚠️  ディレクトリの読み込みエラー: ${error.message}`);
      }
    }
  } else {
    console.log(`   ❌ ${dir}/ (見つかりません)`);
  }
});

// package.json の確認
console.log('\n⚙️  設定確認:');
try {
  const packageJson = JSON.parse(fs.readFileSync('package.json', 'utf8'));
  console.log(`   アプリ名: ${packageJson.build?.productName || packageJson.name}`);
  console.log(`   バージョン: ${packageJson.version}`);
  console.log(`   アプリID: ${packageJson.build?.appId}`);
  
  if (packageJson.build?.mac?.icon) {
    console.log(`   macOSアイコン: ${packageJson.build.mac.icon}`);
  }
  if (packageJson.build?.win?.icon) {
    console.log(`   Windowsアイコン: ${packageJson.build.win.icon}`);
  }
  if (packageJson.build?.linux?.icon) {
    console.log(`   Linuxアイコン: ${packageJson.build.linux.icon}`);
  }
} catch (error) {
  console.log(`   ❌ package.json の読み込みエラー: ${error.message}`);
}

console.log('\n🚀 インストーラー作成コマンド:');
console.log('   npm run build-installer');
console.log('\n📍 インストーラー保存場所:');
console.log('   ./dist/ フォルダ');

console.log('\n💡 ヒント:');
console.log('   - アイコンが見つからない場合は、KantanProフォルダから手動でコピーしてください');
console.log('   - インストーラー作成前に npm install を実行してください');
console.log('   - 生成されたインストーラーは dist/ フォルダに保存されます');