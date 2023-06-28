import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import {
	RouterProvider,
	Link,
	Switch,
	Outlet,
	createBrowserRouter,
} from "react-router-dom";
import NavBar from "./components/navBar";
import Patients from "./pages/patients";
import Appointments from "./pages/appointments";
import Search from "./pages/search";
import Dashboard from "./pages/dashboard";
import AddPatient from "./pages/addPatient";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

const Template = () => {
	return (
		<div>
			<NavBar />
			<Outlet />
		</div>
	);
};

const HashRouter = createBrowserRouter([
	{
		path: "/",
		element: <Template />,
		children: [
			{
				path: "/",
				element: <Dashboard />,
			},
			{
				path: "search",
				element: <Search />,
			},
			{
				path: "appointments",
				element: <Appointments />,
			},
			{
				path: "patients",
				element: <Patients />,
			},
		],
	},
	{
		path: "/add-patient",
		element: <AddPatient />,
	},
	{
		path: "/patients/:id",
		element: <AddPatient edit />,
	},
]);

function App() {
	useEffect(() => {}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<RouterProvider router={HashRouter} />
		</LocalizationProvider>
	);
}

export default App;
