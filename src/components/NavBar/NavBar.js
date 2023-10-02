import "./NavBar.css";
import { Link, useNavigate } from "react-router-dom";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar-item">
        <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
          Know-How
        </Link>
      </li>
      <li className="navbar-item">
        <Link
          to="/calendar"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Calendar
        </Link>
      </li>
      <li className="navbar-item">
        <Link
          to="/profile"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Profile
        </Link>
      </li>
      {localStorage.getItem("know-how-user") ? (
        <li className="navbar-item navbar-logout">
          <Link
            to=""
            onClick={() => {
              localStorage.removeItem("know-how-user");
              navigate("/", { replace: true });
            }}
            style={{ textDecoration: "none", color: "inherit" }}
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
