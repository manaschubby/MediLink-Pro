const {
	app,
	BrowserWindow,
	ipcMain,
	ipcRenderer,
	dialog,
} = require("electron");
const connectDB = require("./database/connectDB");
const {
	getPatients,
	getPatient,
	makePatientActive,
	makePatientInactive,
	addNewDiagnosisToPatient,
} = require("./ipcHandlers");
const { createPatient } = require("./ipcHandlers");
// Enable live reload for all the files inside the project directory
require("electron-reload")(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`),
});

async function createWindow() {
	const mainWindow = new BrowserWindow({
		width: 1000,
		height: 600,
		minWidth: 780,
		minHeight: 600,
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
			enableRemoteModule: true,
		},
	});
	// Load the index.html file of the application
	const startUrl =
		process.env.ELECTRON_START_URL ||
		url.format({
			pathname: path.join(__dirname, "../index.html"),
			protocol: "file:",
			slashes: true,
		});
	mainWindow.loadURL(startUrl);
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

// Event listeners for getting patients
ipcMain.on("get-patients", (e, arg) => {
	return getPatients(e, arg);
});

ipcMain.on("get-patient", (e, arg) => {
	return getPatient(e, arg);
});

// Event listeners for creating patients
ipcMain.on("create-patient", (e, arg) => {
	return createPatient(e, arg);
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
	addPatientWindow.removeMenu();
	addPatientWindow.loadURL("http://localhost:3000/add-patient");
	addPatientWindow.once("ready-to-show", () => {
		addPatientWindow.show();
	});
});

ipcMain.on("add-patient-submit", (e, arg) => {
	ipcMain.emit("patient-created", arg);
	const currentWindow = BrowserWindow.getFocusedWindow();
	currentWindow.hide();
});

ipcMain.on("add-file", (e, arg) => {
	// A files dialog box will be opened and it should disable the main window
	// until the dialog box is closed
	const currentWindow = BrowserWindow.getFocusedWindow();
	dialog
		.showOpenDialog(currentWindow, {
			properties: ["openFile"],
		})
		.then((result) => {
			if (!result.canceled) {
				e.reply("file-path", result.filePaths[0]);
			}
		});
});

// Event listeners for making patients active or inactive
ipcMain.on("make-patient-active", (e, arg) => {
	return makePatientActive(e, arg);
});
ipcMain.on("make-patient-inactive", (e, arg) => {
	return makePatientInactive(e, arg);
});

// Event listener for adding diagnosis
ipcMain.on("add-diagnosis", (e, arg) => {
	return addNewDiagnosisToPatient(e, arg);
});

// Event listener for searching patients
ipcMain.on("search-patients", (e, arg) => {
	return searchPatients(e, arg);
});
