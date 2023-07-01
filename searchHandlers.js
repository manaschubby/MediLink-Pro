const {
	Patient,
	Diagnosis,
	Disease,
	Symptom,
	Medication,
	Medicine,
} = require("./database/schemas");

const searchPatients = async (event, arg) => {
	const {
		symptoms,
		diagnosis,
		medications,
		name,
		dateOfBirth,
		bloodGroup,
		allergen,
		phone,
		email,
	} = JSON.parse(arg);
	let sendPatients = [];
	if (symptoms.length !== 0) {
		symptoms.forEach(async (symptom) => {
			const patients = await Patient.findPatientBySymptom(symptom);
			sendPatients = sendPatients.concat(patients);
		});
	}
	if (diagnosis.length !== 0) {
		diagnosis.forEach(async (disease) => {
			const patients = await Patient.findPatientByDisease(disease);
			sendPatients = sendPatients.concat(patients);
		});
	}
	if (medications.length !== 0) {
		medications.forEach(async (medicine) => {
			const patients = await Patient.findPatientByMedicine(medicine);
			sendPatients = sendPatients.concat(patients);
		});
	}

	// Remove duplicates
	sendPatients = [...new Set(sendPatients)];

	return sendPatients;
};
