import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleRight } from "@fortawesome/free-solid-svg-icons";
import { faCircleLeft } from "@fortawesome/free-solid-svg-icons";

export const CalendarLeftAndRightBtn = ({
  handleNextClick,
  handlePrevClick,
}) => {
  return (
    <>
      <div className="btn prev" onClick={handlePrevClick}>
        <FontAwesomeIcon icon={faCircleLeft} />
      </div>
      <div className="btn next" onClick={handleNextClick}>
        <FontAwesomeIcon icon={faCircleRight} />
      </div>
    </>
  );
};
