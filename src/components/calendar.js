import React from "react";
import Fullcalendar from "@fullcalendar/react";
import listPlugin from '@fullcalendar/list';
import usePatients from "../hooks/usePatients";


const events = [
  { title: "Meeting1", start: new Date(Date.parse('2023-07-05T15:51:50.417')),description: 'CT Scan'},
  { title: "Meeting1", start: new Date(Date.parse('2023-07-05T16:51:50.417')),description: 'CT Scan'},
  { title: "Meeting1", start: new Date(Date.parse('2023-07-05T12:51:50.417')),description: 'CT Scan'},
  { title: "Meeting1", start: new Date(Date.parse('2023-07-05T14:51:50.417')),description: 'CT Scan'},
  { title: "Meeting1", start: "2023-07-06",color: '#378006',description: 'CT Scan' },
  { title: "Meeting2", start: "2023-07-05",color: '#378006' ,description: 'CT Scan'},
];


function Calendar() {
  const [meetings, setMeetings] = React.useState([]);

  function renderEventContent(eventInfo) {
    return (
      <>{/*Button */}
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

        plugins={[listPlugin]}
        initialView={"listDay"}
        views={
          {listDay: { buttonText: 'Day' },
          listWeek: { buttonText: 'Week' },
          listMonth: { buttonText: 'Month' }
        }}
        headerToolbar={{
          start: "today prev,next",
          center: "title",
          right: 'listDay,listWeek,listMonth',
        }}
 
        height={"85vh"}
        weekends={true}
        events={events}
        eventContent={renderEventContent}
        // editable={"true"}
        selectable={"true"}
        eventClick={function(info) {
          //show description
             alert(info.event.title +" : "+info.event.extendedProps.description);
          }}

        
      />
    </div>
  );
}
export default Calendar;
