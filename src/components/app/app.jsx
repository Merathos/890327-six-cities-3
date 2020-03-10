import React from "react";
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
    const {activeCard} = this.state;

    if (activeCard === null) {
      return (
        <div className="page page--gray page--main">
          <Main handleRentHeaderClick = {this._setActiveCard} />
        </div>
      );
    } else {
      return (
        <PlaceDetails
          rentOffer = {this.state.activeCard}
          handleRentHeaderClick = {this._setActiveCard}
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

export default App;
