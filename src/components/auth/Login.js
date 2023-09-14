import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { getUserByEmail } from "../../services/userService";
import Logo from "../assets/Logo.png";

export const Login = () => {
  const [email, set] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();

    getUserByEmail(email).then((foundUsers) => {
      if (foundUsers.length === 1) {
        const user = foundUsers[0];
        localStorage.setItem(
          "know-how-user",
          JSON.stringify({
            id: user.id,
            isStaff: user.isStaff,
          })
        );

        navigate("/calendar");
      } else {
        window.alert("Invalid login");
      }
    });
  };

  return (
    <main className="container-login">
      <img src={Logo} alt="logo" className="logo" />
      <section>
        <form className="form-login" onSubmit={handleLogin}>
          <div className="community">Hi!</div>

          <div className="form-group">
            <input
              type="email"
              value={email}
              onChange={(evt) => set(evt.target.value)}
              className="form-control"
              placeholder="Email address"
              required
              autoFocus
            />
          </div>
          <div className="form-group">
            <button className="login-btn btn-info" type="submit">
              Login
            </button>
          </div>
        </form>
      </section>
      <button className="register-button">
        <Link
          to="/register"
          style={{ textDecoration: "none", color: "inherit" }}
        >
          Join The Community
        </Link>
      </button>
    </main>
  );
};
