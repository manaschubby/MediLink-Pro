import React from "react";
import Fullcalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";

const events = [
  { title: "Meeting1", start: new Date(Date.parse('2023-07-05T15:51:50.417')) },
  { title: "Meeting1", start: "2023-07-06" },
  { title: "Meeting2", start: "2023-07-05" },
];

function Calendar() {
  function renderEventContent(eventInfo) {
    return (
      <>{/*Button */}
        {/* Time of the Meeting */}
        <h3>{eventInfo.start}</h3>
        <h4 style={{ marginLeft: "10px", padding: "2px" }}>
          {eventInfo.event.title}
        </h4>
      </>
    );
  }
  return (
    <div>
      <Fullcalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView={"dayGridMonth"}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          end: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        height={"85vh"}
        weekends={false}
        events={events}
        eventContent={renderEventContent}
      />
    </div>
  );
}
export default Calendar;
