import React from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Alert from "../alert";

const AddDiagnosis = (props) => {
	const { open, setOpen, addNewDiagnosis } = props;
	const diagnosisRef = React.useRef();
	const [dateOfDiagnosis, setDateOfDiagnosis] = React.useState(new Date());

	const [alertOpen, setAlertOpen] = React.useState(false);
	const [alertTitle, setAlertTitle] = React.useState("");
	const [alertMessage, setAlertMessage] = React.useState("");
	const [alertAccept, setAlertAccept] = React.useState(null);

	const alert = (title, message, accept) => {
		setAlertTitle(title);
		setAlertMessage(message);
		setAlertAccept(accept);
		setAlertOpen(true);
	};

	const handleAddDiagnosis = () => {
		// Validate
		if (diagnosisRef.current.value === "") {
			alert("Error", "Please enter a diagnosis name.", null);
			return;
		}
		const newDiagnosis = {
			name: diagnosisRef.current.value,
			date: new Date(dateOfDiagnosis),
		};
		addNewDiagnosis(newDiagnosis);
		diagnosisRef.current.value = "";
		setOpen(false);
	};

	return (
		<Dialog open={open}>
			<Alert
				open={alertOpen}
				setOpen={setAlertOpen}
				title={alertTitle}
				message={alertMessage}
				accept={alertAccept}
			/>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					padding: "1rem",
				}}
			>
				<Typography variant="h4">Add Diagnosis</Typography>
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
							ref={diagnosisRef}
							style={{
								fontSize: "1rem",
								padding: "0.5rem",
								width: "18rem",
								margin: "1rem",
							}}
						/>
					</Typography>
					<DatePicker
						label={"Date of Diagnosis"}
						value={dayjs(dateOfDiagnosis)}
						sx={{
							width: "25rem",
							mt: "1rem",
							mr: "1rem",
						}}
						maxDate={dayjs(new Date())}
						onChange={(newValue) => {
							setDateOfDiagnosis(newValue);
						}}
					/>
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
						onClick={handleAddDiagnosis}
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

export default AddDiagnosis;
