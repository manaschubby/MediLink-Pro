const { Patient } = require("./database/schemas");

const getPatients = async (event, ipcMain) => {
	const patients = await Patient.find({})
		.sort({ name: 1, dateAdded: -1 })
		.populate({ path: "appointments", populate: { path: "patient" } });
	console.log(patients);
	return event.reply("patients", JSON.stringify(patients));
};

const getPatient = async (event, arg) => {
	const patient = await Patient.findById(arg).populate({
		path: "appointments",
		populate: { path: "patient" },
	});
	return event.reply("patient", JSON.stringify(patient));
};

const createPatient = async (event, arg) => {
	const patient = await Patient.create(arg);
	return event.reply("patient-created", patient);
};

module.exports = { getPatients, createPatient, getPatient };
