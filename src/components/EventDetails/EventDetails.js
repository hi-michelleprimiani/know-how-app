import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { getEventsById, getUsers } from "../../services/CalendarService";
import "./EventDetails.css";

export const EventDetails = () => {
  const [eventDetail, setEventDetail] = useState();
  const [users, setUsers] = useState({});
  const [teacher, setTeacher] = useState(null);
  const { eventId } = useParams({});

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

  return (
    <>
      <div className="event-details-container">
        <div className="primary-info">
          <h1 className="event-name">{eventDetail?.className}</h1>
          <div className="event-tagline">{eventDetail?.tagline}</div>
          <img
            src={eventDetail?.primaryImgUrl}
            alt={eventDetail?.className}
            className="event-primary-img"
          />
        </div>
        <div className="secondary-info">
          <div className="event-location">{eventDetail?.location}</div>
          <div className="event-time">{eventDetail?.time}</div>
          <div className="event-fee">${eventDetail?.fee}</div>
          <div className="event-length">{eventDetail?.length}</div>
          <div className="event-teacher">{teacher?.name}</div>
        </div>
        <div className="objective-info">
          <div className="event-objective">{eventDetail?.objective}</div>
        </div>
      </div>
    </>
  );
};
