import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";

const PrivateRoute: React.FC<{component: React.ComponentType; redirectTo: string; requireAuth: boolean; authRequestStatus: string} & RouteProps> = ({component: Component, redirectTo, requireAuth, authRequestStatus}) =>
  <Route render={(props) => {
    if (authRequestStatus === `SUCCESS`) {
      return requireAuth ? <Component {...props}/> : <Redirect to={redirectTo}/>;
    }
    return null;
  }}/>;

export default PrivateRoute;
