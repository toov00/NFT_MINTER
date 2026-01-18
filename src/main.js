import { app, BrowserWindow } from 'electron';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let mainWindow;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 400,
    height: 500,
    minWidth: 350,
    minHeight: 400,
    webPreferences: {
      nodeIntegration: false, 
      contextIsolation: true,
      sandbox: true,
    },
  });

  // Load the development server URL
  const devServerUrl = 'http://localhost:5173';
  mainWindow.loadURL(devServerUrl).catch((err) => {
    console.error('Failed to load URL:', err);
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) createWindow();
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') app.quit();
});
