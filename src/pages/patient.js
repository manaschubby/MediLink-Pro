import React from "react";
import SideBar from "../components/sideBar";
import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	Modal,
	Typography,
	useMediaQuery,
} from "@mui/material";
import usePatient from "../hooks/usePatient";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import "./patient.css";
import useAddFile from "../hooks/useAddFile";
const Patient = () => {
	const { id } = useParams();

	// Hooks
	const { showAddFile, file } = useAddFile();
	const { patient, patientLoaded } = usePatient(id);
	const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

	// State Variables
	const [addAppointmentOpen, setAddAppointmentOpen] = React.useState(false);

	// Styles
	const rowTitleStyle = { color: "rgba(0,0,0, 0.6)" };

	return (
		<div
			style={{
				overflow: "hidden",
			}}
		>
			<SideBar type="patient" />
			<Dialog open={addAppointmentOpen}>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						padding: "1rem",
					}}
				>
					<Typography variant="h4">Add Appointment</Typography>
					<Box
						sx={{
							display: "flex",
							flexDirection: "column",
							gap: "1rem",
						}}
					>
						<Typography variant="h6">Date</Typography>
						<Typography variant="h6">Time</Typography>
						<Typography variant="h6">Notes</Typography>
					</Box>
					<Box
						sx={{
							display: "flex",
							justifyContent: "flex-end",
							gap: "1rem",
						}}
					>
						<Button
							onClick={() => {
								setAddAppointmentOpen(false);
							}}
							variant="contained"
							color="error"
						>
							Cancel
						</Button>
						<Button variant="contained" color="success">
							Add
						</Button>
					</Box>
				</Box>
			</Dialog>

			{patientLoaded ? (
				<Box
					sx={{
						top: "72px",
						position: "absolute",
						alignItems: "center",
						alignContent: "center",
						left: "80px",
						width: "calc(100vw - 112px)",
						height: "fit-content",
						backgroundColor: "#f5f5f5",
						padding: "1rem",
					}}
				>
					<Box
						sx={{
							width: "75%",
							marginRight: "9%",
							marginLeft: "16%",
							padding: "1rem",
						}}
					>
						<Typography variant="h3">{patient.firstName}</Typography>
						{/*
                    Actions
                    */}
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								flexDirection: isTabletOrMobile ? "column" : "row",
								alignItems: "center",
								mt: "1rem",
								mb: "1rem",
								width: "73%",
								gap: "1rem",
							}}
						>
							<Box sx={{ display: "flex", gap: "1rem" }}>
								<Box
									sx={{
										display: "flex",
										gap: "1rem",
										flexFlow: "wrap",
										overflow: "wrap",
										flexWrap: "nowrap",
									}}
								>
									<Button
										onClick={() => {
											setAddAppointmentOpen(true);
										}}
										sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}
									>
										Add Appointment
									</Button>
									<Button sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}>
										Add Diagnosis
									</Button>
									<Button sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}>
										Add Medication
									</Button>
								</Box>
							</Box>
							<Box sx={{ display: "flex", gap: "1rem" }}>
								<Button
									color="warning"
									sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}
								>
									Edit Patient
								</Button>
								<Button
									color="error"
									sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}
								>
									Delete Patient
								</Button>
							</Box>
						</Box>
						{/*
                        Visit History
                        */}
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<Box
								sx={{
									width: "75%",
									height: "100%",
									backgroundColor: "white",
									borderRadius: "0.5rem",
									p: "1rem",
								}}
							>
								<Typography variant="h5">Visit History</Typography>
								{patient.visitHistory.length > 0 ? (
									patient.visitHistory
										.sort((visit1, visit2) => {
											return new Date(visit2.date) - new Date(visit1.date);
										})
										.map((visit) => {
											return (
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<Typography variant="body1" gutterBottom>
														{dayjs(visit.date).format("DD/MM/YYYY")}
													</Typography>
													<Typography variant="body1" gutterBottom>
														{visit.content}
													</Typography>
												</Box>
											);
										})
								) : (
									<Typography variant="body1" gutterBottom>
										No Visits Logged
									</Typography>
								)}
							</Box>
						</Box>

						{/*
                        Patient Files
                        */}
						<Box sx={{ display: "flex", gap: "1rem", mt: "1rem" }}>
							<Box
								sx={{
									width: "75%",
									height: "100%",
									backgroundColor: "white",
									borderRadius: "0.5rem",
									p: "1rem",
								}}
							>
								<Box sx={{ display: "flex", justifyContent: "space-between" }}>
									<Typography variant="h5">Patient Files</Typography>
									<Button
										onClick={showAddFile}
										sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}
									>
										Add File
									</Button>
								</Box>
								{file ? (
									<Box
										sx={{ display: "flex", justifyContent: "space-between" }}
									>
										<Typography variant="body1" gutterBottom>
											{file}
										</Typography>
									</Box>
								) : (
									<Typography variant="body1" gutterBottom>
										No Files Uploaded
									</Typography>
								)}
							</Box>
						</Box>
						{/*
                    Patient Details
                    */}
						<Box sx={{ display: "flex", gap: "1rem", mt: "1rem" }}>
							<Box
								sx={{
									width: "75%",
									height: "100%",
									backgroundColor: "white",
									borderRadius: "0.5rem",
									p: "1rem",
								}}
							>
								<Typography variant="h5">Patient Details</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Patient Name
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.firstName} {patient.lastName}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Gender
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.gender}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Date of Birth / Age
									</Typography>
									<Typography variant="body1" gutterBottom>
										{dayjs(patient.dateOfBirth).format("DD/MM/YYYY")} /{" "}
										{dayjs().diff(patient.dateOfBirth, "year")} years
									</Typography>
								</Box>
								<Typography variant="h5">Contact Details</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Phone Number
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.phoneNumber}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Email
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.email}
									</Typography>
								</Box>
								<Typography variant="h5">Address</Typography>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Street Address
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.streetAddress}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										City
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.city}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										State
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.state}
									</Typography>
								</Box>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										Zip Code
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.zipCode}
									</Typography>
								</Box>
								{patient.insurance ? (
									<>
										<Typography variant="h5">Insurance Details</Typography>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Typography
												variant="body1"
												sx={rowTitleStyle}
												gutterBottom
											>
												Insurance Provider
											</Typography>
											<Typography variant="body1" gutterBottom>
												{patient.insurance.provider}
											</Typography>
										</Box>
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
											}}
										>
											<Typography
												variant="body1"
												sx={rowTitleStyle}
												gutterBottom
											>
												Policy Number
											</Typography>
											<Typography variant="body1" gutterBottom>
												{patient.insurance.policyNumber}
											</Typography>
										</Box>
									</>
								) : (
									<Typography variant="h5">No Insurance Details</Typography>
								)}
								<Typography variant="h5">Emergency Contact</Typography>
								{patient.emergencyContact && (
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography variant="body1" gutterBottom>
											Name
										</Typography>
										<Typography variant="body1" gutterBottom>
											{patient.emergencyContact.name}
										</Typography>
									</Box>
								)}
								{patient.emergencyContact ? (
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
										}}
									>
										<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
											Phone Number
										</Typography>
										<Typography variant="body1" gutterBottom>
											{patient.emergencyContact.phoneNumber}
										</Typography>
									</Box>
								) : (
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										No Emergency Contact
									</Typography>
								)}
								<Typography variant="h5">Symptoms</Typography>
								{patient.symptoms.length > 0 ? (
									patient.symptoms.map((symptom) => {
										return (
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<Typography variant="body1" gutterBottom>
													{symptom.name}
												</Typography>
											</Box>
										);
									})
								) : (
									<Typography variant="body1" sx={rowTitleStyle} gutterBottom>
										No Symptoms Logged
									</Typography>
								)}
								<Typography variant="h5">Diagnosis</Typography>
								{patient.diagnosis.length > 0 ? (
									patient.diagnosis
										.sort((diagnosis1, diagnosis2) => {
											return (
												new Date(diagnosis2.date) - new Date(diagnosis1.date)
											);
										})
										.map((diagnosis) => {
											return (
												<Box
													sx={{
														display: "flex",
														justifyContent: "space-between",
													}}
												>
													<Typography variant="body1" gutterBottom>
														{diagnosis.name}
													</Typography>
													<Typography variant="body1" gutterBottom>
														{dayjs(diagnosis.date).format("DD/MM/YYYY")}
													</Typography>
												</Box>
											);
										})
								) : (
									<Typography sx={rowTitleStyle} variant="body1" gutterBottom>
										No Diagnosis Logged
									</Typography>
								)}
								<Typography variant="h5">Medications</Typography>
								{patient.medications.length > 0 ? (
									patient.medications.map((medication) => {
										return (
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
												}}
											>
												<Typography variant="body1" gutterBottom>
													{medication.name}
												</Typography>
												<Typography variant="body1" gutterBottom>
													{medication.dosage}
												</Typography>
												<Typography variant="body1" gutterBottom>
													{medication.frequency}
												</Typography>
											</Box>
										);
									})
								) : (
									<Typography sx={rowTitleStyle} variant="body1" gutterBottom>
										No Medications Logged
									</Typography>
								)}
								<Typography variant="h5">Allergies</Typography>
								{patient.allergies.length > 0 ? (
									patient.allergies.map((allergy) => {
										return (
											<Box
												sx={{
													display: "flex",
													justifyContent: "flex-start",
												}}
											>
												<Typography variant="body1" gutterBottom>
													{allergy}
												</Typography>
											</Box>
										);
									})
								) : (
									<Typography sx={rowTitleStyle} variant="body1" gutterBottom>
										No Allergies Logged
									</Typography>
								)}
							</Box>
						</Box>
					</Box>
				</Box>
			) : (
				<Modal open={true}>
					<CircularProgress />
				</Modal>
			)}
		</div>
	);
};

export default Patient;
