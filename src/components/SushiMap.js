import React, { Component } from "react";
import PropTypes from "prop-types";
import { Map, GoogleApiWrapper, Marker, InfoWindow } from "google-maps-react";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import MapStyles from "./MapStyles.json"; 
import Button from "@material-ui/core/Button";
import sushi from "../assets/sushi.png";

export class SushiMap extends Component {

  render() {
    return (
      <section className="map">
        <Map
          google={this.props.google}
          onClick={this.props.onMapClicked}
          zoom={this.props.zoom}
          center={this.props.center}
          initialCenter={this.props.center}
          initialZoom={this.props.zoom}
          styles={MapStyles}
        >
          {this.props.sushis.map(sushi => (
            <Marker
              id={sushi.id}
              key={sushi.id}
              name={sushi.name}
              onClick={(props, marker) =>
                this.props.onMarkerClick(props, marker)
              }
              street={sushi.location.formattedAddress[0]}
              city={sushi.location.formattedAddress[1]}
              position={{ lat: sushi.location.lat, lng: sushi.location.lng }}
              ref={this.props.onMarkerCreated}
              animation={
                this.props.selectedPlace.name === sushi.name &&
                this.props.google.maps.Animation.BOUNCE
              }
            />
          ))}

          <InfoWindow
            marker={this.props.onMarker}
            onClose={this.props.onInfoWindowClose}
            visible={this.props.onVisible}
          >
            <Card style={{ maxWidth: "250px" }}>
              <CardContent style={{ padding: "0" }}>
                <Typography
                  variant="title"
                  component="h4"
                  style={{ maxWidth: "200px" }}
                >
                  {this.props.selectedPlace.name}
                </Typography>
                <img
                  src={sushi}
                  style={{ maxWidth: "40px", margin: "10px 0" }}
                  alt="Sushi logo"
                  className="logo"
                />
                <Typography component="p" style={{ maxWidth: "200px" }}>
                  {this.props.selectedPlace.street}
                  <br />
                  {this.props.selectedPlace.city}
                </Typography>
                <Button
                  size="small"
                  tabIndex="0"
                  role="button"
                  href={`https://de.foursquare.com/explore?mode=url&near=Hannover&nearGeoId=72057594040838767&q=${
                    this.props.selectedPlace.name
                  }`}
                  target="_blank"
                  style={{ margin: "10px 0" }}
                  variant="contained"
                  color="secondary"
                  disableFocusRipple={false}
                  disableRipple={false}
                >
                  more
                </Button>
              </CardContent>
            </Card>
          </InfoWindow>
        </Map>
      </section>
    );
  }
}

SushiMap.propTypes = {
  google: PropTypes.object.isRequired,
  onMarkerCreated: PropTypes.func.isRequired,
  onMarker: PropTypes.object,
  onVisible: PropTypes.bool.isRequired,
  center: PropTypes.object.isRequired,
  zoom: PropTypes.number.isRequired,
  sushis: PropTypes.array.isRequired,
  selectedPlace: PropTypes.object.isRequired
};

export default GoogleApiWrapper({
  apiKey: "AIzaSyDzLarewcl1NBAfRVykLSGnsNNFAoZoD-4"
})(SushiMap);