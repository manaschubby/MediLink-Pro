const {
	Patient,
	Diagnosis,
	Disease,
	Symptom,
	Medication,
	Medicine,
} = require("./database/schemas");
const fs = require("fs");
const Store = require("./store.js");
const store = new Store({
	// We'll call our data file 'user-preferences'
	configName: "user-preferences",
	defaults: {
		patientFilePath: "unset",
	},
});

/*
 * Get all patients
 * @param {Object} event - The event object
 * @param {Object} ipcMain - The ipcMain object
 * @returns {Object} - The patients object
 * @returns {Array} - The patients array
 * @returns {Array} - The patients diagnosis array
 * @returns {Array} - The patients medications array
 * @returns {Array} - The patients symptoms array
 */

const getPatients = async (event, ipcMain) => {
	const patients = await Patient.find({})
		.sort({ name: 1, dateAdded: -1 })
		.populate("symptoms")
		.populate({
			path: "diagnosis",
			model: "Diagnosis",
			populate: { path: "disease", model: "Disease" },
		})
		.populate({
			path: "medications",
			populate: { path: "medicine", model: "Medicine" },
		})
		.populate({ path: "appointments", populate: { path: "patient" } })
		.populate({ path: "visitHistory", populate: { path: "patient" } });
	console.log(patients);
	return event.reply("patients", JSON.stringify(patients));
};

const getPatient = async (event, arg) => {
	let patient = await Patient.findById(arg)
		.populate("symptoms")
		.populate({
			path: "diagnosis",
			model: "Diagnosis",
			populate: { path: "disease", model: "Disease" },
		})
		.populate({
			path: "medications",
			populate: { path: "medicine", model: "Medicine" },
		})
		.populate({
			path: "appointments",
			populate: { path: "patient" },
		})
		.populate({
			path: "visitHistory",
			populate: { path: "patient" },
		});
	if (
		fs.existsSync(store.get("patientFilePath") + "/" + patient._id) === false
	) {
		return event.reply("patient", JSON.stringify(patient));
	}
	const sendPatient = {
		...patient._doc,
		files: fs.readdirSync(store.get("patientFilePath") + "/" + patient._id),
	};
	return event.reply("patient", JSON.stringify(sendPatient));
};

/*
 * Create a new patient
 * @param {Object} event - The event object
 * @param {Object} arg - The patient object
 * @param {Array} arg.diagnosis - The diagnosis array
 * @param {Array} arg.medications - The medications array
 * @param {Array} arg.symptoms - The symptoms array

 * @param {Object} diagnosis - The diagnosis object
 * @param {String} diagnosis.name - The name of the disease
 * @param {Date} diagnosis.date - The date of diagnosis
 * @param {Object} medication - The medication object
 * @param {String} medication.name - The name of the medicine
 * @param {String} medication.dosage - The dosage of the medicine
 * @param {String} medication.frequency - The frequency of the medicine
 * @param {String} symptom - The name of the symptom
*/

// Check the uniqueness of the syymptom and return the symptom if it exists
const checkSymptom = async (symptom) => {
	const foundSymptom = await Symptom.findOne({ name: symptom });
	if (foundSymptom) {
		return foundSymptom;
	}
	return null;
};
// Check the uniqueness of the diagnosis and return the diagnosis if it exists
const checkDisease = async (disease) => {
	const foundDisease = await Disease.findOne({ name: disease });
	if (foundDisease) {
		return foundDisease;
	}
	return null;
};
// Check the uniqueness of the medicine and return the medicine if it exists
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
	const newSymptoms = await Promise.all(
		symptoms.map(async (symptom) => {
			let newSymptom = await checkSymptom(symptom.toLowerCase());
			if (!newSymptom) {
				newSymptom = await Symptom.create({
					name: symptom.toLowerCase(),
				});
			}
			return newSymptom;
		})
	);

	// Format Diagnosis
	const newDiagnosis = await Promise.all(
		diagnosis.map(async (disease) => {
			let newDisease = await checkDisease(disease.name.toLowerCase());
			try {
				if (!newDisease) {
					newDisease = await Disease.create({
						name: disease.name.toLowerCase(),
					});
				}
			} catch (err) {
				console.log(err);
				throw err;
			}
			return { disease: newDisease._id, date: disease.date };
		})
	);

	// Format Medications
	const newMedications = await Promise.all(
		medications.map(async (medication) => {
			let medicine = await checkMedicine(medication.name.toLowerCase());
			if (!medicine) {
				medicine = await Medicine.create({
					name: medication.name.toLowerCase(),
				});
			}
			return {
				medicine: medicine._id,
				dosage: medication.dosage,
				frequency: medication.frequency,
			};
		})
	);

	const diagnoses = await Diagnosis.insertMany(newDiagnosis);
	const addMedications = await Medication.insertMany(newMedications);
	const patient = await Patient.create({
		...arg,
		diagnosis: diagnoses,
		medications: addMedications,
		symptoms: newSymptoms,
	});

	return event.reply("patient-created", JSON.stringify(patient));
};

