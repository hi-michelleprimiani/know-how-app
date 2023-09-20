import "./EventDetails-Objective.css";

export const EventDetailsObjective = ({ eventDetail, teacher }) => {
  return (
    <>
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
      </div>
    </>
  );
};
