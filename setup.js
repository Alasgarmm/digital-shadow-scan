
const { execSync } = require('child_process');
const path = require('path');
const fs = require('fs');

console.log('Installing dependencies for the project...');

// Install root dependencies
console.log('\nInstalling root dependencies...');
execSync('npm install', { stdio: 'inherit' });

// Install backend dependencies
console.log('\nInstalling backend dependencies...');
process.chdir(path.join(__dirname, 'backend'));
execSync('npm install', { stdio: 'inherit' });

// Install frontend dependencies
console.log('\nInstalling frontend dependencies...');
process.chdir(path.join(__dirname, '..', 'frontend'));
execSync('npm install', { stdio: 'inherit' });

console.log('\nAll dependencies installed successfully!');
console.log('You can now run the application with: npm run dev');
