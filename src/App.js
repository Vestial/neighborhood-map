import React, { Component } from "react";
import "./App.css";
import SushiMap from "./components/SushiMap";
import SushiList from "./components/SushiList";
import Filter from "./components/Filter";
import sortBy from "sort-by";
import escapeRegExp from "escape-string-regexp";

import IconButton from '@material-ui/core/IconButton';
import "bulma/css/bulma.css";
import "font-awesome/css/font-awesome.min.css"

class App extends Component {
  markers = [];

  state = {
    center: { lat: 52.3774769, lng: 9.7407584 },
    zoom: 14,

    activeMarker: {},
    selectedPlace: {},
    showingInfoWindow: false,

    sushiList: [],
    foundSushis: [],
    toggled: true
  };

  componentDidMount() {
    this.getSushiList();
  }

  getSushiList() {
    fetch(
      "https://api.foursquare.com/v2/venues/search?near=Hanover&query=sushi&category=4bf58dd8d48988d111941735&limit=100&radius=6000&intent=browse&client_id=QEALSM14NUIOQ3IYJR5GOA3BVXC1LEODK3DK2RIEXFWILEEX&client_secret=NHD5ISSOZSKMGBOMAQN1024SR4HW4AGADQ4KVIJARTJVHBPV&v=20180101&locale=en"
    )
      .then(res => res.json())
      .then(data => {
        const sushiList = data.response.venues;
        if (sushiList.length === 0) {
          window.alert("No places found. Please try to refresh the page.");
        }
        sushiList.sort(sortBy("name"));
        sushiList.forEach(sushi => {
          if (!sushi.location.address) {
            sushi.location.address = "No address available";
            sushi.location.formattedAddress.unshift("No address available");
          }
        });
        const foundSushis = sushiList;
        this.setState({ sushiList, foundSushis });
        console.log(sushiList);
      });
  }

  onMarkerCreated = marker => {
    if (marker !== null) {
      this.markers.push(marker);
    }
  };

  selectSushi = sushi => {
    for (const createdMarker of this.markers) {
      if (createdMarker.props.id === sushi.id) {
        new createdMarker.props.google.maps.event.trigger(
          createdMarker.marker,
          "click"
        );
      }
    }
    if (window.screen.width < 600) {
      this.setState({ toggled: false });
    }
    this.zoomPlace(sushi.location.lat, sushi.location.lng);
  };
  clickMarker = (props, marker) => {
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
    this.zoomPlace(props.position.lat, props.position.lng);
  };

  zoomPlace = (focusLat, focusLng) => {
    let center = { lat: focusLat + 0.002, lng: focusLng };
    let zoom = 15;
    this.setState({ center, zoom });
  };

  getCenterAndZoom() {
    let objectsBounds = new window.google.maps.LatLngBounds();
    let cenLat;
    let cenLng;
    let center;
    let zoom;
    if (this.state.foundSushis.length === 1) {
      cenLat = this.state.foundSushis[0].location.lat;
      cenLng = this.state.foundSushis[0].location.lng;
      center = { lat: cenLat, lng: cenLng };
      zoom = 15;
    } else if (this.state.foundSushis.length === 0) {
      center = { lat: 52.3774769, lng: 9.7407584 };
      zoom = 12;
    } else {
      Object.values(this.state.foundSushis).map(marker => {
        let lat = parseFloat(marker.location.lat);
        let long = parseFloat(marker.location.lng);
        let point = new window.google.maps.LatLng(lat, long);
        objectsBounds.extend(point);
        return objectsBounds;
      });
      cenLat = (objectsBounds.f.b + objectsBounds.f.f) / 2;
      cenLng = (objectsBounds.b.b + objectsBounds.b.f) / 2;
      center = { lat: cenLat, lng: cenLng };
      zoom = 14;
    }
    this.setState({ center, zoom });
  }

  searchSushis = query => {
    const { sushiList } = this.state;

    let foundSushis;
    if (query) {
      const match = new RegExp(escapeRegExp(query), "i");
      foundSushis = sushiList.filter(sushi => match.test(sushi.name));
    } else {
      foundSushis = sushiList;
    }
    this.setState({ foundSushis, query }, () => this.getCenterAndZoom());
  };

  toggleSidebar = () => {
    if (this.state.toggled === true) {
      this.setState({ toggled: false })
    } else {
      this.setState({ toggled: true })
    }
  }

  render() {
    return (
      <div className="App">
        <nav className="navbar is-info header">
          <div className="navbar-brand has-text-centered">
            <IconButton className="navbar-item icon-button" onClick={this.toggleSidebar} aria-label="menu" aria-expanded="false">
              <i className="fa fa-bars" />
            </IconButton>
            <h1 className="navbar-item is-size-2">Sushi Finder</h1>
          </div>
        </nav>
        <main className="main-map">
          <aside className= {this.state.toggled === true ? 'sidebar' : 'sidebar toggle' }>
            <Filter onQuery={this.state.query} onSearch={this.searchSushis} />
            <SushiList
              sushis={this.state.foundSushis}
              sushiClick={this.selectSushi}
            />
          </aside>
          <section className="map-container">
            <SushiMap
              center={this.state.center}
              zoom={this.state.zoom}
              sushis={this.state.foundSushis}
              selectedPlace={this.state.selectedPlace}
              onMarker={this.state.activeMarker}
              onVisible={this.state.showingInfoWindow}
              onToggle={this.toggleAside}
              onMarkerCreated={this.onMarkerCreated}
              onMarkerClick={this.clickMarker}
              onInfoWindowClose={this.closeInfoWindow}
              onMapClicked={this.clickMap}
              onFocus={this.zoomPlace}
              onDezoom={this.getFar}
            />
          </section>
        </main>
      </div>
    );
  }
}

export default App;
