const {
	Patient,
	Diagnosis,
	Symptom,
	Medication,
	Medicine,
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

// Creation functions

// Check the uniqueness of the syymptom
const checkSymptom = async (symptom) => {
	const foundSymptom = await Symptom.findOne({ name: symptom });
	if (foundSymptom) {
		return foundSymptom;
	}
	return null;
};
// Check the uniqueness of the diagnosis
const checkDiagnosis = async (diagnosis) => {
	const foundDiagnosis = await Diagnosis.findOne({ name: diagnosis });
	if (foundDiagnosis) {
		return foundDiagnosis;
	}
	return null;
};

// Check the uniqueness of the medicine
const checkMedicine = async (medicine) => {
	const foundMedicine = await Medicine.findOne({ name: medicine });
	if (foundMedicine) {
		return foundMedicine;
	}
	return null;
};

const createPatient = async (event, arg) => {
	const { diagnosis, medications, symptoms } = arg;

	// Unique Symptoms
	let newSymptoms = symptoms.filter((symptom) => {
		if (checkSymptom(symptom.toLowerCase())) {
			return false;
		}
		return true;
	});
	newSymptoms = newSymptoms.map((symptom) => {
		return { name: symptom.toLowerCase(), date: symptom.date };
	});

	// Unique Diagnoses
	let newDiagnosis = diagnosis.filter((diagnosis) => {
		if (checkDiagnosis(diagnosis.name.toLowerCase())) {
			return false;
		}
		return true;
	});
	newDiagnosis = newDiagnosis.map((diagnosis) => {
		return { name: diagnosis.name.toLowerCase(), date: diagnosis.date };
	});

	// Format Medications
	const newMedications = medications.map(async (medication) => {
		let medicine = checkMedicine(medication.name.toLowerCase());
		if (!medicine) {
			medicine = await Medicine.create({
				name: medication.name.toLowerCase(),
				dosage: medication.dosage,
				frequency: medication.frequency,
			});
		}
		return {
			medicine: medicine,
			dosage: medication.dosage,
			frequency: medication.frequency,
		};
	});

	const diagnoses = await Diagnosis.insertMany(newDiagnosis);
	const addMedications = await Medication.insertMany(newMedications);
	const addSymptoms = await Symptom.insertMany(newSymptoms);
	const patient = await Patient.create({
		...arg,
		diagnosis: diagnoses,
		medications: addMedications,
		symptoms: addSymptoms,
	});

	return event.reply("patient-created", JSON.stringify(patient));
};

module.exports = { getPatients, createPatient, getPatient };
