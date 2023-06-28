import { useEffect, useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;
export default function usePatients(id = null) {
	const [patients, setPatients] = useState([]);
	const [patientsLoaded, setPatientsLoaded] = useState(false);
	const reloadPatients = () => {
		ipcRenderer.send("get-patients");
	};
	useEffect(() => {
		if (id) {
			ipcRenderer.send("get-patient", id);
			ipcRenderer.on("patient", (event, patient) => {
				setPatients([JSON.parse(patient)]);
				setPatientsLoaded(true);
			});
			return () => {
				ipcRenderer.removeAllListeners("patient");
			};
		}
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
