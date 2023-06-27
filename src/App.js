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

const Template = () => {
	useEffect(() => {
		console.log(window.location.pathname);
	}, []);
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
]);

function App() {
	useEffect(() => {}, []);

	return <RouterProvider router={HashRouter} />;
}

export default App;
