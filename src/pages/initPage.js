import { Box, CircularProgress } from "@mui/material";
import React, { useEffect, useRef } from "react";
import useInit from "../hooks/useInit";

/*

    * The purpose of this page 
    * is to implement an initial setup window for the application,
    * allowing the user to specify the location of the data storage. 
    * Additionally, the same window should serve as a 
    * loading process when the app opens on a daily basis.

    todo: Initial Setup Window:

    ? Create a dedicated window that appears when the 
    ? application is launched for the first time or when the user needs 
    ? to set up the data storage location.

    ? Design the window interface to prompt the user 
    ? for the desired directory or location where the application will store its data.

    ? Implement functionality to capture and validate the user's 
    ? input, ensuring the selected location is valid and accessible.
    
    todo: Daily Loading Process:

    ? Modify the initial setup window to serve as a loading 
    ? process when the app opens on subsequent daily launches.

    ? When the application starts, display the loading window briefly to 
    ? indicate that data is being read and files and folders are being verified.

    ? Implement the loading process to check the existence and 
    ? integrity of necessary files and folders required for the application's functioning.

    ? Provide visual indicators or progress feedback during the 
    ? loading process to keep the user informed about the progress being made.
*/

const InitPage = () => {
	const { intitializing } = useInit();
	const videoRef = useRef();
	useEffect(() => {
		videoRef.current.play();
	}, []);
	return (
		<Box
			sx={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
				height: "100vh",
				width: "100vw",
				backgroundColor: "#42a5f5",
			}}
		>
			<video
				ref={videoRef}
				autoPlay
				loop
				muted
				style={{
					position: "absolute",
					width: "100vw",
					height: "100vh",
					objectFit: "cover",
				}}
			>
				<source src="/loading.mp4" type="video/mp4" />
			</video>
			<CircularProgress
				title="Loading"
				sx={{
					color: "white",
					position: "absolute",
					top: "80%",
				}}
			/>
		</Box>
	);
};

export default InitPage;
