import { Box, Button } from "@mui/material";
import React from "react";

const SideBar = (props) => {
	const { type } = props;
	const buttons = () => {
		switch (type) {
			case "dashboard":
				return <Button variant="contained" color="primary" />;
		}
	};
	return (
		<Box
			sx={{
				position: "absolute",
				margin: "0",
				display: "flex",
				flexDirection: "column",
				width: "80px",
				backgroundColor: "#42a5f5",
				height: "100vh",
			}}
		>
			{buttons()}
		</Box>
	);
};

export default SideBar;
