import { useEffect, useState } from "react";
import "./NewEventForm.css";
import { useNavigate } from "react-router-dom";
import { getCategory } from "../../services/APIService";

export const NewEventForm = ({ currentUser }) => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    className: "",
    teacherId: currentUser.id,
    categoryId: 0,
    location: "",
    time: "",
    date: "",
    fee: "",
    length: "",
    objective: "",
    tagline: "",
    isIncluded: "",
    toBring: "",
    primaryImgUrl: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    getCategory().then((catArray) => {
      setCategories(catArray);
    });
  }, []);

  const handleChange = (event) => {
    const itemCopy = { ...formData };
    itemCopy[event.target.name] = event.target.value;
    setFormData(itemCopy);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      formData.className &&
      formData.teacherId &&
      formData.location &&
      formData.time &&
      formData.date &&
      formData.fee &&
      formData.length &&
      formData.objective &&
      formData.tagline &&
      formData.isIncluded &&
      formData.toBring &&
      formData.primaryImgUrl
    ) {
      fetch("http://localhost:8088/events", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then(() => {
          return fetch("http://localhost:8088/events");
        })
        .then(() => {
          navigate("/profile");
        });
    } else {
      alert("Please fill out all items in the form.");
    }
  };

  return (
    <>
      <form className="form-container">
        <h1>Post A New Event!</h1>
        <div className="form">
          <input
            type="text"
            name="className"
            placeholder="Event Name"
            value={formData.className}
            onChange={handleChange}
          />
          <div>Category:</div>
          <select
            name="categoryId"
            onChange={handleChange}
            value={categories.categoryId}
            className="category-dropdown"
          >
            <option value={0}>Please select a category</option>
            {categories.map((catObj) => {
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
            value={formData.location}
            onChange={handleChange}
          />
          <input
            type="text"
            name="time"
            id="time"
            value={formData.time}
            onChange={handleChange}
            placeholder="Enter time (e.g. 3:00 PM)"
          />
          <input
            type="date"
            name="date"
            value={formData.date}
            onChange={handleChange}
            placeholder="MM-DD-YYYY"
          />
          <input
            type="text"
            name="fee"
            placeholder="Fee"
            value={formData.fee}
            onChange={handleChange}
          />
          <input
            type="text"
            name="length"
            placeholder="Length of class"
            value={formData.length}
            onChange={handleChange}
          />

          <input
            type="text"
            name="objective"
            placeholder="Objective"
            value={formData.objective}
            onChange={handleChange}
          />
          <input
            type="text"
            name="tagline"
            placeholder="Tagline"
            value={formData.tagline}
            onChange={handleChange}
          />
          <input
            type="text"
            name="isIncluded"
            placeholder="Items Included"
            value={formData.isIncluded}
            onChange={handleChange}
          />
          <input
            type="text"
            name="toBring"
            placeholder="What to Bring"
            value={formData.toBring}
            onChange={handleChange}
          />
          <input
            type="text"
            name="primaryImgUrl"
            placeholder="Image URL"
            value={formData.primaryImgUrl}
            onChange={handleChange}
          />
          <button className="post-btn" type="submit" onClick={handleSubmit}>
            Create Event
          </button>
        </div>
      </form>
    </>
  );
};
