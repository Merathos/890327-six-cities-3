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
    this._renderMap();
  }

  componentDidUpdate() {
    this._renderMap();
  }

  _renderMap() {
    const {city, offersCoords, hoveredCard} = this.props;

    if (!this.markers) {
      this.markers = [];
    }

    const icon = leaflet.icon({
      iconUrl: `img/pin.svg`,
      iconSize: [30, 40]
    });

    const activeIcon = leaflet.icon({
      iconUrl: `img/pin-active.svg`,
      iconSize: [30, 40]
    });

    const zoom = 12;

    if (!this.map) {
      this.map = leaflet.map(this._ref.current, {
        center: city.coords,
        zoom,
        zoomControl: false,
        marker: true
      });
    }

    this.map.setView(city.coords, zoom);

    leaflet
      .tileLayer(`https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png`, {
        attribution: `&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>`
      })
      .addTo(this.map);

    this.markers.forEach((marker)=> this.map.removeLayer(marker));

    this.markers = [];

    if (offersCoords.length) {
      offersCoords.map((coord)=>{
        const marker = leaflet
          .marker(coord, coord === hoveredCard.coords ? {activeIcon} : {icon})
          .addTo(this.map);
        this.markers.push(marker);
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
