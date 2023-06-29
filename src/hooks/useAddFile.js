import { useEffect, useState } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

export default function useAddFile() {
	const [file, setFile] = useState();
	const showAddFile = () => {
		ipcRenderer.send("add-file");
		ipcRenderer.on("file-path", (event, file_path) => {
			console.log(file_path);
			// Get file name from path
			const file_name = file_path.split("\\").pop().split("/").pop();
			console.log(file_name);
			setFile(file_name);
		});
	};
	return {
		file,
		showAddFile,
	};
}
