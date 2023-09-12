import "./components/calendar/Calendar.css";
import "./App.css";
import { Routes, Route, Outlet } from "react-router-dom";
import { CalendarComponent } from "./components/calendar/CalendarComponent";
import { NavBar } from "./components/NavBar/NavBar";
import { Welcome } from "./components/welcome/Welcome";

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
        <Route path=":calendar" element={<CalendarComponent />} />
      </Route>
    </Routes>
  );
};

export default App;
