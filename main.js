const path = require('path')
const glob = require('glob')
const electron = require('electron')

const browserWindow = electron.BrowserWindow
const app = electron.app

const debug = /--debug/.test(process.argv[2])

let mainWindow = null

function initialize() {
	loadFiles()

	function createWindow() {
		var windowOptions = {
			width: 1080,
			minWidth: 680,
			height: 840
		}

		if(process.platform === 'linux') {
			windowOptions.icon = path.join(__dirname, '/assets/app-icon/png/512.png')
		}

		mainWindow = new browserWindow(windowOptions)
		mainWindow.loadURL(path.join('file://', __dirname, '/index.html'))
		
		if(debug) {
			mainWindow.webContents.openDevTools()
			mainWindow.maximize()
			require('devtron').install()
		}
	}

	app.on('ready', function() {
		createWindow()
	})
}

function loadFiles() {
	var files = glob.sync(path.join(__dirname, 'main-process/**/*.js'))
	files.forEach(function(file) {
		require(file)
	})
}

initialize()