const makePatientActive = async (event, arg) => {
	const patient = await Patient.findByIdAndUpdate(
		arg,
		{ inReview: true },
		{
			new: true,
		}
	);
	console.log(patient);
	return event.reply("patient-active", JSON.stringify(patient));
};

const makePatientInactive = async (event, arg) => {
	const patient = await Patient.findByIdAndUpdate(
		arg,
		{ inReview: false },
		{
			new: true,
		}
	);
	return event.reply("patient-inactive", JSON.stringify(patient));
};

const addNewDiagnosisToPatient = async (event, arg) => {
	const { patientId, diagnosis } = arg;
	checkDisease(diagnosis.name.toLowerCase())
		.then((disease) => {
			if (!disease) {
				Disease.create({ name: diagnosis.name.toLowerCase() })
					.then((newDisease) => {
						Diagnosis.create({
							disease: newDisease._id,
							date: diagnosis.date,
						})
							.then((newDiagnosis) => {
								Patient.findByIdAndUpdate(
									patientId,
									{
										$push: {
											diagnosis: newDiagnosis._id,
										},
									},
									{ new: true }
								)
									.populate({
										path: "diagnosis",
										model: "Diagnosis",
										populate: {
											path: "disease",
											model: "Disease",
										},
									})
									.then((patient) => {
										return event.reply(
											"patient-diagnosis-added",
											JSON.stringify(patient)
										);
									})
									.catch((err) => {
										console.log(err);
										throw err;
									});
							})
							.catch((err) => {
								console.log(err);
								throw err;
							});
					})
					.catch((err) => {
						console.log(err);
						throw err;
					});
			} else {
				Diagnosis.create({
					disease: disease._id,
					date: diagnosis.date,
				})
					.then((newDiagnosis) => {
						Patient.findByIdAndUpdate(
							patientId,
							{
								$push: {
									diagnosis: newDiagnosis._id,
								},
							},
							{ new: true }
						)
							.populate({
								path: "diagnosis",
								model: "Diagnosis",
								populate: { path: "disease", model: "Disease" },
							})
							.then((patient) => {
								return event.reply(
									"patient-diagnosis-added",
									JSON.stringify(patient)
								);
							})
							.catch((err) => {
								console.log(err);
								throw err;
							});
					})
					.catch((err) => {
						console.log(err);
						throw err;
					});
			}
		})
		.catch((err) => {
			console.log(err);
			throw err;
		});
};

// Add File Handler
const addFile = async (e, arg, result) => {
	try {
		if (
			fs.existsSync(store.get("patientFilePath") + "/" + arg.toString()) ===
			false
		) {
			fs.mkdirSync(store.get("patientFilePath") + "/" + arg.toString());
		}
		// Check if file already exists
		if (
			fs.existsSync(
				store.get("patientFilePath") +
					"/" +
					arg.toString() +
					"/" +
					result.filePaths[0].split("\\").pop().split("/").pop()
			) === true
		) {
			// change file name
			const file_name = result.filePaths[0].split("\\").pop().split("/").pop();
			const file_extension = file_name.split(".").pop();
			const file_name_without_extension = file_name
				.split(".")
				.slice(0, -1)
				.join(".");
			const new_file_name =
				file_name_without_extension + " (1)." + file_extension;

			// and copy
			fs.copyFileSync(
				result.filePaths[0],
				store.get("patientFilePath") +
					"/" +
					arg.toString() +
					"/" +
					new_file_name,
				fs.constants.COPYFILE_FICLONE
			);
			e.reply(
				"file-path",
				store.get("patientFilePath") +
					"/" +
					arg.toString() +
					"/" +
					new_file_name
			);
			return;
		}
		fs.copyFileSync(
			result.filePaths[0],
			store.get("patientFilePath") +
				"/" +
				arg.toString() +
				"/" +
				result.filePaths[0].split("\\").pop().split("/").pop(),
			fs.constants.COPYFILE_FICLONE
		);
		e.reply("file-path", result.filePaths[0]);
	} catch (err) {
		console.log(err);
	}
};

module.exports = {
	getPatients,
	createPatient,
	getPatient,
	makePatientActive,
	makePatientInactive,
	addNewDiagnosisToPatient,
	addFile,
};
