const path = require('path');

// Absolute project root path (where package.json is located)
const projectRoot = process.cwd();

// Folder where Playwright auth state files are stored
const authDir = path.join(projectRoot, 'playwright', '.auth');

// Auth state file for the standard user session
const storageStatePath = path.join(authDir, 'standard_user.json');

module.exports = {
  projectRoot, authDir, storageStatePath,
};