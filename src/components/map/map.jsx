import React from "react";
import PropTypes from "prop-types";
import leaflet from "leaflet";
import {connect} from "react-redux";

class Map extends React.Component {
  constructor(props) {
    super(props);
    this._ref = React.createRef();
  }

  componentDidMount() {
    this._initCity();
  }

  componentDidUpdate() {
    this._markersLayer.clearLayers();
    this.map.setView(this.props.city.coords, this.props.city.zoom);
    this._addMarkers();
  }

  _getIcon() {
    return leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40],
    });
  }

  _getActiveIcon() {
    return leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40],
    });
  }

  _initCity() {
    const {city} = this.props;

    this.map = leaflet.map(this._ref.current, {
      center: city.coords,
      zoom: city.zoom,
      zoomControl: false,
      marker: true
    });

    this.map.setView(city.coords, city.zoom);
    leaflet.tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
      attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
    }).addTo(this.map);

    this._addMarkers();
  }

  _addMarkers() {
    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40]
    });

    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40]
    });

    const {offersCoords, hoveredCard} = this.props;
    this._markersLayer = leaflet.layerGroup().addTo(this.map);

    offersCoords.map((coords) => {
      leaflet
        .marker(coords, coords === hoveredCard.coords ? {activeIcon} : {icon})
        .addTo(this._markersLayer);
    });
  }


  render() {
    return (
      <div id="map" ref={this._ref} style={{width: `100%`, height: `100%`}}></div>
    );
  }
}

Map.propTypes = {
  city: PropTypes.shape({
    name: PropTypes.string.isRequired,
    coords: PropTypes.array.isRequired,
    zoom: PropTypes.number.isRequired
  }),
  offersCoords: PropTypes.array.isRequired,
  hoveredCard: PropTypes.object
};

const mapStateToProps = (state) => ({
  hoveredCard: state.hoveredCard
});

export {Map};
export default connect(mapStateToProps)(Map);
