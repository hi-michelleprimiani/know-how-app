import { useEffect, useState } from "react";
import { getCategory, getEvents } from "../../services/APIService";

export const CategoryFilter = () => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  useEffect(() => {
    getCategory().then((catArray) => {
      setCategories(catArray);
    });

    getEvents().then((eventArr) => {
      setEvents(eventArr);
    });
  }, []);

  const filteredEvents = selectedCategory
    ? events.filter((event) => event.categoryId === parseInt(selectedCategory))
    : events;

  return (
    <>
      <select onChange={(e) => setSelectedCategory(e.target.value)}>
        <option value="all">All Categories</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
      <ul>
        {filteredEvents.map((event) => (
          <li key={event.id}>{event.className}</li>
        ))}
      </ul>
    </>
  );
};
