import { useEffect, useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function useAddFile() {
	const [file, setFile] = useState();
	const [fileLocation, setFileLocation] = useState();
	const [fileLocationError, setFileLocationError] = useState();
	const showAddFile = (patientID) => {
		ipcRenderer.send("add-file", patientID);
		ipcRenderer.on("file-path", (event, file_path) => {
			console.log(file_path);
			// Get file name from path
			const file_name = file_path.split("\\").pop().split("/").pop();
			console.log(file_name);
			setFile(file_name);
		});
	};
	const fileLocationSelect = () => {
		ipcRenderer.send("file-location-select");
		ipcRenderer.on("file-location", (event, file_location) => {
			setFileLocation(file_location);
		});
	};
	const fileLocationSubmit = () => {
		ipcRenderer.send("file-location-submit", fileLocation);
		ipcRenderer.on("file-location-error", (event, file_location) => {
			setFileLocationError(file_location);
		});
	};
	return {
		file,
		showAddFile,
		fileLocationSelect,
		fileLocation,
		setFileLocation,
		fileLocationError,
		fileLocationSubmit,
		setFileLocationError,
	};
}
