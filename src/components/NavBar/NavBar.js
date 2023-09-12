import { Link, useNavigate } from "react-router-dom";
import "./NavBar.css";

export const NavBar = () => {
  const navigate = useNavigate();

  return (
    <ul className="navbar">
      <li className="navbar__item">
        <Link className="navbar__link" to="/">
          Know-How
        </Link>
      </li>
      <li className="navbar__item">
        <Link className="navbar__link" to="/calendar">
          Calendar
        </Link>
        {localStorage.getItem("know-how-user") ? (
          <li className="navbar-item navbar-logout">
            <Link
              className="navbar-link"
              to=""
              onClick={() => {
                localStorage.removeItem("know-how-user");
                navigate("/", { replace: true });
              }}
            >
              Logout
            </Link>
          </li>
        ) : (
          ""
        )}
      </li>
    </ul>
  );
};
