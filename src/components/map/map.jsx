import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }

  componentDidMount() {
    this._renderMap();
  }

  componentDidUpdate() {
    this._renderMap();
  }

  _renderMap() {
    const {cityCoords, offers} = this.props;

    if (this.map) {
      this.map.remove();
      this.map = null;
    }

    if (offers.length === 0) {
      return;
    }

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40]
    });

    const zoom = 12;
    this.map = leaflet.map(this._ref.current, {
      center: cityCoords,
      zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView(cityCoords, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    if (offers.length) {
      offers.map((offer) => {
        leaflet
          .marker(offer.coords, {icon})
          .addTo(this.map);
      });
    }
  }

  render() {
    return (
      <div id="map" ref={this._ref} style={{width: `100%`, height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
        coords: PropTypes.array.isRequired,
        name: PropTypes.string,
        picture: PropTypes.string,
        photos: PropTypes.array.isRequired,
        bedroomsAmount: PropTypes.number.isRequired,
        maxAdults: PropTypes.number.isRequired,
        features: PropTypes.array.isRequired,
        type: PropTypes.string,
        rating: PropTypes.number,
        isBookmarked: PropTypes.bool,
        isPremium: PropTypes.bool,
        price: PropTypes.number,
        hostName: PropTypes.string.isRequired,
        hostAvatar: PropTypes.string.isRequired,
        hostStatus: PropTypes.string,
        description: PropTypes.string.isRequired
      })).isRequired,
  cityCoords: PropTypes.array.isRequired
};

export default Map;
