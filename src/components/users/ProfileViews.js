import { useState, useEffect } from "react";
import "./ProfileViews.css";
import { deleteEvent } from "../../services/APIService";
import { TeacherProfileEvents } from "./TeacherProfileEvents";
import { StudentProfileEvents } from "./StudentProfileEvents";

export const TeacherProfile = ({ currentUser }) => {
  const [userData, setUserData] = useState();
  const [userEvents, setUserEvents] = useState([]);
  const [registrations, setRegistrations] = useState([]);

  useEffect(() => {
    fetch("http://localhost:8088/users")
      .then((res) => res.json())
      .then((data) => setUserData(data));

    fetch("http://localhost:8088/events")
      .then((res) => res.json())
      .then((data) => setUserEvents(data));

    fetch("http://localhost:8088/registrations?_expand=event&_expand=user")
      .then((res) => res.json())
      .then((data) => setRegistrations(data));
  }, [currentUser]);

  const matchingUser = userData?.find((user) => user.id === currentUser.id);

  const eventsTaughtByUser = userEvents?.filter(
    (event) => event.teacherId === currentUser.id
  );

  const handleDelete = (eventId) => {
    deleteEvent(eventId).then(() => {
      const updatedEvents = userEvents.filter((event) => event.id !== eventId);
      setUserEvents(updatedEvents);
    });
  };

  return (
    <>
      <div className="profile-container">
        {matchingUser && (
          <div className="profile-about">
            <div className="profile-text">
              <h1 className="profile-name">{`Hi! You are ${matchingUser.name}`}</h1>
              <div className="profile-aboutme">{`${matchingUser.about}`}</div>
            </div>
            <img
              src={matchingUser.imgUrl}
              alt={matchingUser.name}
              className="profile-img"
            />
          </div>
        )}
        {currentUser.isStaff ? (
          <div className="teacher-profile-events">
            <TeacherProfileEvents
              eventsTaughtByUser={eventsTaughtByUser}
              handleDelete={handleDelete}
            />
          </div>
        ) : (
          <div className="student-profile-events">
            <StudentProfileEvents
              userData={userData}
              currentUser={currentUser}
            />
          </div>
        )}
      </div>
    </>
  );
};
