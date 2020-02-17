import React from "react";
import PropTypes from "prop-types";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";

class App extends React.PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      activeCard: null
    };

    this._setActiveCard = this._setActiveCard.bind(this);
  }

  _setActiveCard(rentOffer) {
    this.setState({
      activeCard: rentOffer
    });
  }

  _renderApp() {
    const {offers} = this.props;
    const {activeCard} = this.state;

    if (activeCard === null) {
      return (
        <Main
          offers = {offers}
          handleRentHeaderClick = {this._setActiveCard}
        />
      );
    } else {
      return (
        <PlaceDetails
          rentOffer = {
            this.state.activeCard
          }
        />
      );
    }
  }

  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route exact path = "/">
            {
              this._renderApp()
            }
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  offers: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string,
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
      })
  ).isRequired
};

export default App;
