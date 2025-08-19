const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

// アイコンサイズの定義
const iconSizes = {
  // Windows用
  'icon.ico': [16, 24, 32, 48, 64, 128, 256],
  // macOS用
  'icon.icns': [16, 32, 64, 128, 256, 512, 1024],
  // Linux用
  'icon.png': [512]
};

async function createIcons() {
  const sourceIcon = 'src/assets/icon.png';
  const buildDir = 'build';
  
  // buildディレクトリを作成
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }

  try {
    console.log('🎨 アイコンファイルを生成中...');
    
    // 元画像の情報を取得
    const metadata = await sharp(sourceIcon).metadata();
    console.log(`📏 元画像サイズ: ${metadata.width}x${metadata.height}`);

    // PNG形式のアイコンを生成（各プラットフォーム用）
    const sizes = [16, 32, 48, 64, 128, 256, 512, 1024];
    
    for (const size of sizes) {
      const outputPath = path.join(buildDir, `icon-${size}x${size}.png`);
      await sharp(sourceIcon)
        .resize(size, size, {
          kernel: sharp.kernel.lanczos3,
          fit: 'contain',
          background: { r: 0, g: 0, b: 0, alpha: 0 }
        })
        .png()
        .toFile(outputPath);
      
      console.log(`✅ 生成完了: ${outputPath}`);
    }

    // メインアイコンファイルをコピー
    const mainIconPath = path.join(buildDir, 'icon.png');
    await sharp(sourceIcon)
      .resize(512, 512, {
        kernel: sharp.kernel.lanczos3,
        fit: 'contain',
        background: { r: 0, g: 0, b: 0, alpha: 0 }
      })
      .png()
      .toFile(mainIconPath);
    
    console.log(`✅ メインアイコン生成: ${mainIconPath}`);

    // Electron Builder用のアイコンディレクトリ構造を作成
    const electronIconsDir = 'build/icons';
    if (!fs.existsSync(electronIconsDir)) {
      fs.mkdirSync(electronIconsDir, { recursive: true });
    }

    // 各プラットフォーム用のアイコンをコピー
    fs.copyFileSync(mainIconPath, path.join(electronIconsDir, 'icon.png'));
    
    console.log('🎉 アイコン生成完了！');
    console.log('📁 生成されたファイル:');
    
    const files = fs.readdirSync(buildDir);
    files.forEach(file => {
      if (file.includes('icon')) {
        console.log(`   ${file}`);
      }
    });

  } catch (error) {
    console.error('❌ アイコン生成エラー:', error);
    
    // Sharpが利用できない場合の代替処理
    console.log('📋 手動でのアイコン作成手順:');
    console.log('1. src/assets/icon.png を以下のサイズにリサイズしてください:');
    console.log('   - 16x16, 32x32, 48x48, 64x64, 128x128, 256x256, 512x512');
    console.log('2. build/icons/ フォルダに icon.png (512x512) を配置してください');
    console.log('3. Windows用には .ico ファイル、macOS用には .icns ファイルが必要です');
  }
}

// Sharp がインストールされているかチェック
try {
  require('sharp');
  createIcons();
} catch (error) {
  console.log('⚠️  Sharp がインストールされていません。手動でアイコンを作成してください。');
  console.log('📦 Sharp をインストールする場合: npm install sharp --save-dev');
  
  // 基本的なアイコンディレクトリを作成
  const buildDir = 'build';
  const iconsDir = 'build/icons';
  
  if (!fs.existsSync(buildDir)) {
    fs.mkdirSync(buildDir, { recursive: true });
  }
  
  if (!fs.existsSync(iconsDir)) {
    fs.mkdirSync(iconsDir, { recursive: true });
  }
  
  // 元のアイコンをコピー
  fs.copyFileSync('src/assets/icon.png', 'build/icons/icon.png');
  console.log('✅ 基本アイコンをコピーしました: build/icons/icon.png');
}