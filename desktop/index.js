const { app, BrowserWindow, Menu } = require("electron");
const isDev = require("electron-is-dev");
const path = require("path");

function createWindow() {
  const win = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  win.maximize();
  win.show();

  // if (isDev) {
  //   win.loadURL("http://localhost:3000");
  //   win.webContents.openDevTools();
  // } else {
  //   win.loadFile(path.join(__dirname, "react-app/build/index.html"));
  // }
  win.loadURL("http://localhost:3000");
  // win.webContents.openDevTools();
}
function createSplashWindow() {
  const splashWindow = new BrowserWindow({
    show: false,
    webPreferences: {
      nodeIntegration: true,
    },
  });
  splashWindow.maximize();
  splashWindow.show();

  splashWindow.loadFile('./splash.html');

  return splashWindow;
}
app.on('ready', () => {
  Menu.setApplicationMenu(null);
  const splashWindow = createSplashWindow();
  splashWindow;
  setTimeout(() => {
    createWindow();
    splashWindow.destroy();
  }, 5000);
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});

app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
