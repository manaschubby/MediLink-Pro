import React from "react";
import SideBar from "../components/sideBar";
import { Box, Typography } from "@mui/material";
import usePatient from "../hooks/usePatient";
import dayjs from "dayjs";
import { useParams } from "react-router-dom";

const Patient = () => {
	const { id } = useParams();
	const { patient, patientLoaded } = usePatient(id);
	return (
		<div>
			<SideBar type="dashboard" />
			{patientLoaded && (
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
				>
					<Typography variant="h3">{patient.firstName}</Typography>
					<Box sx={{ display: "flex", gap: "1rem", mt: "1rem" }}>
						<Box
							sx={{
								width: "100%",
								height: "100%",
								backgroundColor: "white",
								borderRadius: "0.5rem",
								p: "1rem",
							}}
						>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Typography variant="h5">Patient Name</Typography>
								<Typography variant="h5">
									{patient.firstName} {patient.lastName}
								</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Typography variant="h5">Gender</Typography>
								<Typography variant="h5">{patient.gender}</Typography>
							</Box>
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Typography variant="h5">Date of Birth</Typography>
								<Typography variant="h5">
									{dayjs(patient.dateOfBirth).format("DD/MM/YYYY")}
								</Typography>
							</Box>
						</Box>
					</Box>
				</Box>
			)}
		</div>
	);
};

export default Patient;
