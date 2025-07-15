const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const copyFile = promisify(fs.copyFile);
const mkdir = promisify(fs.mkdir);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

async function copyDir(src, dest) {
  // Create destination directory if it doesn't exist
  try {
    await mkdir(dest, { recursive: true });
  } catch (err) {
    if (err.code !== 'EEXIST') throw err;
  }

  // Read the source directory
  const entries = await readdir(src, { withFileTypes: true });

  // Process each entry
  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      // Recursively copy subdirectories
      await copyDir(srcPath, destPath);
    } else {
      // Copy files
      await copyFile(srcPath, destPath);
      console.log(`Copied: ${srcPath} -> ${destPath}`);
    }
  }
}

// Run the copy
async function main() {
  try {
    const srcDir = path.join(__dirname, 'src', 'pages');
    const destDir = path.join(__dirname, 'pages');
    
    console.log(`Copying files from ${srcDir} to ${destDir}...`);
    await copyDir(srcDir, destDir);
    console.log('All files copied successfully!');
  } catch (error) {
    console.error('Error copying files:', error);
    process.exit(1);
  }
}

main();
