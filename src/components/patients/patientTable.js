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
import { useNavigate } from "react-router-dom";
import "./patientTable.css"
const electron = window.require("electron");
const { ipcRenderer } = electron;

const PatientTable = (props) => {
	const { patients, selectedFilter } = props;
	const navigate = useNavigate();
	const calculateAge = (dateOfBirth) => {
		const today = new Date();
		const birthDate = new Date(dateOfBirth);
		let age = today.getFullYear() - birthDate.getFullYear();
		const m = today.getMonth() - birthDate.getMonth();
		if (m < 0 || (m === 0 && today.getDate() < birthDate.getDate())) age--;
		return age;
	};
	const renderDiagnosis = (patient) => {
		console.log(patient.diagnosis);
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
							<TableCell sx={{fontWeight:"bold",fontSize:"1rem"}}>Name</TableCell>
							<TableCell align="right" sx={{fontWeight:"bold",fontSize:"1rem"}}>Age</TableCell>
							<TableCell align="right" sx={{fontWeight:"bold",fontSize:"1rem"}}>Latest Diagnosis</TableCell>
							<TableCell align="right" sx={{fontWeight:"bold",fontSize:"1rem"}}>Status</TableCell>
							<TableCell align="right" sx={{fontWeight:"bold",fontSize:"1rem"}}>Last Visit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patients.map((patient) => (
							<TableRow
								class="trr"
								key={patient._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 },cursor: "pointer", }}
								onClick={() => {
									navigate(`/patient/${patient._id}`);
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
