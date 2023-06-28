const {
	Patient,
	Diagnosis,
	Symptom,
	Medication,
} = require("./database/schemas");

const getPatients = async (event, ipcMain) => {
	const patients = await Patient.find({})
		.sort({ name: 1, dateAdded: -1 })
		.populate({ path: "appointments", populate: { path: "patient" } })
		.populate({ path: "visitHistory", populate: { path: "patient" } });
	console.log(patients);
	return event.reply("patients", JSON.stringify(patients));
};

const getPatient = async (event, arg) => {
	const patient = await Patient.findById(arg)
		.populate({
			path: "appointments",
			populate: { path: "patient" },
		})
		.populate({
			path: "visitHistory",
			populate: { path: "patient" },
		});
	return event.reply("patient", JSON.stringify(patient));
};

const createPatient = async (event, arg) => {
	const { diagnosis, medications, symptoms } = arg;
	const diagnoses = await Diagnosis.insertMany(diagnosis);
	const addMedications = await Medication.insertMany(medications);
	const addSymptoms = await Symptom.insertMany(symptoms);
	const patient = await Patient.create({
		...arg,
		diagnosis: diagnoses,
		medications: addMedications,
		symptoms: addSymptoms,
	});

	return event.reply("patient-created", JSON.stringify(patient));
};

module.exports = { getPatients, createPatient, getPatient };
