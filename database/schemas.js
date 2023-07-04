// Import Mongoose
const mongoose = require("mongoose");

// Create a schema for Symptoms
const symptomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},

	// Add more fields related to symptoms as needed
});

// Disease Schema
const diseaseSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

// Create a schema for Diagnosis
const diagnosisSchema = new mongoose.Schema({
	disease: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Disease",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	// Add more fields related to diagnosis as needed
});

// Medicine Schema
const medicineSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true,
	},
});

//Create a Schema for Medications
const medicationSchema = new mongoose.Schema({
	medicine: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Medicine",
		required: true,
	},
	dosage: {
		type: String,
		required: true,
	},
	frequency: {
		type: String,
		required: true,
	},
});

// Create a schema for Patients
const patientSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
	},
	lastName: {
		type: String,
		required: true,
	},
	dateOfBirth: {
		type: Date,
		required: true,
	},
	gender: {
		type: String,
		enum: ["Male", "Female", "Other"],
		required: true,
	},
	address: {
		street: String,
		city: String,
		state: String,
		postalCode: String,
	},
	contact: {
		phone: String,
		email: String,
	},
	symptoms: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Symptom",
		},
	],
	diagnosis: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Diagnosis",
		},
	],
	allergies: {
		type: [String],
	},
	medications: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Medication",
		},
	],
	insurance: {
		provider: String,
		policyNumber: String,
	},
	emergencyContact: {
		name: String,
		phone: String,
		relationship: String,
	},
	bloodGroup: {
		type: String,
		enum: ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"],
	},
	inReview: {
		type: Boolean,
		default: false,
	},
	appointments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Appointment",
		},
	],
	dateAdded: {
		type: Date,
		default: Date.now,
	},
	visitHistory: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: "Report",
		},
	],
	// Add more fields related to patients as needed
});

// Add static methods to patientSchema
patientSchema.statics.findPatientByDisease = async function (diseaseName) {
	const patients = await this.find({
		diagnosis: {
			$elemMatch: { disease: { $regex: diseaseName, $options: "i" } },
		},
	}).exec();
	return patients;
};

patientSchema.statics.findPatientByMedicine = async function (medicineName) {
	const patients = await this.find({
		medications: {
			$elemMatch: { medicine: { $regex: medicineName, $options: "i" } },
		},
	}).exec();
	return patients;
};

patientSchema.statics.findPatientBySymptom = async function (symptom) {
	const patients = await this.find({
		symptoms: { $elemMatch: { name: { $regex: symptom, $options: "i" } } },
	}).exec();
	return patients;
};
patientSchema.statics.findPatientByAllergen = async function (allergen) {
	const patients = await this.find({
		allergies: { $elemMatch: { name: { $regex: allergen, $options: "i" } } },
	}).exec();
	return patients;
};

patientSchema.pre("find", function () {
	this.populate("symptoms");
	this.populate({
		path: "diagnosis",
		model: "Diagnosis",
		populate: { path: "disease", model: "Disease" },
	});
	this.populate({
		path: "medications",
		populate: { path: "medicine", model: "Medicine" },
	});
	this.populate({ path: "appointments", populate: { path: "patient" } });
	this.populate({ path: "visitHistory", populate: { path: "patient" } });
});

// Create a schema for Appointments
const appointmentSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	date: {
		type: Date,
		required: true,
	},
	info: {
		type: "String",
		required: false
	}
	// Add more fields related to appointments as needed
});

// Create a schema for Reports
const reportSchema = new mongoose.Schema({
	patient: {
		type: mongoose.Schema.Types.ObjectId,
		ref: "Patient",
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	content: {
		type: String,
		required: true,
	},
	// Add more fields related to reports as needed
});

// Create models from the schemas
const Symptom = mongoose.model("Symptom", symptomSchema);
const Diagnosis = mongoose.model("Diagnosis", diagnosisSchema);
const Disease = mongoose.model("Disease", diseaseSchema);
const Patient = mongoose.model("Patient", patientSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Report = mongoose.model("Report", reportSchema);
const Medication = mongoose.model("Medication", medicationSchema);
const Medicine = mongoose.model("Medicine", medicineSchema);

// Export the models
module.exports = {
	Symptom,
	Diagnosis,
	Disease,
	Patient,
	Appointment,
	Report,
	Medication,
	Medicine,
};
