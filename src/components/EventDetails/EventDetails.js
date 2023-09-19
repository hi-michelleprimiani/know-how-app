import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventsById, getUsers } from "../../services/APIService";
import "./EventDetails.css";

export const EventDetails = ({ currentUser }) => {
  const [eventDetail, setEventDetail] = useState();
  const [users, setUsers] = useState({});
  const [teacher, setTeacher] = useState(null);
  const { eventId } = useParams({});
  const navigate = useNavigate();

  useEffect(() => {
    getEventsById(eventId).then((data) => {
      setEventDetail(data);
    });
  }, [eventId]);

  useEffect(() => {
    getUsers().then((userArray) => {
      setUsers(userArray);
    });
  }, []);

  useEffect(() => {
    if (eventDetail && users.length > 0) {
      const foundTeacher = users.find(
        (user) => user.id === eventDetail.teacherId
      );
      setTeacher(foundTeacher);
    }
  }, [eventDetail, users]);

  const handleSignUp = () => {
    // Step 1: Capture EventID and UserID
    const newRegistration = {
      eventId: eventDetail.id,
      userId: currentUser.id,
    };

    // Step 2: API Call
    fetch("http://localhost:8088/registrations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newRegistration),
    })
      .then((response) => response.json())
      .then((data) => {
        navigate("/profile");
      })
      .catch((error) => {
        console.error("There was an error with the registration:", error);
        alert("There was an issue with your registration. Please try again.");
      });
  };

  return (
    <>
      <div className="event-details-container">
        <button className="back-button" onClick={() => navigate("/calendar")}>
          Back To Calendar
        </button>
        {currentUser?.id === eventDetail?.teacherId ? (
          <button
            className="profile-button"
            onClick={() => navigate("/profile")}
          >
            Back To Profile
          </button>
        ) : (
          ""
        )}
        <div className="primary-info">
          <div className="primary-info-2">
            <h1 className="event-name">{eventDetail?.className}</h1>
            <div className="event-tagline">{eventDetail?.tagline}</div>
          </div>
          <img
            src={eventDetail?.primaryImgUrl}
            alt={eventDetail?.className}
            className="event-primary-img"
          />
        </div>
        <div className="secondary-info">
          <div className="event-location">
            Location: {eventDetail?.location}
          </div>
          <div className="event-time">Time: {eventDetail?.time}</div>
          <div className="event-date">Time: {eventDetail?.date}</div>
          <div className="event-fee">Fee: {eventDetail?.fee}</div>
          <div className="event-length">Length: {eventDetail?.length}</div>
          <div className="event-teacher">Guided By: {teacher?.name}</div>
        </div>
        <div className="objective-info">
          <div className="event-objective">
            Objective: {eventDetail?.objective}
          </div>
        </div>
        <div className="teacher-info">
          <div className="event-teacher-about">
            About The Teacher: {teacher?.about}
          </div>
        </div>
        <div className="footer-info">
          <div className="event-bring">
            What to bring: {eventDetail?.toBring}
          </div>
          <div className="event-included">
            What's included: {eventDetail?.isIncluded}
          </div>
          {!currentUser?.isStaff && (
            <button className="sign-up-button" onClick={handleSignUp}>
              Sign Up
            </button>
          )}
        </div>
      </div>
    </>
  );
};
