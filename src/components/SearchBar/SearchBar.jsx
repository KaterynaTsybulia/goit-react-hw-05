import { useState } from "react";
import toast from "react-hot-toast";

export default function SearchBar({ handleSubmit }) {
  const [query, setQuery] = useState("");

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const onSubmit = (evt) => {
    evt.preventDefault();
    if (query.trim() === "") {
      toast.error("Please enter your query");
      return;
    }
    handleSubmit(query);
    setQuery("");
  };

  return (
    <>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          value={query}
          onChange={handleChange}
          placeholder="Enter the movie title"
        />
        <button type="submit">Search</button>
      </form>
    </>
  );
}
