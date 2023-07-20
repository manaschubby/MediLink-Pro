import React from "react";
import SideBar from "../components/sideBar";
import { Box, Button, Dialog, Typography } from "@mui/material";
import Calendar from "../components/calendar";
import { useNavigate } from "react-router-dom";

const electron = window.require("electron");
const { ipcRenderer } = electron;

const Appointments = () => {
	const handleAddAppointment = () => {
		ipcRenderer.send("add-appointment");
	};
	const navigate = useNavigate();
	const [viewAppointmentDialog, setViewAppointmentDialog] =
		React.useState(false);
	const [appointmentSelected, setAppointmentSelected] = React.useState(null);
	return (
		<div>
			<SideBar
				type="appointments"
				handleAddAppointment={handleAddAppointment}
			/>
			<Typography variant="h3">Appointments</Typography>
			<Dialog
				open={viewAppointmentDialog}
				onClose={() => setViewAppointmentDialog(false)}
			>
				{appointmentSelected && (
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							justifyContent: "center",
							gap: "10px",
							padding: "20px",
						}}
					>
						<Typography variant="h4">
							<b>Appointment</b> {appointmentSelected.name}
						</Typography>
						<Typography variant="h5">
							<b>Date and Time</b> {appointmentSelected.date}
						</Typography>
						<Box
							sx={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "space-between",
								gap: "10px",
							}}
						>
							<Typography variant="h5">
								<b>Patient Name</b> {appointmentSelected.patient.firstName}{" "}
								{appointmentSelected.patient.lastName}
							</Typography>
							<Button
								variant="contained"
								onClick={() => {
									navigate(`/patient/${appointmentSelected.patient._id}`);
									setViewAppointmentDialog(false);
								}}
							>
								View Patient
							</Button>
						</Box>
						<Typography variant="h5">{appointmentSelected.info}</Typography>
						<Button
							variant="contained"
							onClick={() => setViewAppointmentDialog(false)}
						>
							Close
						</Button>
					</Box>
				)}
			</Dialog>

			<div
				style={{
					margin: "20px",
					marginLeft: "6%",
					padding: "2%",
					height: "auto",
				}}
			>
				<Calendar
					setViewAppointmentDialog={setViewAppointmentDialog}
					setAppointmentSelected={setAppointmentSelected}
				/>
			</div>
		</div>
	);
};

export default Appointments;
