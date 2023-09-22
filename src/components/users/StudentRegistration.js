import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./StudentRegistration.css";

export const StudentRegistration = () => {
  const [registrations, setRegistrations] = useState([]);
  const navigate = useNavigate();
  const { eventId } = useParams(); // get eventId from route params

  useEffect(() => {
    fetch(
      `http://localhost:8088/registrations/?_expand=event&_expand=user&eventId=${eventId}`
    )
      .then((res) => res.json())
      .then((filteredRegistrations) => {
        setRegistrations(filteredRegistrations);
      });
  }, [eventId]);

  return (
    <>
      <div className="register-container">
        <div className="profile-button-container">
          <button
            className="profile-button"
            onClick={() => navigate("/profile")}
          >
            Back To Profile
          </button>
        </div>
        <h1 className="register-title">Student Registration</h1>
        <p className="register-text-2">
          You have {registrations.length} students signed up.
        </p>
        <ul className="register-text">
          {registrations.map((registration) => (
            <li key={registration.id}>{registration.user.name}</li>
          ))}
        </ul>
      </div>
    </>
  );
};
