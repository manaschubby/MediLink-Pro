const { app, BrowserWindow, ipcMain, ipcRenderer } = require("electron");
const connectDB = require("./database/connectDB");
const { getPatients, getPatient } = require("./ipcHandlers");
const { createPatient } = require("./ipcHandlers");
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

ipcMain.handle("require", (event, module) => {
	return require(module);
});
ipcMain.on("get-patients", (e, arg) => {
	return getPatients(e, arg);
});
ipcMain.on("create-patient", (e, arg) => {
	return createPatient(e, arg);
});
ipcMain.on("get-patient", (e, arg) => {
	return getPatient(e, arg);
});

ipcMain.on("add-patient", (e, arg) => {
	const addPatientWindow = new BrowserWindow({
		parent: BrowserWindow.getFocusedWindow(),
		modal: true,
		show: false,
		width: 900,
		height: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	addPatientWindow.loadURL("http://localhost:3000/add-patient");
	addPatientWindow.once("ready-to-show", () => {
		addPatientWindow.show();
	});
});

ipcMain.on("add-patient-submit", (e, arg) => {
	const currentWindow = BrowserWindow.getFocusedWindow();
	currentWindow.hide();
});
