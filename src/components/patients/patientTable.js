import {
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	TableBody,
	Paper,
} from "@mui/material";
import dayjs from "dayjs";
import React, { useEffect } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

const PatientTable = (props) => {
	const { patients, selectedFilter } = props;
	const calculateAge = (dateOfBirth) => {
		const today = new Date();
		const birthDate = new Date(dateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
		return age;
	};
	// useEffect(() => {
	// 	if (patients.length > 0) {
	// 		console.log(
	// 			patients[0].diagnosis.sort((diagnosis1, diagnosis2) => {
	// 				return new Date(diagnosis2.date) - new Date(diagnosis1.date);
	// 			})[0].name
	// 		);
	// 	}
	// }, [patients]);
	const renderDiagnosis = (patient) => {
		if (patient.diagnosis.length > 0) {
			const latestDiagnosis = patient.diagnosis.sort(
				(diagnosis1, diagnosis2) => {
					return new Date(diagnosis2.date) - new Date(diagnosis1.date);
				}
			)[0];
			return (
				latestDiagnosis.name +
				" - " +
				dayjs(latestDiagnosis.date).format("MM/DD/YYYY")
			);
		}
		return "";
	};

	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Age</TableCell>
							<TableCell align="right">Latest Diagnosis</TableCell>
							<TableCell align="right">Status</TableCell>
							<TableCell align="right">Last Visit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patients.map((patient) => (
							<TableRow
								key={patient._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								onClick={() => {
									ipcRenderer.send("edit-patient", patient._id);
								}}
							>
								<TableCell component="th" scope="row">
									{patient.firstName} {patient.lastName}
								</TableCell>
								<TableCell align="right">
									{calculateAge(patient.dateOfBirth)} years
								</TableCell>
								<TableCell align="right">
									{patient.diagnosis.length > 0 && renderDiagnosis(patient)}
								</TableCell>
								<TableCell align="right">
									{patient.inReview ? "Active" : "Not Active"}
								</TableCell>
								<TableCell align="right">{patient.lastVisit}</TableCell>
							</TableRow>
						))}
					</TableBody>
				</Table>
			</TableContainer>
		</div>
	);
};

export default PatientTable;
