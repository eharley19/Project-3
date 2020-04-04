import React from "react";
import "./style.css";

function SearchForm({ q, handleInputChange, handleFormSubmit }) {
  return (
    <form className="form-inline">
      <div className="form-group mx-sm-3">
        <label htmlFor="Title" className="sr-only">
          Search Job Title
        </label>
        <input
          className="form-control heading-subtitle"
          id="Title"
          type="text"
          value={q}
          placeholder="Job Title..."
          name="q"
          onChange={handleInputChange}
          size="55"
          required
        />
      </div>
      <button
        onClick={handleFormSubmit}
        type="submit"
        className="btn btn-lg search-button heading-subtitle"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;