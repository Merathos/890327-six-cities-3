import React from "react";
import {Switch, Route, BrowserRouter} from "react-router-dom";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import Header from "../header/header.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {Operation as UserOperation} from "../../reducer/user/user.js";
import PropTypes from "prop-types";

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
          <Header />
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
          <Route exact path = "/login">
            <div className="page page--gray page--login">
              <Header />
              <SignIn onSubmit={this.props.login}/>
            </div>
          </Route>
        </Switch>
      </BrowserRouter>
    );
  }
}

App.propTypes = {
  login: PropTypes.func.isRequired
};

const mapDispatchToProps = (dispatch) => ({
  login(authData) {
    dispatch(UserOperation.login(authData));
  }
});

export {App};
export default connect(null, mapDispatchToProps)(App);
