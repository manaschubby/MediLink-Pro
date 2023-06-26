import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
const electron = window.require("electron");

function App() {
	useEffect(() => {
		electron.ipcRenderer.send("require", "fs");
	}, []);

	return <div className="App"></div>;
}

export default App;
