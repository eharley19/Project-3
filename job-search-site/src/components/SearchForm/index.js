import React from "react";
import "./style.css";

function SearchForm({
  handleInputChangeLocation,
  where,
  what,
  handleInputChangeJob,
  handleFormSubmit,
}) {
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
          value={what}
          placeholder="Job Title..."
          name="what"
          onChange={handleInputChangeJob}
          size="55"
          required
        />
      </div>
      <div className="form-group mx-sm-3">
        <label htmlFor="Location" className="sr-only">
          Search Location
        </label>
        <input
          className="form-control heading-subtitle"
          id="Location"
          type="text"
          value={where}
          placeholder="Location..."
          name="where"
          onChange={handleInputChangeLocation}
          size="55"
          required
        />
      </div>

      <button
        onClick={handleFormSubmit}
        type="submit"
        className="mx-sm-3 btn- btn-lg search-button heading-subtitle"
        style={{ width: 150, marginTop: 15 }}
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
