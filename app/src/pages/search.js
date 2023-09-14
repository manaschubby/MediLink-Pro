import {
	Box,
	Button,
	CircularProgress,
	Dialog,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";

import React, { useRef } from "react";
const AddPatient = () => {
	// State Variables
	const [loadingOpen, setLoadingOpen] = React.useState(false);
	const [symptoms, setSymptoms] = React.useState([]);
	const [diagnosis, setDiagnosis] = React.useState([]);
	const [medications, setMedications] = React.useState([]);
	const [allergies, setAllergies] = React.useState([]);

	// Refs
	const nameRef = useRef();
	const bloodGroup = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();

	const symptomRef = useRef();
	const diagnosisRef = useRef();
	const medicationNameRef = useRef();
	const allergyRef = useRef();

	// Functions
	const handleSearch = () => {
		setLoadingOpen(true);
		setTimeout(() => {
			setLoadingOpen(false);
		}, 1000);
	};

	return (
		//Main box(includes two boxes)

		<Box
			key={2}
			sx={{
				maxHeight: "calc(100vh - 5rem)",
				backgroundColor: "#fff",
				paddingTop: "5rem",
				display: "flex",
				flexDirection: "row",
				scrollBehavior: "smooth",
				scrollbarWidth: "10px",
				overflowY: "scroll",
			}}
		>
			<Dialog
				open={loadingOpen}
				sx={{
					background: "transparent",
				}}
			>
				<CircularProgress
					sx={{
						background: "transparent",
					}}
				/>
			</Dialog>

			{/* //left box */}
			<Box
				key={3}
				sx={{
					width: "30%",
					height: "calc(100vh - 5rem)",
					backgroundColor: "#F6F9F6",
					paddingLeft: "2rem",
					paddingRight: "2rem",
					display: "flex",
					flexDirection: "column",
					scrollBehavior: "smooth",
					scrollbarWidth: "10px",
					overflowY: "scroll",
				}}
				component={"div"}
			>
				<Typography variant="h3">Search Information</Typography>

				<Typography mt={"1rem"} variant="h6">
					Patient's Name
				</Typography>
				<Box
					sx={{
						display: "flex",
						flexDirection: "row",
					}}
				>
					<TextField
						inputRef={nameRef}
						sx={{
							width: "20rem",
							mt: "0.3.2rem",
							mr: "1rem",
						}}
						label="Name"
						variant="outlined"
					/>
				</Box>

				<Box
					sx={{
						display: "flex",
						flexDirection: "column",
						gap: "1rem",
						my: "1rem",
					}}
				>
					<Select
						inputRef={bloodGroup}
						label="Blood Type"
						title="Blood Type"
						labelId="demo-simple-select-label"
						sx={{
							mt: "0.3rem",
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
							mt: "0.3rem",
							mr: "1rem",
						}}
						label="Name"
						variant="outlined"
					/>
					<Button
						sx={{
							mt: "0.3rem",
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
									setSymptoms(symptoms.filter((symptom, i) => i !== index));
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
							mt: "0.3rem",
							mr: "1rem",
						}}
						label="Name"
						variant="outlined"
					/>

					<Button
						sx={{
							mt: "0.3rem",
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
									setDiagnosis(diagnosis.filter((diagnosis, i) => i !== index));
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
							mt: "0.3rem",
							mr: "1rem",
						}}
						label="Name"
						variant="outlined"
					/>

					<Button
						sx={{
							mt: "0.3rem",
						}}
						onClick={() => {
							setMedications([...medications, medicationNameRef.current.value]);
							medicationNameRef.current.value = "";
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
							<Typography variant="body1">{medication}</Typography>
							<Button
								onClick={() => {
									setMedications(
										medications.filter((medication, i) => i !== index)
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
					Contact Information
				</Typography>
				<Box
					sx={{
						display: "flex",
						gap: "1rem",
					}}
				>
					<TextField
						inputRef={phoneRef}
						sx={{
							width: "20rem",
							mt: "0.3rem",
						}}
						label="Phone Number"
						variant="outlined"
					/>
					<TextField
						inputRef={emailRef}
						sx={{
							width: "20rem",
							mt: "0.3rem",
						}}
						label="Email"
						variant="outlined"
					/>
				</Box>

				<Button
					sx={{
						width: "20rem",
						mt: "2rem",
						mb: "2rem",
					}}
					onClick={handleSearch}
					variant="contained"
					color="success"
				>
					Search
				</Button>
			</Box>
			{/* box2 */}
			<Box
				key={4}
				component={"div"}
				sx={{
					width: "70%",
					backgroundColor: "#fff",
					maxHeight: "100vh",
					paddingLeft: "2rem",
					display: "flex",
					flexDirection: "column",
					scrollBehavior: "smooth",
					scrollbarWidth: "10px",
					overflowY: "scroll",
				}}
			>
				<Typography variant="h3">Results:</Typography>
			</Box>
		</Box>
	);
};

export default AddPatient;
