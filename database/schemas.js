// Import Mongoose
const mongoose = require("mongoose");

// Create a schema for Symptoms
const symptomSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	// Add more fields related to symptoms as needed
});

// Create a schema for Diagnosis
const diagnosisSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
	},
	date: {
		type: Date,
		default: Date.now,
	},
	// Add more fields related to diagnosis as needed
});

//Create a Schema for Medications
const medicationSchema = new mongoose.Schema({
	name: {
		type: String,
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
	symptoms: [symptomSchema],
	diagnosis: [diagnosisSchema],
	allergies: {
		type: [String],
	},
	medications: [medicationSchema],
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
	// Add more fields related to patients as needed
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
const Patient = mongoose.model("Patient", patientSchema);
const Appointment = mongoose.model("Appointment", appointmentSchema);
const Report = mongoose.model("Report", reportSchema);
const Medication = mongoose.model("Medication", medicationSchema);

// Export the models
module.exports = {
	Symptom,
	Diagnosis,
	Patient,
	Appointment,
	Report,
	Medication,
};
