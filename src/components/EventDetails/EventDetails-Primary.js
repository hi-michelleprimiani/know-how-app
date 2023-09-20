import "./EventDetails-Primary.css";

export const EventDetailsPrimary = ({ eventDetail }) => {
  return (
    <>
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
    </>
  );
};
