import logo from "./logo.svg";
import "./App.css";
import { useEffect } from "react";
import { RouterProvider, Outlet, createHashRouter } from "react-router-dom";
import NavBar from "./components/navBar";
import Patients from "./pages/patients";
import Appointments from "./pages/appointments";
import Search from "./pages/search";
import Dashboard from "./pages/dashboard";
import AddPatient from "./pages/addPatient";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Patient from "./pages/patient";
import InitPage from "./pages/initPage";
import usePatients from "./hooks/usePatients";

const Template = () => {
	return (
		<div>
			<NavBar />
			<Outlet />
		</div>
	);
};

function App() {
	const { patients, patientsLoaded, reloadPatients } = usePatients();

	const Router = createHashRouter([
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
				{
					path: "patient/:id",
					element: <Patient />,
				},
			],
		},
		{
			path: "/add-patient",
			element: <AddPatient />,
		},
		{
			path: "/init",
			element: <InitPage />,
		},
	]);
	useEffect(() => {}, []);

	return (
		<LocalizationProvider dateAdapter={AdapterDayjs}>
			<RouterProvider router={Router} />
		</LocalizationProvider>
	);
}

export default App;
