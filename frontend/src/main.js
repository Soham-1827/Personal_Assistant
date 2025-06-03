import { app, BrowserWindow, Tray, Menu, nativeImage } from 'electron';
import path from 'path';

let mainWindow;
let tray;

function createWindow() {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            contextIsolation: false,
        },
        //icon (add this later)
        title: 'AI Assistant',
        resizable: true,
        minimizable : true,
        show: false
    });
}


