import { Outlet, Route, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { CalendarComponent } from "../components/calendar/CalendarComponent";
import { EventDetails } from "../components/EventDetails/EventDetails";
import { NewEventForm } from "../components/forms/NewEventForm";
import { TeacherProfile } from "../components/users/ProfileViews";
import { EditEventForm } from "../components/forms/EditEventForm";

export const TeacherViews = ({ currentUser }) => {
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
          <>
            <Route
              path="/PostNewEvent"
              element={<NewEventForm currentUser={currentUser} />}
            />
            <Route
              path=":profile"
              element={<TeacherProfile currentUser={currentUser} />}
            />
            <Route path="edit-event/:id" element={<EditEventForm />} />
          </>
        </Route>
      </Routes>
    </>
  );
};
