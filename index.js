const { app, BrowserWindow, ipcMain } = require("electron");
const connectDB = require("./database/connectDB");
// Enable live reload for all the files inside the project directory
require("electron-reload")(__dirname);
async function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			preload: __dirname + "/preload.js",
		},
	});
	await connectDB();
	// Load the index.html file of the application
	mainWindow.loadFile("index.html");

	// Open the DevTools for debugging purposes
	mainWindow.webContents.openDevTools();
}

// Event listener for when Electron has finished initialization
app.whenReady().then(async () => {
	await createWindow();

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
