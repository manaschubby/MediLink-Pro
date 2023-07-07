import { useState, useEffect } from "react";
import usePatients from "./usePatients";
import useAppointments from "./useAppointments";

export default function useDashboard() {
	const { patients, patientsLoaded } = usePatients();
	const { appointments, appointmentsLoaded } = useAppointments();

	const [dashboardLoaded, setDashboardLoaded] = useState(false);

	useEffect(() => {
		if (patientsLoaded && appointmentsLoaded) {
			setDashboardLoaded(true);
		}
	}, [patientsLoaded, appointmentsLoaded]);

	return {
		patients,
		appointments,
		dashboardLoaded,
	};
}
