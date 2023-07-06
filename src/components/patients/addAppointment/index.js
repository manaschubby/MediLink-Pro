import React from "react";
import { Box, Button, Dialog, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import Alert from "../alert";

const AddAppointment = (props) => {
	const { open, setOpen, addNewAppointment } = props;
	const appointmentRef = React.useRef();
	const appointmentInfoRef = React.useRef();
	const [dateOfAppointment, setDateOfAppointment] = React.useState(new Date());

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

	const handleAddAppointment = () => {
		// Validate
		if (appointmentRef.current.value === "") {
			alert(
				"Error",
				"Please enter a appointment name. Like: CT Scan, Clinic Review, Follow-up",
				null
			);
			return;
		}
		const newAppointment = {
			name: appointmentRef.current.value,
			date: new Date(dateOfAppointment),
			info: appointmentInfoRef.current.value,
		};
		addNewAppointment(newAppointment);
		appointmentRef.current.value = "";
		appointmentInfoRef.current.value = "";
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
				<Typography variant="h4">Add Appointment</Typography>
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
							ref={appointmentRef}
							style={{
								fontSize: "1rem",
								padding: "0.5rem",
								width: "18rem",
								margin: "1rem",
							}}
						/>
					</Typography>
					<DatePicker
						label={"Date of Appointment"}
						value={dayjs(dateOfAppointment)}
						sx={{
							width: "25rem",
							mt: "1rem",
							mr: "1rem",
						}}
						minDate={dayjs(new Date())}
						onChange={(newValue) => {
							setDateOfAppointment(newValue);
						}}
					/>
					<Typography variant="h6">
						Info:
						<input
							type="text"
							ref={appointmentInfoRef}
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
						onClick={handleAddAppointment}
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

export default AddAppointment;
