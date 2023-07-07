import React from "react";
import SideBar from "../components/sideBar";
import { Typography } from "@mui/material";
import Calendar from "../components/calendar";

const electron = window.require("electron");
const { ipcRenderer } = electron;


const Appointments = () => {
  const handleAddAppointment = () => {
    ipcRenderer.send("add-appointment");
  };
  return (
    <div>
      <SideBar
        type="appointments"
        handleAddAppointment={handleAddAppointment}
      />
      <Typography variant="h3">Appointments</Typography>
      <div
        style={{
          margin: "20px",
		  marginLeft:"6%",
		  padding:"2%",
      height:"auto"

        }}
      >
        <Calendar  />
      </div>
    </div>
  );
};

export default Appointments;
