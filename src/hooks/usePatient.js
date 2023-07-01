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

	const makePatientActive = () => {
		ipcRenderer.send("make-patient-active", patient._id);
		ipcRenderer.on("patient-active", (event, patient) => {
			setPatient(JSON.parse(patient));
		});
	};
	const makePatientInactive = () => {
		ipcRenderer.send("make-patient-inactive", patient._id);
		ipcRenderer.on("patient-inactive", (event, patient) => {
			setPatient(JSON.parse(patient));
		});
	};

	return {
		patient,
		patientLoaded,
		makePatientActive,
		makePatientInactive,
	};
}
