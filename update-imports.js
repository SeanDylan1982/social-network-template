const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readFile = promisify(fs.readFile);
const writeFile = promisify(fs.writeFile);
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Files to process
const EXTENSIONS = ['.ts', '.tsx', '.js', '.jsx', '.json'];

// Patterns to replace
const REPLACEMENTS = [
  {
    // Convert relative imports from src to @/
    pattern: /from ['"](?:\.\.?\/)*src\/(.*?)['"]/g,
    replacement: 'from "@/$1"',
  },
  {
    // Convert relative imports to use @/components
    pattern: /from ['"](?:\.\.?\/)*components\/(.*?)['"]/g,
    replacement: 'from "@/components/$1"',
  },
  // Add more patterns as needed
];

async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let updatedContent = content;
    
    // Apply all replacements
    for (const { pattern, replacement } of REPLACEMENTS) {
      updatedContent = updatedContent.replace(pattern, replacement);
    }
    
    // Only write if content changed
    if (updatedContent !== content) {
      await writeFile(filePath, updatedContent, 'utf8');
      console.log(`Updated imports in: ${filePath}`);
      return true;
    }
    return false;
  } catch (error) {
    console.error(`Error processing file ${filePath}:`, error);
    return false;
  }
}

async function processDirectory(directory) {
  try {
    const entries = await readdir(directory, { withFileTypes: true });
    let updatedCount = 0;
    
    for (const entry of entries) {
      const fullPath = path.join(directory, entry.name);
      
      // Skip node_modules, .next, etc.
      if (entry.isDirectory()) {
        if (['node_modules', '.next', '.git'].includes(entry.name)) {
          continue;
        }
        updatedCount += await processDirectory(fullPath);
      } else if (EXTENSIONS.includes(path.extname(entry.name).toLowerCase())) {
        const wasUpdated = await processFile(fullPath);
        if (wasUpdated) updatedCount++;
      }
    }
    
    return updatedCount;
  } catch (error) {
    console.error(`Error processing directory ${directory}:`, error);
    return 0;
  }
}

async function main() {
  console.log('Starting to update import paths...');
  
  try {
    const directoriesToProcess = [
      path.join(__dirname, 'pages'),
      path.join(__dirname, 'src')
    ];
    
    let totalUpdated = 0;
    
    for (const dir of directoriesToProcess) {
      console.log(`\nProcessing directory: ${dir}`);
      const count = await processDirectory(dir);
      totalUpdated += count;
      console.log(`Updated ${count} files in ${dir}`);
    }
    
    console.log(`\n✅ Successfully updated imports in ${totalUpdated} files.`);
  } catch (error) {
    console.error('Error during import path update:', error);
    process.exit(1);
  }
}

main();
