import { Box, Button, Dialog, TextField, Typography } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import React from "react";

const AddReport = (props) => {
	const { open, setOpen, addNewReport } = props;
	const reportRef = React.useRef();

	const [dateOfReport, setDateOfReport] = React.useState(new Date());

	return (
		<Dialog open={open}>
			<Box
				sx={{
					display: "flex",
					flexDirection: "column",
					gap: "1rem",
					padding: "1rem",
					width: "500px",
				}}
			>
				<Typography variant="h5">Add Report</Typography>
				<TextField
					label="Report"
					multiline
					rows={4}
					variant="outlined"
					inputRef={reportRef}
				/>
				<DatePicker
					label="Date of Report"
					value={dayjs(dateOfReport)}
					onChange={(newValue) => {
						setDateOfReport(newValue);
					}}
					sx={{
						width: "25rem",
						mt: "1rem",
						mr: "1rem",
					}}
				/>
				<Box sx={{ display: "flex", justifyContent: "flex-end", gap: "1rem" }}>
					<Button
						variant="contained"
						color="error"
						onClick={() => {
							setOpen(false);
						}}
					>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							addNewReport(reportRef.current.value);
							setOpen(false);
						}}
					>
						Add
					</Button>
				</Box>
			</Box>
		</Dialog>
	);
};

export default AddReport;
