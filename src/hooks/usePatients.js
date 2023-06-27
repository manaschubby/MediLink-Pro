import { useEffect, useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;
export default function usePatients() {
	const [patients, setPatients] = useState([]);
	const [patientsLoaded, setPatientsLoaded] = useState(false);
	useEffect(() => {
		ipcRenderer.send("get-patients");
		ipcRenderer.on("patients", (event, patients) => {
			setPatients(patients);
			setPatientsLoaded(true);
		});
	}, []);
	return {
		patients,
		patientsLoaded,
	};
}
