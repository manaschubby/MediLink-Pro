import React from "react";
import SideBar from "../components/sideBar";
import { Typography } from "@mui/material";
const electron = window.require("electron");
const { ipcRenderer } = electron;

const Appointments = () => {
	const handleAddAppointment = () => {
		ipcRenderer.send("add-appointment");
	};
	return (
		<div>
			<SideBar
				type="appointments"
				handleAddAppointment={handleAddAppointment}
			/>
			<Typography variant="h3">Appointments</Typography>
		</div>
	);
};

export default Appointments;
