import { useState, useEffect } from "react";
const electron = window.require("electron");
const { ipcRenderer } = electron;

const useInit = () => {
	const [intitializing, setIntitializing] = useState(true);
	const [takeInputData, setTakeInputData] = useState(false);

	useEffect(() => {
		ipcRenderer.send("init");
		ipcRenderer.on("init", (event, data) => {
			setIntitializing(false);
			if (data.allOk) {
				setTakeInputData(false);
			}
		});
		return () => {
			ipcRenderer.removeAllListeners("init");
		};
	}, []);

	return {
		intitializing,
	};
};

export default useInit;
