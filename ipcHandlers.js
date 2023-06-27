const { Patient } = require("./database/schemas");

const getPatients = async (event, arg) => {
	const patients = await Patient.find({})
		.sort({ name: 1, dateAdded: -1 })
		.populate({ path: "appointments", populate: { path: "patient" } });
	return event.reply("patients", patients);
};

module.exports = { getPatients };
