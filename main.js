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
	addNewAppointmentToPatient,
	addNewMedicationToPatient,
	addFile,
	getAppointments,
} = require("./ipcHandlers");
const fs = require("fs");
const { createPatient } = require("./ipcHandlers");
const Store = require("./store.js");
// Enable live reload for all the files inside the project directory
require("electron-reload")(__dirname, {
	electron: require(`${__dirname}/node_modules/electron`),
});

const store = new Store({
	// We'll call our data file 'user-preferences'
	configName: "user-preferences",
	defaults: {
		// 800x600 is the default size of our window
		patientFilePath: "unset",
	},
});

const isDev = process.env.NODE_ENV === "development" ? true : false;

const loadURL = (window, url) => {
	if (isDev) {
		window.loadURL(`http://localhost:3000#${url}`);
	} else {
		if (url === "") {
			window.loadFile(`app/build/index.html`);
		} else {
			window.loadFile(`app/build/index.html/#${url}`);
		}
	}
	window.once("ready-to-show", () => {
		window.show();
	});
};
async function createWindow() {
	if (store.get("patientFilePath") === "unset") {
		// Open a window to ask user to select a patient file
		const patientFileWindow = new BrowserWindow({
			width: 900,
			height: 600,
			webPreferences: {
				nodeIntegration: true,
				contextIsolation: false,
				enableRemoteModule: true,
			},
		});
		patientFileWindow.removeMenu();
		loadURL(patientFileWindow, "patient-file");
	} else {
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
		loadURL(mainWindow, "");
	}
}

// Event listener for when Electron has finished initialization
app.whenReady().then(async () => {
	await connectDB();
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
	loadURL(addPatientWindow, "add-patient");
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
				addFile(e, arg, result);
			}
		});
});

// Event listeners for selecting file location to store patient files
ipcMain.on("file-location-select", (e, arg) => {
	const currentWindow = BrowserWindow.getFocusedWindow();
	dialog
		.showOpenDialog(currentWindow, {
			properties: ["openDirectory", "createDirectory"],
		})
		.then((result) => {
			if (!result.canceled) {
				e.reply("file-location", result.filePaths[0]);
			}
		});
});
ipcMain.on("file-location-submit", (e, arg) => {
	const currentWindow = BrowserWindow.getFocusedWindow();
	if (arg) {
		// Check if file path is valid and accessible
		fs.access(arg, fs.constants.W_OK, (err) => {
			if (err) {
				e.reply("file-location-error", true);
			} else {
				store.set("patientFilePath", arg);
				currentWindow.hide();
				createWindow();
			}
		});
	} else {
		e.reply("file-location-error", true);
	}
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

// Event listener for adding appointment
ipcMain.on("add-appointment", (e, arg) => {
	return addNewAppointmentToPatient(e, arg);
});

// Event listener for adding medication
ipcMain.on("add-medication", (e, arg) => {
	return addNewMedicationToPatient(e, arg);
});

// Event listener for searching patients
ipcMain.on("search-patients", (e, arg) => {
	// return searchPatients(e, arg);
});

// Event listener for getting appointments
ipcMain.on("get-appointments", (e, arg) => {
	return getAppointments(e, arg);
});
