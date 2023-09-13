import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

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
      <li className="navbar-item">
        <Link
          className="navbar-link"
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Profile
        </Link>
      </li>
      {localStorage.getItem("honey_user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            className="navbar-link"
            to=""
            onClick={() => {
              localStorage.removeItem("honey_user");
              navigate("/", { replace: true });
            }}
          >
            Logout
          </Link>
        </li>
      ) : (
        ""
      )}
    </ul>
  );
};
