import React from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";

const AddMedication = (props) => {
	const { open, setOpen, addNewMedication } = props;
	const medicationNameRef = React.useRef();
	const medicationDosageRef = React.useRef();
	const medicationFrequencyRef = React.useRef();

	return (
		<Dialog open={open}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					padding: "1rem",
				}}
			>
				<Typography variant="h4">Add Medication</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
					}}
				>
					<Typography variant="h6">
						Name:
						<input
							type="text"
							ref={medicationNameRef}
							style={{
								fontSize: "1rem",
								padding: "0.5rem",
								width: "18rem",
								margin: "1rem",
							}}
						/>
					</Typography>
					<Typography variant="h6">
						Dosage:
						<input
							type="text"
							ref={medicationDosageRef}
							style={{
								fontSize: "1rem",
								padding: "0.5rem",
								width: "18rem",
								margin: "1rem",
							}}
						/>
					</Typography>
					<Typography variant="h6">
						Frequency:
						<input
							type="text"
							ref={medicationFrequencyRef}
							style={{
								fontSize: "1rem",
								padding: "0.5rem",
								width: "18rem",
								margin: "1rem",
							}}
						/>
					</Typography>
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
							//Changes left
							setOpen(false);
						}}
						variant="contained"
						color="error"
					>
						Cancel
					</Button>
					<Button
						onClick={() => {
							const newMedication = {
								name: medicationNameRef.current.value,
								dosage: medicationDosageRef.current.value,
								frequency: medicationFrequencyRef.current.value,
							};
							addNewMedication(newMedication);
							medicationNameRef.current.value = "";
							medicationDosageRef.current.value = "";
							medicationFrequencyRef.current.value = "";
						}}
						variant="contained"
						color="success"
					>
						Add
					</Button>
				</Box>
			</Box>
		</Dialog>
	);
};

export default AddMedication;
