import React, { useEffect } from "react";
import Fullcalendar from "@fullcalendar/react";
import listPlugin from "@fullcalendar/list";
import useAppointments from "../hooks/useAppointments";
import { useState } from "react";

function Calendar(props) {
	const { setViewAppointmentDialog, setAppointmentSelected } = props;
	const { appointments } = useAppointments();
	const [events, setEvents] = useState([]);

	function addEvents() {
		setEvents(
			appointments.map((meet, index) => {
				var now = new Date().toISOString();
				const newEvent = {
					title: meet.name,
					start: new Date(Date.parse(meet.date)),
					color:
						now <= meet.date
							? now.substring(0, 10) == meet.date.substring(0, 10)
								? "green"
								: "#42a5f5"
							: "red",
					key: index,
					description: meet.info,
				};

				return newEvent;
			})
		);
	}
	useEffect(() => {
		addEvents();
	}, [appointments]);

	function renderEventContent(eventInfo) {
		return (
			<>
				{/*Button */}
				<h3>{eventInfo.start}</h3>
				<h4 style={{ marginLeft: "10px", padding: "2px" }}>
					{eventInfo.event.title}
				</h4>
			</>
		);
	}
	return (
		<div style={{ boxShadow: "1px 15px 90px 1px #90caf9" }}>
			<Fullcalendar
				plugins={[listPlugin]}
				initialView={"listWeek"}
				views={{
					listDay: { buttonText: "Day" },
					listWeek: { buttonText: "Week" },
					listMonth: { buttonText: "Month" },
				}}
				headerToolbar={{
					start: "today prev,next",
					center: "title",
					right: "listDay,listWeek,listMonth",
				}}
				height={"85vh"}
				weekends={true}
				events={events}
				eventContent={renderEventContent}
				// editable={"true"}
				selectable={"true"}
				eventClick={function (info) {
					setAppointmentSelected(
						appointments[info.event._def.extendedProps.key]
					);
					setViewAppointmentDialog(true);
					console.log(appointments[info.event._def.extendedProps.key]);
				}}
			/>
		</div>
	);
}
export default Calendar;
