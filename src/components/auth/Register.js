import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import { createUser, getUserByEmail } from "../../services/userService";

export const Register = (props) => {
  const [customer, setCustomer] = useState({
    name: "",
    about: "",
    email: "",
    isStaff: false,
  });
  let navigate = useNavigate();

  const registerNewUser = () => {
    createUser(customer).then((createdUser) => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "know-how-user",
          JSON.stringify({
            id: createdUser.id,
            isStaff: createdUser.isStaff,
          })
        );

        navigate("/");
      }
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    getUserByEmail(customer.email).then((response) => {
      if (response.length > 0) {
        // Duplicate email. No good.
        window.alert("Account with that email address already exists");
      } else {
        // Good email, create user.
        registerNewUser();
      }
    });
  };

  const updateCustomer = (evt) => {
    const copy = { ...customer };
    copy[evt.target.id] = evt.target.value;
    setCustomer(copy);
  };

  return (
    <main style={{ textAlign: "center" }}>
      <form className="form-login" onSubmit={handleRegister}>
        <h1>Know-How!</h1>
        <h2>Please Register</h2>

        <div className="form-group">
          <input
            onChange={updateCustomer}
            type="text"
            id="name"
            className="form-control"
            placeholder="Enter your name"
            required
            autoFocus
          />
        </div>

        <div className="form-group">
          <input
            onChange={updateCustomer}
            type="email"
            id="email"
            className="form-control"
            placeholder="Email address"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={updateCustomer}
            type="text"
            id="about"
            className="form-control"
            placeholder="Tell us about yourself"
            required
          />
        </div>
        <div className="form-group">
          <input
            onChange={updateCustomer}
            type="text"
            id="imgUrl"
            className="form-control"
            placeholder="www.you.jpg/selfie"
            required
          />
        </div>
        <div className="form-group">
          <label>
            <input
              onChange={(evt) => {
                const copy = { ...customer };
                copy.isStaff = evt.target.checked;
                setCustomer(copy);
              }}
              type="checkbox"
              id="isStaff"
            />
            I am a teacher{" "}
          </label>
        </div>

        <div className="form-group">
          <button className="login-btn btn-info" type="submit">
            Register
          </button>
        </div>
      </form>
    </main>
  );
};
