import React from "react";
import PropTypes from "prop-types";

import "bulma/css/bulma.css";

//This function maps over foundSushi arrays and create list elements from that array
function SushiList(props) {
  const style = {
    fontWeight: "400"
  };
  return (
    <div className="sushi-container">
      <ul className="sushi-list">
        {props.sushis.map(sushi => (
          <li key={sushi.id}>
            <button
              aria-label={sushi.name}
              id={sushi.id}
              className="button is-primary has-background-grey is-fullwidth"
              onClick={() => props.sushiClick(sushi)}
              style={style}
            >
              {sushi.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

SushiList.propTypes = {
  sushis: PropTypes.array.isRequired,
  sushiClick: PropTypes.func.isRequired
};

export default SushiList;
