const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const rmdir = promisify(fs.rm || fs.rmdir);

async function removeDirectory(dirPath) {
  try {
    await rmdir(dirPath, { recursive: true, force: true });
    console.log(`Successfully removed directory: ${dirPath}`);
    return true;
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.log(`Directory does not exist: ${dirPath}`);
      return true;
    }
    console.error(`Error removing directory ${dirPath}:`, error);
    return false;
  }
}

async function main() {
  const srcPagesPath = path.join(__dirname, 'src', 'pages');
  console.log(`Attempting to remove directory: ${srcPagesPath}`);
  
  const success = await removeDirectory(srcPagesPath);
  
  if (success) {
    console.log('✅ Cleanup completed successfully');
  } else {
    console.error('❌ Cleanup encountered errors');
    process.exit(1);
  }
}

main();
