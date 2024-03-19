const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, 'build/static/js'); // Path to your build directory
const publicDir = path.join(__dirname, 'public'); // Path to your public directory

const chunkJsFiles = fs.readdirSync(buildDir)
  .filter(file => file.endsWith('.js'));

const concatenatedContent = chunkJsFiles
  .map(file => fs.readFileSync(path.join(buildDir, file), 'utf8'))
  .join('\n');

const indexPath = path.join(publicDir, '/index.js');

const chunkCssFiles = fs.readdirSync(path.join(__dirname, 'build/static/css'))
  .filter(file => file.endsWith('.css'));

const concatenatedCssContent = chunkCssFiles 
  .map(file => fs.readFileSync(path.join(__dirname, 'build/static/css', file), 'utf8'))
  .join('\n');

const cssPath = path.join(publicDir, '/index.css');
fs.writeFileSync(cssPath, concatenatedCssContent, 'utf8');

fs.writeFileSync(indexPath, concatenatedContent, 'utf8');