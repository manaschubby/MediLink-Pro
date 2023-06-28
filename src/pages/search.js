import {
	Box,
	Button,
	CircularProgress,
	Dialog,
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
const AddPatient = (props) => {
	const { edit } = props;

	// State Variables
	const [gender, setGender] = React.useState(false);
	const [dateOfBirth, setDateOfBirth] = React.useState(new Date());
	const [symptoms, setSymptoms] = React.useState([]);
	const [diagnosis, setDiagnosis] = React.useState([]);
	const [dateOfDiagnosis, setDateOfDiagnosis] = React.useState(new Date());
	const [medications, setMedications] = React.useState([]);
	const [allergies, setAllergies] = React.useState([]);

	const [loadingOpen, setLoadingOpen] = React.useState(false);

	// Refs
	const firstNameRef = useRef();
	const lastNameRef = useRef();
	const bloodGroup = useRef();
	const dateRef = useRef();
	const phoneRef = useRef();
	const emailRef = useRef();
	const addressRef = useRef();
	const cityRef = useRef();
	const stateRef = useRef();
	const zipRef = useRef();

	const symptomRef = useRef();
	const diagnosisRef = useRef();
	const medicationNameRef = useRef();
	const medicationDosageRef = useRef();
	const medicationFrequencyRef = useRef();
	const allergyRef = useRef();

	// Check if required fields are present
	const validate = () => {
		if (firstNameRef.current.value == "") {
			return false;
		}
		if (lastNameRef.current.value == "") {
			return false;
		}
		if (bloodGroup.current.value == "default") {
			return false;
		}
		return true;
	};

	const handleAddPatient = () => {
		console.log(dateRef.current.value);
		if (validate()) {
			ipcRenderer.send("create-patient", {
				firstName: firstNameRef.current.value,
				lastName: lastNameRef.current.value,
				dateOfBirth: dateRef.current.value,
				gender: gender ? "Male" : "Female",
				address: {
					street: addressRef.current.value,
					city: cityRef.current.value,
					state: stateRef.current.value,
					postalCode: zipRef.current.value,
				},
				contact: {
					phone: phoneRef.current.value,
					email: emailRef.current.value,
				},
				symptoms: symptoms,
				diagnosis: diagnosis,
				allergies: allergies,
				medications: medications,
				bloodGroup: bloodGroup.current.value,
			});
			ipcRenderer.on("patient-created", (event, patient) => {
				ipcRenderer.send("add-patient-submit");
			});
		} else {
			alert("Please fill in Name and Blood Group fields.");
		}
	};
	return (
//top navbar
	<Box 
		sx={{
			height: "100%",
			backgroundColor: "#f5f5f5",
			padding: "4.7rem",
			display: "flex",
			// paddingBlockStart:"2rem",
			flexDirection: "column",
			scrollBehavior: "smooth",
			scrollbarWidth: "10px",
		}}>	
		<Dialog open={loadingOpen}>
			<CircularProgress />
		</Dialog>
		</Box>,

//Main box(includes two boxes)

		<Box
		sx={{
			height: "100%",
			backgroundColor: "#fff",
			// padding: "4.7rem",
			padding:"1rem",
			paddingTop:"5rem",
			display: "flex",
			// paddingBlockStart:"2rem",
			flexDirection: "row",
			scrollBehavior: "smooth",
			scrollbarWidth: "10px",
		
		}}>	
		<div style={{width:"30%",
					height:"4000px"
					// padding:"2rem",						
						}}>

		{/* //left box */}
		<Box
			sx={{
				height: "100%",
				backgroundColor: "#FAF9F6",
				// padding: "4.7rem",
				// paddingTop:"7rem",
				// padding:"2rem",
				paddingLeft:"2rem",
				paddingRight:"2rem",
				display: "flex",
				// paddingBlockStart:"2rem",
				flexDirection: "column",
				scrollBehavior: "smooth",
				scrollbarWidth: "10px",
			}}>	
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
					inputRef={firstNameRef}
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
				gap: "1rem",
				my: "1rem",
			}}>
			<Select
				inputRef={bloodGroup}
				label="Blood Type"
				title="Blood Type"
				labelId="demo-simple-select-label"
				sx={{
					width: "20rem",
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
			<DatePicker
				label={"Date of Birth"}
				value={dayjs(dateOfBirth)}
				maxDate={dayjs(new Date())}
				sx={{
					width: "20rem",
					mt: "0.3rem",
				}}
				onChange={(newValue) => {
					setDateOfBirth(newValue);
				}}
				inputRef={dateRef}
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
						const newDiagnosis = {
							name: diagnosisRef.current.value,
							date: dateOfDiagnosis,
						};
						setDiagnosis([...diagnosis, newDiagnosis]);
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
				}}
				onClick={() => {
					handleAddPatient();
				}}
				variant="contained"
				color="success"
			>
				Search
			</Button>
		</Box>
		</div>
		<div style={{width:"70%",
					// padding:"2rem",						
						}}>

		{/* box2 */}
		<Box
			sx={{
				height: "100%",	
				backgroundColor: "#fff",
				// padding: "4.7rem",
				// marginTop:"2rem",
				paddingLeft:"2rem",
				
				// marginLeft:"20px",
				display: "flex",
				// paddingBlockStart:"2rem",
				flexDirection: "column",
				scrollBehavior: "smooth",
				scrollbarWidth: "10px",
				// width:"30%"
			}}
		>
		<Typography variant="h3">Results:</Typography>

			

		</Box>
		</div>

	</Box>
	);
};

export default AddPatient;
