const { app, BrowserWindow } = require("electron");
// Enable live reload for all the files inside the project directory
require("electron-reload")(__dirname);
function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
		},
	});

	// Load the index.html file of the application
	mainWindow.loadFile("index.html");

	// Open the DevTools for debugging purposes
	mainWindow.webContents.openDevTools();
}

// Event listener for when Electron has finished initialization
app.whenReady().then(() => {
	createWindow();

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
