const { app, BrowserWindow, Tray, Menu, nativeImage } = require('electron');
const path = require('path');
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
        icon: path.join(__dirname, '../assests/ai-assistant.png'),
        title: 'AI Assistant',
        resizable: true,
        minimizable : true,
        show: true
    });

    //load the index.html of the app
    mainWindow.loadFile(path.join(__dirname,'renderer/index.html'));
    mainWindow.on('closed', () => {
        mainWindow = null;
    });

    mainWindow.on('close', (event) => {
        if(!app.isQuiting){
            event.preventDefault();
            mainWindow.hide();
            
        }
    })
}


function createTray(){
    const iconPath = path.join(__dirname,'../assests/ai-assistant.png');
    const icon = nativeImage.createFromPath(iconPath);
    let resizeIcon;
    if(!icon.isEmpty()){
        resizeIcon = icon.resize({width: 16, height: 16});
    }
    else{
        console.error("Icon not found at path:", iconPath);
        resizeIcon = nativeImage.createEmpty();
       
    }

    tray = new Tray(resizeIcon);
    const contextMenu = Menu.buildFromTemplate([
        {
            label: 'Show Assistant',
            click: () =>{
                if(mainWindow){
                    mainWindow.show();
                    mainWindow.focus();
                }
            }
        },
        {
            label: 'Hide Assistant',
            click: () =>{
                
                    mainWindow.hide();
                
            }
        },
        {type: 'separator'},
        {
            label: 'Quit',
            click: () => {
                app.isQuiting = true;
                app.quit();
            }
        }
    ])

    tray.setToolTip('AI Assistant');
    tray.setContextMenu(contextMenu);

    tray.on('click', () =>{
        if(mainWindow.isVisible()){
            mainWindow.hide();
        }
        else{
            mainWindow.show();
            mainWindow.focus();
        }
    });
}

//App Event Handlers
app.whenReady().then(() => {
    createWindow();
    createTray();

    console.log('🖥️ AI Assistant frontend started');
    console.log('💡 Click the tray icon to open the chat interface');
});

app.on('window-all-closed', () => {
    if(process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if(BrowserWindow.getAllWindows().length === 0) {
        createWindow();
    }
    else{
        mainWindow.show();
        mainWindow.focus();
    }
});

