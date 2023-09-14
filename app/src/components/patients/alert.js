import {
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogTitle,
} from "@mui/material";
import React from "react";

const Alert = (props) => {
	const { open, setOpen, title, message, accept, reject } = props;
	return (
		<Dialog
			open={open}
			onClose={() => setOpen(false)}
			aria-labelledby="alert-dialog-title"
			aria-describedby="alert-dialog-description"
			sx={{
				padding: "1rem",
				width: "100%",
			}}
		>
			<DialogTitle
				sx={{
					padding: "1rem",
				}}
				id="alert-dialog-title"
			>
				{title}
			</DialogTitle>
			<DialogContent
				sx={{
					padding: "1rem",
				}}
			>
				{message}
			</DialogContent>
			<DialogActions
				sx={{
					padding: "1rem",
				}}
			>
				{reject && (
					<Button color="error" variant="contained" onClick={reject}>
						Cancel
					</Button>
				)}
				{accept && (
					<Button color="success" variant="outlined" onClick={accept}>
						Ok
					</Button>
				)}
			</DialogActions>
		</Dialog>
	);
};

export default Alert;
