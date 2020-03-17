import React from "react";
import {Router, Route, Switch} from "react-router-dom";
import history from "../../history.js";
import Main from "../main/main.jsx";
import PlaceDetails from "../place-details/place-details.jsx";
import Header from "../header/header.jsx";
import SignIn from "../sign-in/sign-in.jsx";
import {connect} from "react-redux";
import {getAuthStatus} from "../../reducer/user/selectors.js";
import PropTypes from "prop-types";
import PrivateRoute from "../../components/private-route/private-route.jsx";
import Favorites from "../favorites/favorites.jsx";

const App = ({isAuthorized}) => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path = "/login" component={SignIn} redirectTo = "/" requireAuth={!isAuthorized}/>
        <PrivateRoute path = "/favorites" component={Favorites} redirectTo = "/login" requireAuth={isAuthorized}/>
        <Route exact path="/" render={(props) =>
          <div className="page page--gray page--main">
            <Header />
            <Main {...props} />
          </div>
        } />
        <Route exact path="/offer/:id" component={PlaceDetails}/>
      </Switch>
    </Router>
  );
};


App.propTypes = {
  isAuthorized: PropTypes.bool.isRequired
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state)
});

export {App};
export default connect(mapStateToProps)(App);
