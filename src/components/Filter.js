import React from "react";
import PropTypes from "prop-types";

import "bulma/css/bulma.css";

function Filter(props) {
  return (
    <div className="filter-container">
      <input
        className="input"
        inputProps={{ "aria-label": "Search a sushi restaurant by name" }}
        type="text"
        placeholder="Find a restaurant"
        value={props.onQuery}
        onChange={event => props.onSearch(event.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  onQuery: PropTypes.string.isRequired,
  onSearch: PropTypes.func.isRequired
};

export default Filter;
