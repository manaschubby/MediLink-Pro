import { Add, ArrowBack, Settings } from "@mui/icons-material";
import { Box, Button, Typography } from "@mui/material";
import React from "react";

const SideBar = (props) => {
	const { type } = props;
	const buttons = () => {
		switch (type) {
			case "dashboard":
				return <></>;
			case "patients":
				const { selectedFilter, setSelectedFilter, handleAddPatient } = props;
				return (
					<>
						<Button
							sx={{
								my: "1rem",
								color: "white",
							}}
							variant="text"
							onClick={handleAddPatient}
						>
							<Add />
						</Button>
						<Box
							sx={{
								flexGrow: 1,
								display: "flex",
								flexDirection: "column",
								gap: "1rem",
								alignItems: "center",
								justifyContent: "center",
							}}
						>
							<Button
								variant={selectedFilter == "All" ? "contained" : "outlined"}
								onClick={() => setSelectedFilter("All")}
								sx={{
									fontSize: "0.8rem",
									color: "white",
								}}
							>
								All
							</Button>
							<Button
								variant={selectedFilter == "Active" ? "contained" : "outlined"}
								onClick={() => setSelectedFilter("Active")}
								sx={{
									fontSize: "0.8rem",
									color: "white",
								}}
							>
								Active
							</Button>
						</Box>
					</>
				);
			case "appointments":
				const { handleAddAppointment } = props;
				return (
					<Button
						sx={{
							my: "1rem",
							color: "white",
						}}
						variant="text"
						onClick={handleAddAppointment}
					>
						<Add />
					</Button>
				);
			case "patient":
				return (
					<>
						<Button
							sx={{
								my: "1rem",
								color: "white",
							}}
							variant="text"
							href="/patients"
						>
							<ArrowBack />
						</Button>
					</>
				);
		}
	};
	return (
		<Box
			sx={{
				top: "72px",
				left: "0",
				position: "fixed",
				margin: "0",
				display: "flex",
				flexDirection: "column",
				width: "80px",
				backgroundColor: "#42a5f5",
				height: "calc(100% - 72px)",
				overflowY: "scroll",
			}}
		>
			{buttons()}
			<Typography flexGrow={1} />
			<Button
				sx={{
					mb: "1rem",
					color: "white",
				}}
				variant="text"
			>
				<Settings />
			</Button>
		</Box>
	);
};

export default SideBar;
