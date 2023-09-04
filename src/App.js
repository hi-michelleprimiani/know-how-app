import React, { useEffect, useState } from "react";
import "./components/calendar/Calendar.css";
import "./App.css";
import { CalendarComp } from "./components/calendar/CalendarComp";

function App() {
  return (
    <div className="container">
      <div className="header">
        <div className="title">Know-How!</div>
      </div>
      <CalendarComp />
    </div>
  );
}

export default App;
