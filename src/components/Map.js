import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Map, GoogleApiWrapper } from 'google-maps-react';

export class MyMap extends Component {


  render() {
    return (
      <section className='map' tabIndex='0'>
        <Map
          google={this.props.google}
          onClick={this.props.onMapClicked}
          initialCenter={ this.props.center }
          initialZoom={ this.props.zoom }
          center={ this.props.center }
          zoom={ this.props.zoom }
          aria
        >
        </Map>
      </section>
    );
  }
}

MyMap.propTypes = {
  google: PropTypes.object.isRequired,
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
}

export default GoogleApiWrapper({
  apiKey: 'AIzaSyDzLarewcl1NBAfRVykLSGnsNNFAoZoD-4'
})(MyMap)
