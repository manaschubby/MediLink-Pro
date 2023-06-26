const { Patient } = require("./database/schemas");

const getPatients = async (event, arg) => {
	const patients = await Patient.find({});
	return event.reply("patients", patients);
};

module.exports = { getPatients };
