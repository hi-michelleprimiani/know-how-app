import "./components/calendar/Calendar.css";
import "./components/EventDetails/EventDetails.css";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { NavBar } from "./components/NavBar/NavBar";
import { Welcome } from "./components/welcome/Welcome";
import { EventDetails } from "./components/EventDetails/EventDetails";
import { CalendarComponent } from "./components/calendar/CalendarComponent";
import { NewEventForm } from "./components/forms/NewEventForm";

export const App = () => {
  return (
    <Routes>
      <Route
        path="/"
        element={
          <>
            <NavBar />
            <Outlet />
          </>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="/:calendar" element={<CalendarComponent />} />
        <Route path="/events/:eventId" element={<EventDetails />} />
        <Route path="/PostNewEvent" element={<NewEventForm />} />
      </Route>
    </Routes>
  );
};

export default App;
