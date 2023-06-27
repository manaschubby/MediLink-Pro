import { Box } from "@mui/material";
import SideBar from "../components/sideBar";
import usePatients from "../hooks/usePatients";
import { useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

const Patients = () => {
	const { patients, patientsLoaded } = usePatients();
	const [selectedFilter, setSelectedFilter] = useState("All");
	const handleAddPatient = () => {};
	return (
		<div>
			<SideBar
				type="patients"
				selectedFilter={selectedFilter}
				setSelectedFilter={setSelectedFilter}
				handleAddPatient={handleAddPatient}
			/>
			{/* <h1>Dashboard</h1> */}
			<Box
				sx={{
					top: "72px",
					position: "absolute",
					left: "80px",
					width: "calc(100vw - 112px)",
					height: "100%",
					backgroundColor: "#f5f5f5",
					padding: "1rem",
				}}
			></Box>
		</div>
	);
};

export default Patients;
