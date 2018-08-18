import React from "react";
import PropTypes from "prop-types";

import "bulma/css/bulma.css";

function Filter(props) {
  return (
    <div className="filter-container">
      <input
        role="search"
        aria-label="search text"
        className="input"
        type="text"
        placeholder="Find a restaurant"
        value={props.onQuery}
        onChange={event => props.onSearch(event.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  onSearch: PropTypes.func.isRequired
};

export default Filter;
