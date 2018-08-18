import React from 'react';
import PropTypes from 'prop-types';

import "bulma/css/bulma.css";

function SushiList(props) {

  const style = {
    fontWeight: '400'
  }

  // Map over foundGrills array to create list elements
  return(
    <div className="sushi-container">
      <ul className="sushi-list">
        {props.sushis.map((sushi) => (
          <li key={sushi.id}>
            <button
              aria-label={ sushi.name }
              id={ sushi.id }
              className='button is-primary has-background-grey is-fullwidth'
              onClick={() => props.sushiClick(sushi)}
              style={ style }>
                {sushi.name}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )

}

SushiList.propTypes = {
  sushis: PropTypes.array.isRequired,
  sushiClick: PropTypes.func.isRequired
}

export default SushiList
