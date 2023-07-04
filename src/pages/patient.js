import React, { useRef } from "react";
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
import useAddFile from "../hooks/useAddFile";
import AddDiagnosis from "../components/patients/addDiagnosis";
import AddMedication from "../components/patients/addMedication";
import AddAppointment from "../components/patients/addAppointment";

const Patient = () => {
	const { id } = useParams();

	// Hooks
	const { showAddFile, file } = useAddFile();
	const {
		patient,
		patientLoaded,
		makePatientActive,
		makePatientInactive,
		addNewDiagnosis,
		addNewAppointment,
	} = usePatient(id);
	const isTabletOrMobile = useMediaQuery("(max-width: 1224px)");

	// State Variables
	const [addAppointmentOpen, setAddAppointmentOpen] = React.useState(false);
	const [addDiagnosisOpen, setAddDiagnosisOpen] = React.useState(false);
	const [addMedicationOpen, setAddMedicationOpen] = React.useState(false);
	const [medications, setMedications] = React.useState([]);

	//Refs
	const medicationNameRef = useRef();
	const medicationDosageRef = useRef();
	const medicationFrequencyRef = useRef();

	// Styles
	const rowTitleStyle = { color: "rgba(0,0,0, 0.6)" };

	const h5Style = {
		color: "blue",
		pt: "1rem",
		pb: "1rem",
	};

	return (
		<div
			style={{
				overflow: "hidden",
			}}
		>
			<SideBar type="patient" />

			<AddAppointment
				open={addAppointmentOpen}
				setOpen={setAddAppointmentOpen}
				addNewAppointment={addNewAppointment}
			/>
			<AddDiagnosis
				open={addDiagnosisOpen}
				setOpen={setAddDiagnosisOpen}
				addNewDiagnosis={addNewDiagnosis}
			/>
			<AddMedication open={addMedicationOpen} setOpen={setAddMedicationOpen} />

			{patientLoaded ? (
				<Box
					sx={{
						top: "72px",
						position: "absolute",
						alignItems: "center",
						alignContent: "center",
						left: "80px",
						width: "calc(100vw - 128px)",
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
									<Button
										onClick={() => {
											setAddDiagnosisOpen(true);
										}}
										sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}
									>
										Add Diagnosis
									</Button>
									<Button
										onClick={() => {
											setAddMedicationOpen(true);
										}}
										sx={{ fontSize: "1rem", backgroundColor: "#E1F5FE" }}
									>
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
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<Box
								sx={{
									width: "75%",
									backgroundColor: "white",
									borderRadius: "0.5rem",
									p: "1rem",
									mb: "0.5rem",
								}}
							>
								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography variant="body1" gutterBottom>
										The patient's current status is{" "}
										{patient.inReview ? "Active" : "Inactive"}
									</Typography>
									<Button
										onClick={
											patient.inReview ? makePatientInactive : makePatientActive
										}
										sx={{ fontSize: "0.75rem", backgroundColor: "#E1F5FE" }}
									>
										Make {patient.inReview ? "Inactive" : "Active"}
									</Button>
								</Box>
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
								<Typography variant="h5" sx={h5Style}>
									Visit History
								</Typography>
								{patient.visitHistory && patient.visitHistory.length > 0 ? (
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
													key={visit._id}
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
									<Typography variant="h5" sx={h5Style}>
										Patient Files
									</Typography>
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
								<Typography variant="h5" sx={h5Style}>
									Patient Details
								</Typography>
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
								<Typography variant="h5" sx={h5Style}>
									Contact Details
								</Typography>
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
								<Typography variant="h5" sx={h5Style}>
									Address
								</Typography>
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
										<Typography variant="h5" sx={h5Style}>
											Insurance Details
										</Typography>
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
									<Typography variant="h5" sx={h5Style}>
										No Insurance Details
									</Typography>
								)}
								<Typography variant="h5" sx={h5Style}>
									Emergency Contact
								</Typography>
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
								<Typography variant="h5" sx={h5Style}>
									Symptoms
								</Typography>
								{patient.symptoms.length > 0 ? (
									patient.symptoms.map((symptom) => {
										return (
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
												}}
												key={symptom._id}
											>
												<Typography
													textTransform={"capitalize"}
													variant="body1"
													gutterBottom
												>
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

								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
										alignItems: "center",
									}}
								>
									<Typography variant="h5" sx={h5Style}>
										Diagnosis
									</Typography>
									{patient.diagnosis.length > 0 && (
										<Typography variant="body1" gutterBottom>
											Diagnosis Date
										</Typography>
									)}
								</Box>
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
													key={diagnosis._id}
												>
													<Typography
														textTransform={"capitalize"}
														variant="body1"
														gutterBottom
													>
														{diagnosis.disease.name}
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
								<Typography variant="h5" sx={h5Style}>
									Medications
								</Typography>
								{patient.medications.length > 0 ? (
									patient.medications.map((medication) => {
										return (
											<Box
												sx={{
													display: "flex",
													justifyContent: "space-between",
												}}
												key={medication._id}
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
								<Typography variant="h5" sx={h5Style}>
									Allergies
								</Typography>
								{patient.allergies.length > 0 ? (
									patient.allergies.map((allergy) => {
										return (
											<Box
												sx={{
													display: "flex",
													justifyContent: "flex-start",
												}}
												key={allergy}
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
