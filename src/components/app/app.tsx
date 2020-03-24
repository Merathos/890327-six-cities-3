import * as React from "react";
import {Router, Route, Switch} from "react-router-dom";
import history from "../../history";
import Main from "../main/main";
import PlaceDetails from "../place-details/place-details";
import Header from "../header/header";
import SignIn from "../sign-in/sign-in";
import {connect} from "react-redux";
import {getAuthStatus, getAuthRequestStatus} from "../../reducer/user/selectors";
import PrivateRoute from "../private-route/private-route";
import Favorites from "../favorites/favorites";

const App: React.FC<{isAuthorized: boolean; authRequestStatus: string}> = ({isAuthorized, authRequestStatus}) => {
  return (
    <Router history={history}>
      <Switch>
        <PrivateRoute path = "/login" component={SignIn} redirectTo = "/" requireAuth={!isAuthorized} authRequestStatus={authRequestStatus} />
        <PrivateRoute path = "/favorites" component={Favorites} redirectTo = "/login" requireAuth={isAuthorized} authRequestStatus={authRequestStatus} />
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

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
  authRequestStatus: getAuthRequestStatus(state)
});

export {App};
export default connect(mapStateToProps)(App);
