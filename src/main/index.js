import { app, BrowserWindow, ipcMain } from 'electron'
const autoUpdater = require('electron-updater').autoUpdater
import {search} from '../libs/serp'
/**
 * Set `__static` path to static files in production
 * https://simulatedgreg.gitbooks.io/electron-vue/content/en/using-static-assets.html
 */
if (process.env.NODE_ENV !== 'development') {
  global.__static = require('path').join(__dirname, '/static').replace(/\\/g, '\\\\')
}

let mainWindow
const winURL = process.env.NODE_ENV === 'development'
  ? `http://localhost:9080`
  : `file://${__dirname}/index.html`

function createWindow () {
  /**
   * Initial window options
   */
  mainWindow = new BrowserWindow({
    height: 660,
    useContentSize: true,
    width: 800,
    resizable: false,
    webPreferences: {
      nodeIntegration: true,
      enableRemoteModule: true
    },

  })

  mainWindow.loadURL(winURL)

  mainWindow.on('closed', () => {
    mainWindow = null
  })
}

app.on('ready', () => {
  createWindow()
  autoUpdater.checkForUpdates()
})

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
  }
})

app.on('activate', () => {
  if (mainWindow === null) {
    createWindow()
  }
})

let SCRAPE_STARTED = false
let STOP_SCRAPE = false
let PAUSE_SCRAPE = false

const pause = () => {
  return new Promise(resolve => setTimeout(resolve, 5000))
}

const sendResult = async (event, {link, title, keyword}) => {
  if (STOP_SCRAPE) {
    return
  }

  event.reply('scrape-result', {
    keyword,
    title,
    link
  })
}

const startScrape = async (event, {selectedCountry, numResults, delay, keywords}) => {
  event.reply('scrape-state', {
    status: true
  })
  console.log('well received')
  SCRAPE_STARTED = true
  console.log(keywords)
  for (let keyword of keywords) {
    if (STOP_SCRAPE) {
      return
    }

    console.log(keyword)
    var options = {
      host : `google.${selectedCountry}`,
      qs : {
        q : keyword,
        filter : 0,
        pws : 0
      },
      num : numResults,
      delay: delay
    };
    const links = await search(options, ({url, title}) => {
      sendResult(event, {
        link: url,
        title, 
        keyword
      })
    });
  
    
  
  }


  if (STOP_SCRAPE) {
    STOP_SCRAPE = false
  }

  event.reply('scrape-state', {
    status: false
  })
  
}



ipcMain.on('stop-scrape', async (event, args) => {
  console.log('hello', args)
  
  STOP_SCRAPE = true
  
  event.reply('scrape-state', {
    status: false
  })
  
})

ipcMain.on('start-scrape', async (event, args) => {
  console.log('hello', args)
  STOP_SCRAPE = false

  const { data } = args

  
  startScrape(event, data)
  
})


ipcMain.on('restart_app', () => {
  autoUpdater.quitAndInstall()
})

autoUpdater.on('update-available', () => {
  console.log('Update')
  mainWindow.webContents.send('update_available')
})
autoUpdater.on('download-progress', (progressObj) => {
  let logMessage = 'Download speed: ' + progressObj.bytesPerSecond
  logMessage = logMessage + ' - Downloaded ' + progressObj.percent + '%'
  logMessage = logMessage + ' (' + progressObj.transferred + '/' + progressObj.total + ')'

  mainWindow.webContents.send('download-progress', logMessage)
})
autoUpdater.on('update-downloaded', () => {
  mainWindow.webContents.send('update_downloaded')
})