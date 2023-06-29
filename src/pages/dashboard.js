import React from "react";
import SideBar from "../components/sideBar";
import { Box, Button, Typography } from "@mui/material";

const Dashboard = () => {
	return (
		<div>
			<SideBar type="dashboard" />
			{/* <h1>Dashboard</h1> */}
			<Box
				sx={{
					top: "72px",
					position: "absolute",
					left: "80px",
					width: "calc(100vw - 112px)",
					height: "100%",
					backgroundColor: "#f5f5f5",
					padding: "1rem",
				}}
			>
				<Typography variant="h3">Dashboard</Typography>
				<Box sx={{ display: "flex", gap: "1rem", mt: "1rem" }}>
					<Box
						sx={{
							width: "100%",
							height: "100%",
							backgroundColor: "white",
							borderRadius: "0.5rem",
							p: "1rem",
							paddingRight: "2.5rem",
						}}
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h5">Upcoming Appointments</Typography>
							<Button variant="text">View All</Button>
						</Box>
						<Box sx={{ display: "flex", flexDirection: "column", mt: "1rem" }}>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="h6">Patient Name</Typography>
								<Typography variant="h6">Date</Typography>
							</Box>
							<Box
								mt={"1rem"}
								sx={{ display: "flex", justifyContent: "space-between" }}
							>
								<Typography variant="body1">Azeez Kaur</Typography>
								<Typography variant="body1">
									{new Date().toLocaleString()}
								</Typography>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="body1">Patient Name</Typography>
								<Typography variant="body1">Date</Typography>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="body1">Patient Name</Typography>
								<Typography variant="body1">Date</Typography>
							</Box>
							<Box sx={{ display: "flex", justifyContent: "space-between" }}>
								<Typography variant="body1">Patient Name</Typography>
								<Typography variant="body1">Date</Typography>
							</Box>
						</Box>
					</Box>
					<Box
						sx={{
							width: "100%",
							height: "100%",
							backgroundColor: "white",
							borderRadius: "0.5rem",
							p: "1rem",
							paddingRight: "2.5rem",
							marginRight: "3rem",
						}}
					>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
							}}
						>
							<Typography variant="h5">Active Patients</Typography>
							<Button href="/patients" variant="text">
								View All
							</Button>
						</Box>
						<Box
							sx={{
								display: "flex",
								justifyContent: "space-between",
								mt: "1rem",
							}}
						>
							<Typography variant="h6">Patient Name</Typography>
							<Typography variant="h6">Next Action</Typography>
						</Box>
						<Box
							mt={"1rem"}
							sx={{ display: "flex", justifyContent: "space-between" }}
						>
							<Typography variant="body1">Azeez Kaur</Typography>
							<Typography variant="body1">CT Scan</Typography>
						</Box>
					</Box>
				</Box>
			</Box>
		</div>
	);
};

export default Dashboard;
