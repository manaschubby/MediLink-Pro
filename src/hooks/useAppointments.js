import { useState, useEffect } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function useAppointments() {
	const [appointments, setAppointments] = useState([]);
	const [appointmentsLoaded, setAppointmentsLoaded] = useState(false);

	const reloadAppointments = () => {
		ipcRenderer.send("get-appointments");
	};

	useEffect(() => {
		ipcRenderer.send("get-appointments");
		ipcRenderer.on("appointments", (event, appointments) => {
			appointments = JSON.parse(appointments);
			console.log(appointments);
			setAppointments(appointments);
			setAppointmentsLoaded(true);
		});
		ipcRenderer.on("appointment-created", (event, appointment) => {
			reloadAppointments();
			console.log("Appointment created");
		});

		return () => {
			ipcRenderer.removeAllListeners("appointments");
			ipcRenderer.removeAllListeners("appointment-created");
		};
	}, []);

	return {
		appointments,
		appointmentsLoaded,
		reloadAppointments,
	};
}
