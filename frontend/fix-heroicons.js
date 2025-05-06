/**
 * Fix Heroicons v1 compatibility issues
 * 
 * This script replaces v2 icon imports with v1 equivalents
 * Run with: node fix-heroicons.js
 */

const fs = require('fs');
const path = require('path');
const util = require('util');
const readdir = util.promisify(fs.readdir);
const readFile = util.promisify(fs.readFile);
const writeFile = util.promisify(fs.writeFile);
const stat = util.promisify(fs.stat);

// Icon mapping from v2 to v1
const iconMappings = {
  // Outline icons
  'ChatBubbleLeftIcon': 'ChatAltIcon',
  'DevicePhoneMobileIcon': 'DeviceMobileIcon',
  'ArrowPathIcon': 'RefreshIcon',
  'SunIcon': 'LightBulbIcon', // No direct equivalent, using LightBulbIcon as fallback
  
  // Solid icons
  'ChatBubbleLeftIconSolid': 'ChatIconSolid', 
};

// Directories to search for files
const directories = [
  path.join(__dirname, 'src'),
];

// File extensions to process
const extensions = ['.tsx', '.jsx', '.ts', '.js'];

// Function to check if a file has one of the target extensions
const hasTargetExtension = (file) => {
  const ext = path.extname(file);
  return extensions.includes(ext);
};

// Function to recursively scan directories
async function scanDirectory(directory) {
  const files = await readdir(directory);
  const results = [];

  for (const file of files) {
    const filePath = path.join(directory, file);
    const fileStat = await stat(filePath);

    if (fileStat.isDirectory()) {
      const nestedResults = await scanDirectory(filePath);
      results.push(...nestedResults);
    } else if (hasTargetExtension(filePath)) {
      results.push(filePath);
    }
  }

  return results;
}

// Function to process a file
async function processFile(filePath) {
  try {
    const content = await readFile(filePath, 'utf8');
    let modified = false;
    let newContent = content;

    // Replace icon imports
    for (const [v2Icon, v1Icon] of Object.entries(iconMappings)) {
      if (newContent.includes(v2Icon)) {
        newContent = newContent.replace(new RegExp(v2Icon, 'g'), v1Icon);
        modified = true;
      }
    }

    if (modified) {
      await writeFile(filePath, newContent, 'utf8');
      console.log(`Updated: ${filePath}`);
    }
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error);
  }
}

// Main function
async function main() {
  try {
    const files = [];
    
    for (const directory of directories) {
      const dirFiles = await scanDirectory(directory);
      files.push(...dirFiles);
    }
    
    console.log(`Found ${files.length} files to process`);
    
    for (const file of files) {
      await processFile(file);
    }
    
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error);
  }
}

main(); 