import "./EventDetails-Secondary.css";

export const EventDetailsSecondary = ({ eventDetail, teacher }) => {
  return (
    <>
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
    </>
  );
};
