import { useState, useEffect } from "react";
import "./TeacherProfile.css";
import { useNavigate } from "react-router-dom";
import { deleteEvent } from "../../services/APIService";

export const TeacherProfile = ({ currentUser }) => {
  const [userData, setUserData] = useState();
  const [userEvents, setUserEvents] = useState([]);
  const navigate = useNavigate();

  const handleEdit = (eventId) => {
    navigate(`/edit-event/${eventId}`);
  };

  useEffect(() => {
    fetch("http://localhost:8088/users")
      .then((res) => res.json())
      .then((data) => setUserData(data));

    fetch("http://localhost:8088/events")
      .then((res) => res.json())
      .then((data) => setUserEvents(data));
  }, []);

  const matchingUser = userData?.find((user) => user.id === currentUser.id);

  const eventsTaughtByUser = userEvents?.filter(
    (event) => event.teacherId === currentUser.id
  );

  const handleDelete = (eventId) => {
    deleteEvent(eventId)
      .then(() => {
        const updatedEvents = userEvents.filter(
          (event) => event.id !== eventId
        );
        setUserEvents(updatedEvents);
      })
      .catch((error) => {
        console.error("There was a problem deleting the event:", error);
      });
  };

  return (
    <>
      <div className="profile-container">
        {matchingUser && (
          <div className="profile-about">
            <div className="name">{`You are ${matchingUser.name}`}</div>
            <div className="name">{`${matchingUser.about}`}</div>
            <img
              src={matchingUser.imgUrl}
              alt={matchingUser.name}
              className="profile-img"
            />
            <div className="profile-events"></div>
            {eventsTaughtByUser && eventsTaughtByUser.length > 0 ? (
              eventsTaughtByUser.map((event) => (
                <div key={event.id}>
                  {event.className}{" "}
                  <button
                    onClick={() => handleEdit(event.id)}
                    className="profile-edit-button"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="profile-delete-button"
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <div>You are not teaching any events yet.</div>
            )}
          </div>
        )}
      </div>
    </>
  );
};
