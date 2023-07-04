import { Folder } from "@mui/icons-material";
import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import React from "react";
import useAddFile from "../hooks/useAddFile";

const PatientFile = () => {
	const {
		setFileLocation,
		fileLocation,
		fileLocationSelect,
		fileLocationSubmit,
		fileLocationError,
		setFileLocationError,
	} = useAddFile();
	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				backgroundColor: "#42a5f5",
				gap: "1rem",
			}}
		>
			<Dialog
				open={fileLocationError}
				onClose={() => {
					setFileLocationError(false);
				}}
			>
				<Typography variant="h6" component="div" sx={{ color: "white" }}>
					Error Saving to this Location
				</Typography>
			</Dialog>
			<img
				src="/favicon.ico"
				alt="MediLink Pro Logo"
				style={{
					width: "100px",
				}}
			/>
			<Typography variant="h6" component="div" sx={{ color: "white" }}>
				Please Select location to store patient files
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					justifyContent: "center",
					alignItems: "center",
					gap: "1rem",
				}}
			>
				<TextField
					value={fileLocation}
					onChange={(e) => {
						setFileLocation(e.target.value);
					}}
					id="outlined-basic"
					label="Location"
					variant="outlined"
				/>
				<Button variant="contained" onClick={fileLocationSelect}>
					<Folder />
				</Button>
			</Box>
			<Button variant="contained" onClick={fileLocationSubmit}>
				Select
			</Button>
		</Box>
	);
};

export default PatientFile;
