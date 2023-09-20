import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getEventsById, getUsers } from "../../services/APIService";
import "./EventDetails.css";
import { EventDetailsPrimary } from "./EventDetails-Primary";
import { EventDetailsSecondary } from "./EventDetails-Secondary";
import { EventDetailsObjective } from "./EventDetails-Objective";

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

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleSignUp = () => {
    const newRegistration = {
      eventId: eventDetail.id,
      userId: currentUser.id,
    };
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
      });
  };

  return (
    <>
      <div className="event-details-container">
        <div className="back-button-container">
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
        </div>
        <EventDetailsPrimary eventDetail={eventDetail} />
        <EventDetailsSecondary eventDetail={eventDetail} teacher={teacher} />
        <EventDetailsObjective eventDetail={eventDetail} teacher={teacher} />
        {!currentUser?.isStaff && (
          <button className="sign-up-button" onClick={handleSignUp}>
            Sign Up!
          </button>
        )}
      </div>
    </>
  );
};
