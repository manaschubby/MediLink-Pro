// preload.js
const { contextBridge, ipcRenderer } = require("electron");
const { Appointment } = require("./database/schemas");

contextBridge.exposeInMainWorld("electronAPI", {
	require: (module) => {
		return require(module);
	},
	appointment: async (all, id = null) => {
		if (!all) {
			return await Appointment.findById(id);
		} else {
			console.log("all");
			return await Appointment.find({});
		}
	},
});
