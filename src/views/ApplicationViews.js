import { Route, Outlet, Routes } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { CalendarComponent } from "../components/calendar/CalendarComponent";
import { EventDetails } from "../components/EventDetails/EventDetails";
import { NewEventForm } from "../components/forms/NewEventForm";
import { useState, useEffect } from "react";
import { TeacherProfile } from "../components/users/ProfileViews";
import { EditEventForm } from "../components/forms/EditEventForm";
import { TeacherViews } from "./TeacherViews";
import { StudentViews } from "./StudentViews";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localHoneyUser = localStorage.getItem("know-how-user");
    const honeyUserObject = JSON.parse(localHoneyUser);

    setCurrentUser(honeyUserObject);
  }, []);

  return (
    <>
      {currentUser.isStaff ? (
        <TeacherViews currentUser={currentUser} />
      ) : (
        <StudentViews currentUser={currentUser} />
      )}
    </>
  );
};
