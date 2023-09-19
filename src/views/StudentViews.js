import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { CalendarComponent } from "../components/calendar/CalendarComponent";
import { EventDetails } from "../components/EventDetails/EventDetails";
import { TeacherProfile } from "../components/users/ProfileViews";

export const StudentViews = ({ currentUser }) => {
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
            <Route
              path="/calendar"
              element={<CalendarComponent currentUser={currentUser} />}
            />
          </Route>
          <Route path="/events">
            <Route
              path=":eventId"
              element={<EventDetails currentUser={currentUser} />}
            />
          </Route>
          <Route
            path=":profile"
            element={<TeacherProfile currentUser={currentUser} />}
          />
        </Route>
      </Routes>
    </>
  );
};
