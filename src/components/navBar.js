import { Search } from "@mui/icons-material";
import { Box, Link, Typography } from "@mui/material";
import React from "react";
const bluishColors = ["#e3f2fd", "#bbdefb", "#90caf9", "#64b5f6", "#42a5f5"];
const NavBar = () => {
	const linkStyle = {
		color: "white",
		textDecoration: "none",
		padding: "0.5rem",
		transition: "all 0.2s ease-in-out",
		"&:hover": {
			textDecoration: "underline",
			backgroundColor: bluishColors[3],
		},
	};
	return (
		<Box
			sx={{
				width: "100vw",
				position: "fixed",
				display: "flex",
				justifyContent: "space-between",
				gap: "1rem",
				alignItems: "center",
				padding: "1rem",
				backgroundColor: bluishColors[4],
				maxHeight: "60px",
				zIndex: "1000",
				pl: "5px",
			}}
		>
			<img
				style={{
					position: "absolute",
					objectFit: "contain",
					height: "60px",
				}}
				src="/logo.png"
				alt="MediLink Pro Logo"
			/>
			<Typography
				variant="h4"
				component="div"
				sx={{
					pl: "7rem",
					flexGrow: 1,
					color: "white",
					fontWeight: "bold",
				}}
			>
				<Link sx={{ textDecoration: "none", color: "white" }} href="/">
					MediLink Pro
				</Link>
			</Typography>
			<Link sx={linkStyle} href="/">
				Dashboard
			</Link>
			<Link sx={linkStyle} href="/patients">
				Patients
			</Link>
			<Link sx={linkStyle} href="/appointments">
				Appointments
			</Link>
			<Link mr={"3rem"} sx={linkStyle} href="/search">
				<Search />
			</Link>
		</Box>
	);
};

export default NavBar;
