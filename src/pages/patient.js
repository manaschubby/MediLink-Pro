import React from "react";
import SideBar from "../components/sideBar";
import {
	Box,
	Button,
	CircularProgress,
	Modal,
	Typography,
} from "@mui/material";
import usePatient from "../hooks/usePatient";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";
import "./patient.css";
const Patient = () => {
	const { id } = useParams();
	const { patient, patientLoaded } = usePatient(id);
	return (
		<div>
			<SideBar type="dashboard" />
			
			{patientLoaded ? (
				<Box
					sx={{	
						top: "72px",
						position: "absolute",
						alignItems:"center",
						alignContent:"center",
						left: "80px",
						width: "calc(100vw - 112px)",
						height: "fit-content",
						backgroundColor: "#f5f5f5",
						padding: "1rem"
					}}
				>
					<Box 
						sx={{
							width: "75%",
							marginRight:"9%",
							marginLeft:"16%",
							padding:"1rem"
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
							alignItems: "center",
							mt: "1rem",
							mb: "1rem",
							width: "73%",
						}}
					>
						<Box sx={{ display: "flex", gap: "1rem" }}>
							<Box sx={{ display: "flex", gap: "1rem" }}>
								<Button sx={{ fontSize: "1rem", backgroundColor:"#E1F5FE" }}>Add Appointment</Button>
								<Button sx={{ fontSize: "1rem", backgroundColor:"#E1F5FE" }}>Add Diagnosis</Button>
								<Button sx={{ fontSize: "1rem", backgroundColor:"#E1F5FE" }}>Add Medication</Button>
							</Box>
						</Box>
						<Box sx={{ display: "flex", gap: "1rem"}}>
							<Button sx={{ fontSize: "1rem", backgroundColor:"#E1F5FE" }}>Edit Patient</Button>
							<Button sx={{ fontSize: "1rem", backgroundColor:"#E1F5FE" }}>Delete Patient</Button>
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
								<Button sx={{ fontSize: "1rem", backgroundColor:"#E1F5FE" }}>Add File</Button>
							</Box>
							<Typography variant="body1" gutterBottom>
								No Files Uploaded
							</Typography>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
										<Typography variant="body1" gutterBottom>
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
										<Typography variant="body1" gutterBottom>
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
									<Typography variant="body1" gutterBottom>
										Phone Number
									</Typography>
									<Typography variant="body1" gutterBottom>
										{patient.emergencyContact.phoneNumber}
									</Typography>
								</Box>
							) : (
								<Typography variant="body1" gutterBottom>
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
											<Typography variant="body1" gutterBottom>
												{symptom.description}
											</Typography>
										</Box>
									);
								})
							) : (
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
								<Typography variant="body1" gutterBottom>
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
