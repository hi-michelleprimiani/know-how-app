import { useEffect, useState } from "react";
import { getCategory } from "../../services/APIService";
import { getEvents } from "../../services/EventsService";

export const CategoryFilter = ({ selectedCategory, setSelectedCategory }) => {
  const [categories, setCategories] = useState([]);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    getCategory().then((catArray) => {
      setCategories(catArray);
    });

    getEvents().then((eventArr) => {
      setEvents(eventArr);
    });
  }, []);

  return (
    <>
      <select
        className="category-filter"
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="all">Choose A Category!</option>
        {categories.map((category) => (
          <option key={category.id} value={category.id}>
            {category.name}
          </option>
        ))}
      </select>
    </>
  );
};
