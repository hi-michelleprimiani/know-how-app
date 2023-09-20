import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getCategory } from "../../services/APIService";
import "./EditEventForm.css";

export const EditEventForm = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({});
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategory().then((catArray) => {
      setCategories(catArray);
    });
  }, []);

  useEffect(() => {
    fetch(`http://localhost:8088/events/${id}`)
      .then((res) => res.json())
      .then((data) => setEventData(data));
  }, [id]);

  const handleSubmit = (event) => {
    event.preventDefault();
    if (
      eventData.className &&
      eventData.teacherId &&
      eventData.location &&
      eventData.time &&
      eventData.date &&
      eventData.fee &&
      eventData.length &&
      eventData.objective &&
      eventData.tagline &&
      eventData.isIncluded &&
      eventData.toBring &&
      eventData.primaryImgUrl
    ) {
      fetch(`http://localhost:8088/events/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(eventData),
      })
        .then(() => {
          return fetch("http://localhost:8088/events");
        })
        .then(() => {
          navigate(`/events/${id}`);
        });
    } else {
      alert("Please fill out all items in the form.");
    }
  };

  const handleChange = (event) => {
    const itemCopy = { ...eventData };
    itemCopy[event.target.name] = event.target.value;
    setEventData(itemCopy);
  };

  return (
    <>
      <form className="form-container">
        <div className="edit-name">Edit Your Event</div>
        <div className="form">
          <input
            type="text"
            name="className"
            placeholder="Event Name"
            value={eventData.className ? eventData.className : ""}
            onChange={handleChange}
          />
          <div className="edit-category">Category:</div>
          <select
            name="categoryId"
            className="edit-category-select"
            onChange={(e) => {
              const itemCopy = { ...eventData };
              itemCopy[e.target.name] = parseInt(e.target.value);
              setEventData(itemCopy);
            }}
            value={eventData?.categoryId}
          >
            <option value={0}>Please select a category</option>
            {categories &&
              categories.map((catObj) => {
                return (
                  <option key={catObj.id} value={catObj.id}>
                    {catObj.name}
                  </option>
                );
              })}
          </select>
          <input
            type="text"
            name="location"
            placeholder="Location"
            value={eventData.location ? eventData.location : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="time"
            id="time"
            value={eventData.time ? eventData.time : ""}
            onChange={handleChange}
            placeholder="Enter time (e.g. 3:00 PM)"
          />
          <input
            type="text"
            name="date"
            value={eventData.date ? eventData.date : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="fee"
            placeholder="Fee"
            value={eventData.fee ? eventData.fee : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="length"
            placeholder="Length of class"
            value={eventData.length ? eventData.length : ""}
            onChange={handleChange}
          />

          <input
            type="text"
            name="objective"
            placeholder="Objective"
            value={eventData.objective ? eventData.objective : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tagline"
            placeholder="Tagline"
            value={eventData.tagline ? eventData.tagline : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="isIncluded"
            placeholder="Items Included"
            value={eventData.isIncluded ? eventData.isIncluded : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="toBring"
            placeholder="What to Bring"
            value={eventData.toBring ? eventData.toBring : ""}
            onChange={handleChange}
          />
          <input
            type="text"
            name="primaryImgUrl"
            placeholder="Image URL"
            value={eventData.primaryImgUrl ? eventData.primaryImgUrl : ""}
            onChange={handleChange}
          />
          <button className="post-btn" type="submit" onClick={handleSubmit}>
            Save Event
          </button>
        </div>
      </form>
    </>
  );
};
