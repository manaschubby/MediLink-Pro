import { Box, Typography } from "@mui/material";
import React from "react";

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
	return (
		<Box>
			<img src="/favicon.ico" alt="logo" />
			{intitialzing && <Typography variant="h1">Intitialzing</Typography>}
		</Box>
	);
};

export default InitPage;
