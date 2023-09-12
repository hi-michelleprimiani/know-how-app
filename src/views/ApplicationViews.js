import { Route, Routes, Outlet } from "react-router-dom";
import { NavBar } from "../components/NavBar/NavBar";
import { Welcome } from "../components/welcome/Welcome";
import { CalendarComp } from "../components/calendar/CalendarComp";
import { useState, useEffect } from "react";

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    const localUser = localStorage.getItem("know-how-user");
    const knowHowUserObj = JSON.parse(localUser);

    setCurrentUser(knowHowUserObj);
  }, []);

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
        <Route
          path=":calendar"
          element={<CalendarComp currentUser={currentUser} />}
        />
      </Route>
    </Routes>
  );
};
