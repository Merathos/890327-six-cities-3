import * as React from "react";
import {Route, Redirect, RouteProps} from "react-router-dom";

const PrivateRoute: React.FC<{component: React.ComponentType; path: string; redirectTo: string; requireAuth: boolean} & RouteProps> = ({component: Component, redirectTo, requireAuth}) =>
  <Route render={(props) => (
    requireAuth ? <Component {...props}/> : <Redirect to={redirectTo}/>
  )}/>;

export default PrivateRoute;
