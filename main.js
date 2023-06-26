const { app, BrowserWindow, ipcMain } = require("electron");
const connectDB = require("./database/connectDB");
// Enable live reload for all the files inside the project directory
require("electron-reload")(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`),
});
async function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	// Load the index.html file of the application
	mainWindow.loadURL("http://localhost:3000");

	// Open the DevTools for debugging purposes
	mainWindow.webContents.openDevTools();
}

// Event listener for when Electron has finished initialization
app.whenReady().then(async () => {
	await createWindow();
	await connectDB();
	// Event listener for macOS when all windows are closed
	app.on("window-all-closed", () => {
		if (process.platform !== "darwin") {
			app.quit();
		}
	});
});

// Event listener for macOS when the application is activated
app.on("activate", () => {
	if (BrowserWindow.getAllWindows().length === 0) {
		createWindow();
	}
});

// Handle IPC event to require modules in the renderer process
ipcMain.handle("require", (event, module) => {
	return require(module);
});
