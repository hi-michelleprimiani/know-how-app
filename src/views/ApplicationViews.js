import { Route, Outlet, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { CalendarComponent } from "../components/calendar/CalendarComponent";
import { EventDetails } from "../components/EventDetails/EventDetails";
import { NewEventForm } from "../components/forms/NewEventForm";
import { useState, useEffect } from "react";
import { TeacherProfile } from "../components/users/TeacherProfile";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("honey_user");
    const honeyUserObject = JSON.parse(localHoneyUser);

    setCurrentUser(honeyUserObject);
  }, []);

  return (
    <>
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
          <Route path="calendar">
            <Route path="/calendar" element={<CalendarComponent />} />
          </Route>
          <Route path="/events">
            <Route path=":eventId" element={<EventDetails />} />
          </Route>
          <Route path="/PostNewEvent" element={<NewEventForm />} />

          <Route
            path=":profile"
            element={<TeacherProfile />}
            currentUser={currentUser}
          />
        </Route>
      </Routes>
    </>
  );
};
