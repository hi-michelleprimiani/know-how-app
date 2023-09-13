import "./NavBar.css";
import { Link } from "react-router-dom";

export const NavBar = () => {
  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link
          className="navbar-link"
          to="/"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Know-How
        </Link>
      </li>
      <li className="navbar-item">
        <Link
          className="navbar-link"
          to="/calendar"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Calendar
        </Link>
      </li>
    </ul>
  );
};
