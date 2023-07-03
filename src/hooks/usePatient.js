import { useEffect, useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function usePatient(id) {
	const [patient, setPatient] = useState();
	const [patientLoaded, setPatientLoaded] = useState(false);

	useEffect(() => {
		ipcRenderer.send("get-patient", id);
		ipcRenderer.on("patient", (event, patient) => {
			setPatient(JSON.parse(patient));
			console.log(patient);
			setPatientLoaded(true);
		});
		return () => {
			ipcRenderer.removeAllListeners("patient");
		};
	}, []);

	const patientWithActive = (active) => {
		return {
			...patient,
			inReview: active,
		};
	};

	const makePatientActive = () => {
		ipcRenderer.send("make-patient-active", patient._id);
		ipcRenderer.on("patient-active", (event, patient) => {
			setPatient(patientWithActive(true));
		});
	};
	const makePatientInactive = () => {
		ipcRenderer.send("make-patient-inactive", patient._id);
		ipcRenderer.on("patient-inactive", (event, patient) => {
			setPatient(patientWithActive(false));
		});
	};

	const addNewDiagnosis = (diagnosis) => {
		ipcRenderer.send("add-diagnosis", {
			patientId: patient._id,
			diagnosis,
		});
		ipcRenderer.on("patient-diagnosis-added", (event, patient) => {
			console.log(patient);
			setPatient({
				...patient,
				diagnosis: JSON.parse(patient).diagnosis,
			});
		});
	};

	return {
		patient,
		patientLoaded,
		makePatientActive,
		makePatientInactive,
		addNewDiagnosis,
	};
}
