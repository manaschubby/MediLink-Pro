import usePatients from "../hooks/usePatients";

const Patients = () => {
	const { patients, patientsLoaded } = usePatients();
	return (
		<div>
			<h1>Patients</h1>
		</div>
	);
};

export default Patients;
