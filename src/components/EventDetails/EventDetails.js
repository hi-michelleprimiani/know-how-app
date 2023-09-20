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
            <div className="label">Location</div>
            <div className="info">{eventDetail?.location}</div>
          </div>
          <div className="event-time">
            <div className="label">Time</div>
            <div className="info">{eventDetail?.time}</div>
          </div>
          <div className="event-date">
            <div className="label">Date</div>
            <div className="info">{eventDetail?.date}</div>
          </div>
          <div className="event-fee">
            <div className="label">Fee</div>
            <div className="info">{eventDetail?.fee}</div>
          </div>
          <div className="event-length">
            <div className="label">Length</div>
            <div className="info">{eventDetail?.length}</div>
          </div>
          <div className="event-teacher">
            <div className="label">Guided By</div>
            <div className="info">{teacher?.name}</div>
          </div>
        </div>

        <div className="objective-info">
          <div className="event-objective">
            <div className="label">Objective</div>
            <div className="info">{eventDetail?.objective}</div>
          </div>
        </div>
        <div className="teacher-info">
          <div className="event-teacher-about">
            <div className="label">About The Teacher</div>
            <div className="teacher-name">{teacher?.name}</div>
            <img
              src={teacher?.imgUrl}
              alt={teacher?.name}
              className="event-teacher-img"
            />
            <div className="info">{teacher?.about}</div>
          </div>
        </div>
        <div className="footer-info">
          <div className="event-bring">
            <div className="label">What to bring</div>
            <div className="info">{eventDetail?.toBring}</div>
          </div>
          <div className="event-included">
            <div className="label">What's included</div>
            <div className="info">{eventDetail?.isIncluded}</div>
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
