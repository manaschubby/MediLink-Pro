import {
	Box,
	Button,
	InputLabel,
	Menu,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";

import React, { useRef } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;
const AddPatient = () => {
	// State Variables
	const [gender, setGender] = React.useState(false);
	const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
	const [symptoms, setSymptoms] = React.useState([]);
	const [diagnosis, setDiagnosis] = React.useState([]);
	const [medications, setMedications] = React.useState([]);
	const [allergies, setAllergies] = React.useState([]);

	// Refs
	const dateRef = useRef();
	const symptomRef = useRef();
	const diagnosisRef = useRef();
	const medicationNameRef = useRef();
	const medicationDosageRef = useRef();
	const medicationFrequencyRef = useRef();
	const allergyRef = useRef();

	return (
		<Box
			sx={{
				height: "100%",
				backgroundColor: "#f5f5f5",
				padding: "1rem",
				display: "flex",
				flexDirection: "column",
				scrollBehavior: "smooth",
				scrollbarWidth: "10px",
			}}
		>
			<Typography variant="h4">Add Patient</Typography>
			<Typography variant="h6">Personal Information</Typography>
			<Box
				sx={{
					display: "flex",
					gap: "1rem",
					my: "1rem",
				}}
			>
				<input
					type="text"
					style={{
						fontSize: "1rem",
						padding: "0.5rem",
					}}
					placeholder="First Name"
				/>
				<input
					type="text"
					style={{
						fontSize: "1rem",
						padding: "0.5rem",
					}}
					placeholder="Last Name"
				/>
			</Box>
			<Box
				sx={{
					display: "flex",
					gap: "1rem",
					my: "1rem",
				}}
			>
				<Button
					onClick={() => setGender(true)}
					variant={gender ? "contained" : "outlined"}
				>
					Male
				</Button>
				<Button
					onClick={() => setGender(false)}
					variant={gender ? "outlined" : "contained"}
				>
					Female
				</Button>
			</Box>
			<InputLabel id="demo-simple-select-label">Blood Type</InputLabel>
			<Select
				label="Blood Type"
				title="Blood Type"
				labelId="demo-simple-select-label"
				sx={{
					width: "20rem",
					mt: "1rem",
					color: "black",
				}}
				variant="outlined"
				defaultValue={"default"}
			>
				<MenuItem value={"default"}>Select Blood Group</MenuItem>
				<MenuItem value={"A+"}>A+</MenuItem>
				<MenuItem value={"A-"}>A-</MenuItem>
				<MenuItem value={"B+"}>B+</MenuItem>
				<MenuItem value={"B-"}>B-</MenuItem>
				<MenuItem value={"AB+"}>AB+</MenuItem>
				<MenuItem value={"AB-"}>AB-</MenuItem>
				<MenuItem value={"O+"}>O+</MenuItem>
				<MenuItem value={"O-"}>O-</MenuItem>
			</Select>

			<DatePicker
				label={"Date of Birth"}
				value={dayjs(dateOfBirth)}
				sx={{
					width: "20rem",
					mt: "1rem",
				}}
				onChange={(newValue) => {
					setDateOfBirth(newValue);
				}}
				inputRef={dateRef}
			/>
			<Typography mt={"1rem"} variant="h6">
				Contact Information
			</Typography>
			<Box
				sx={{
					display: "flex",
					gap: "1rem",
				}}
			>
				<TextField
					sx={{
						width: "20rem",
						mt: "1rem",
					}}
					label="Phone Number"
					variant="outlined"
				/>
				<TextField
					sx={{
						width: "20rem",
						mt: "1rem",
					}}
					label="Email"
					variant="outlined"
				/>
			</Box>
			<Typography mt={"1rem"} variant="h6">
				Address
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
					flexWrap: "nowrap",
					overflowX: "wrap",
					flexFlow: "row wrap",
					gap: "1rem",
				}}
			>
				<TextField
					sx={{
						width: "20rem",
						mt: "1rem",
					}}
					label="Street Address"
					variant="outlined"
				/>
				<TextField
					sx={{
						width: "20rem",
						mt: "1rem",
					}}
					label="City"
					variant="outlined"
				/>
				<TextField
					sx={{
						width: "20rem",
						mt: "1rem",
					}}
					label="State"
					variant="outlined"
				/>
				<TextField
					sx={{
						width: "20rem",
						mt: "1rem",
					}}
					label="Zip Code"
					variant="outlined"
				/>
			</Box>
			<Typography mt={"1rem"} variant="h6">
				Symptoms
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<TextField
					inputRef={symptomRef}
					sx={{
						width: "20rem",
						mt: "1rem",
						mr: "1rem",
					}}
					label="Name"
					variant="outlined"
				/>
				<Button
					sx={{
						mt: "1rem",
					}}
					onClick={() => {
						setSymptoms([...symptoms, symptomRef.current.value]);
						symptomRef.current.value = "";
					}}
					variant="outlined"
					color="success"
				>
					Add
				</Button>
			</Box>
			<Typography mt={"1rem"} variant="h6">
				{symptoms.length > 0 && "Symptoms"}
			</Typography>
			{symptoms.map((symptom, index) => {
				return (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography variant="body1">{symptom}</Typography>
						<Button
							onClick={() => {
								setSymptoms(symptoms.filter((symptom, i) => i != index));
							}}
							variant="text"
							color="error"
						>
							Delete
						</Button>
					</Box>
				);
			})}
			{/* Add more fields related to symptoms as needed */}

			<Typography mt={"1rem"} variant="h6">
				Diagnosis
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<TextField
					inputRef={diagnosisRef}
					sx={{
						width: "20rem",
						mt: "1rem",
						mr: "1rem",
					}}
					label="Name"
					variant="outlined"
				/>
				<Button
					sx={{
						mt: "1rem",
					}}
					onClick={() => {
						setDiagnosis([...diagnosis, diagnosisRef.current.value]);
						diagnosisRef.current.value = "";
					}}
					variant="outlined"
					color="success"
				>
					Add
				</Button>
			</Box>
			<Typography mt={"1rem"} variant="h6">
				{diagnosis.length > 0 && "Diagnosis"}
			</Typography>
			{diagnosis.map((diagnosis, index) => {
				return (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography variant="body1">{diagnosis}</Typography>
						<Button
							onClick={() => {
								setDiagnosis(diagnosis.filter((diagnosis, i) => i != index));
							}}
							variant="text"
							color="error"
						>
							Delete
						</Button>
					</Box>
				);
			})}

			{/* Add more fields related to diagnosis as needed */}

			<Typography mt={"1rem"} variant="h6">
				Medications
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<TextField
					inputRef={medicationNameRef}
					sx={{
						width: "20rem",
						mt: "1rem",
						mr: "1rem",
					}}
					label="Name"
					variant="outlined"
				/>
				<TextField
					inputRef={medicationDosageRef}
					sx={{
						width: "20rem",
						mt: "1rem",
						mr: "1rem",
					}}
					label="Dosage"
					variant="outlined"
				/>
				<TextField
					inputRef={medicationFrequencyRef}
					sx={{
						width: "20rem",
						mt: "1rem",
						mr: "1rem",
					}}
					label="Frequency"
					variant="outlined"
				/>
				<Button
					sx={{
						mt: "1rem",
					}}
					onClick={() => {
						const newMedication = {
							name: medicationNameRef.current.value,
							dosage: medicationDosageRef.current.value,
							frequency: medicationFrequencyRef.current.value,
						};
						setMedications([...medications, newMedication]);
						medicationNameRef.current.value = "";
						medicationDosageRef.current.value = "";
						medicationFrequencyRef.current.value = "";
					}}
					variant="outlined"
					color="success"
				>
					Add
				</Button>
			</Box>
			<Typography mt={"1rem"} variant="h6">
				{medications.length > 0 && "Medications"}
			</Typography>
			{medications.map((medication, index) => {
				return (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography variant="body1">{medication.name}</Typography>
						<Typography variant="body1">{medication.dosage}</Typography>
						<Typography variant="body1">{medication.frequency}</Typography>
						<Button
							onClick={() => {
								setMedications(
									medications.filter((medication, i) => i != index)
								);
							}}
							variant="text"
							color="error"
						>
							Delete
						</Button>
					</Box>
				);
			})}
			<Typography mt={"1rem"} variant="h6">
				Allergen
			</Typography>
			<Box
				sx={{
					display: "flex",
					flexDirection: "row",
				}}
			>
				<TextField
					inputRef={allergyRef}
					sx={{
						width: "20rem",
						mt: "1rem",
						mr: "1rem",
					}}
					label="Name"
					variant="outlined"
				/>
				<Button
					sx={{
						mt: "1rem",
					}}
					onClick={() => {
						setAllergies([...allergies, allergyRef.current.value]);
						allergyRef.current.value = "";
					}}
					variant="outlined"
					color="success"
				>
					Add
				</Button>
			</Box>
			<Typography mt={"1rem"} variant="h6">
				{allergies.length > 0 && "Allergies"}
			</Typography>
			{allergies.map((allergy, index) => {
				return (
					<Box
						sx={{
							display: "flex",
							flexDirection: "row",
							justifyContent: "space-between",
							alignItems: "center",
						}}
					>
						<Typography variant="body1">{allergy}</Typography>

						<Button
							onClick={() => {
								setAllergies(allergies.filter((allergy, i) => i != index));
							}}
							variant="text"
							color="error"
						>
							Delete
						</Button>
					</Box>
				);
			})}

			<Button
				sx={{
					width: "20rem",
					mt: "1rem",
				}}
				onClick={() => {
					ipcRenderer.send("add-patient-submit");
				}}
				variant="contained"
				color="success"
			>
				Add Patient
			</Button>
		</Box>
	);
};

export default AddPatient;
