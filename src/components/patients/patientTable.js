import {
	TableCell,
	TableContainer,
	TableHead,
	TableRow,
	Table,
	TableBody,
	Paper,
} from "@mui/material";
import React from "react";

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
	return (
		<div>
			<TableContainer component={Paper}>
				<Table sx={{ minWidth: 650 }} aria-label="simple table">
					<TableHead>
						<TableRow>
							<TableCell>Name</TableCell>
							<TableCell align="right">Age</TableCell>
							<TableCell align="right">Diagnosis</TableCell>
							<TableCell align="right">Status</TableCell>
							<TableCell align="right">Last Visit</TableCell>
						</TableRow>
					</TableHead>
					<TableBody>
						{patients.map((patient) => (
							<TableRow
								key={patient._id}
								sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
								onClick={() => {}}
							>
								<TableCell component="th" scope="row">
									{patient.firstName} {patient.lastName}
								</TableCell>
								<TableCell align="right">
									{calculateAge(patient.dateOfBirth)} years
								</TableCell>
								<TableCell align="right">{patient.diagnosis}</TableCell>
								<TableCell align="right">{patient.status}</TableCell>
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
