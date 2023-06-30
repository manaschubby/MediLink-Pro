import { useEffect, useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;
export default function usePatients() {
	const [patients, setPatients] = useState([]);
	const [patientsLoaded, setPatientsLoaded] = useState(false);
	const reloadPatients = () => {
		ipcRenderer.send("get-patients");
	};
	useEffect(() => {
		ipcRenderer.send("get-patients");
		ipcRenderer.on("patients", (event, patients) => {
			patients = JSON.parse(patients);
			console.log(patients);
			setPatients(patients);
			setPatientsLoaded(true);
		});
		ipcRenderer.on("patient-created", (event, patient) => {
			reloadPatients();
		});

		return () => {
			ipcRenderer.removeAllListeners("patients");
			ipcRenderer.removeAllListeners("patient-created");
		};
	}, []);
	return {
		patients,
		patientsLoaded,
		reloadPatients,
	};
}
