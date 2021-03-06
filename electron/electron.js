const path = require('path');
const os = require('os');

// Modules to control application life and create native browser window
const {app, BrowserWindow, ipcMain} = require('electron');

const isDev = require('electron-is-dev');

// Keep a global reference of the window object, if you don't, the window will
// be closed automatically when the JavaScript object is garbage collected.
let mainWindow

function createWindow () {

  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1440,
    height: 900,
    webPreferences: {
      nodeIntegration: true // is default value after Electron v5
    }
  });

  // and load the index.html of the app.
  const startUrl = isDev ? 'http://localhost:3000' : `file://${path.join(__dirname, '../build/index.html')}`;
  
  mainWindow.loadURL(startUrl);
  // Open the DevTools.
  // mainWindow.webContents.openDevTools()

  setInterval(() => {
    const totalmem = os.totalmem();
    const usedmem = totalmem - os.freemem();

    const data = {
      system: {
        type: os.type(),
        platform: os.platform(),
        arch: os.arch(),
        uptime: os.uptime(),
        release: os.release(),
        name: os.hostname()
      },
      user: os.userInfo(),
      cpus: os.cpus(),
      ram: {
        totalmem,
        usedmem
      },
      network: os.networkInterfaces()
    };
    
    mainWindow.webContents.send('hardwareData', data);
  }, 1000);

  mainWindow.once('ready-to-show', () => mainWindow.show());

  // Emitted when the window is closed.
  mainWindow.on('closed', function () {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    mainWindow = null;
  });
}

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(createWindow);

// Quit when all windows are closed.
app.on('window-all-closed', function () {
  // On OS X it is common for applications and their menu bar
  // to stay active until the user quits explicitly with Cmd + Q
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('activate', function () {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
});

// In this file you can include the rest of your app's specific main process
// code. You can also put them in separate files and require them here.