
process.on('loaded', () => {
  global.ipcRenderer = require('electron').ipcRenderer;
});