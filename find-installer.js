const fs = require('fs');
const path = require('path');

console.log('🔍 KantanPro Desktop インストーラー検索');
console.log('==========================================\n');

// 現在の作業ディレクトリ
const currentDir = process.cwd();
console.log(`📁 現在のディレクトリ: ${currentDir}`);

// distフォルダの確認
const distDir = path.join(currentDir, 'dist');
console.log(`📁 distフォルダ: ${distDir}`);

if (fs.existsSync(distDir)) {
  console.log('✅ distフォルダが存在します\n');
  
  // distフォルダ内のファイル一覧
  console.log('📦 distフォルダ内のファイル:');
  const files = fs.readdirSync(distDir);
  
  files.forEach(file => {
    const filePath = path.join(distDir, file);
    const stats = fs.statSync(filePath);
    
    if (stats.isFile()) {
      const size = (stats.size / 1024 / 1024).toFixed(2);
      const fullPath = path.resolve(filePath);
      
      if (file.endsWith('.dmg')) {
        console.log(`🎯 ${file}`);
        console.log(`   サイズ: ${size} MB`);
        console.log(`   フルパス: ${fullPath}`);
        console.log(`   存在確認: ${fs.existsSync(fullPath) ? '✅' : '❌'}`);
        console.log('');
      } else {
        console.log(`   ${file} (${size} MB)`);
      }
    } else {
      console.log(`   📁 ${file}/`);
    }
  });
  
  // DMGファイルの詳細情報
  const dmgFiles = files.filter(file => file.endsWith('.dmg'));
  
  if (dmgFiles.length > 0) {
    console.log('\n🎉 インストーラーファイルが見つかりました！');
    console.log('\n📍 インストーラーの場所:');
    
    dmgFiles.forEach(dmgFile => {
      const fullPath = path.resolve(distDir, dmgFile);
      console.log(`   ${fullPath}`);
    });
    
    console.log('\n💻 Finderで開く方法:');
    console.log(`   1. Finderを開く`);
    console.log(`   2. 以下のパスに移動: ${distDir}`);
    console.log(`   3. DMGファイルをダブルクリック`);
    
    console.log('\n🖱️  ターミナルから開く方法:');
    console.log(`   open "${distDir}"`);
    
    console.log('\n📦 インストール方法:');
    console.log('   1. DMGファイルをダブルクリック');
    console.log('   2. マウントされたディスクイメージを開く');
    console.log('   3. KantanPro Desktop.app を Applications フォルダにドラッグ');
    console.log('   4. アプリケーションフォルダから起動');
    
  } else {
    console.log('\n❌ DMGファイルが見つかりません');
    console.log('インストーラーを再作成してください: npm run build-installer');
  }
  
} else {
  console.log('❌ distフォルダが存在しません');
  console.log('インストーラーを作成してください: npm run build-installer');
}

console.log('\n🔧 トラブルシューティング:');
console.log('   - Spotlightで検索: "KantanPro Desktop"');
console.log('   - Finderで検索: ファイル名に "dmg" を含む');
console.log(`   - 直接パス: ${path.resolve(distDir)}`);