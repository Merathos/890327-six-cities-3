import React from 'react';
import PropTypes from 'prop-types';
import {Route, Redirect} from 'react-router-dom';

const PrivateRoute = ({component: Component, redirectTo, requireAuth}) =>
  <Route render={(props) => (
    requireAuth ? <Component {...props}/> : <Redirect to={redirectTo}/>
  )}/>;

PrivateRoute.propTypes = {
  component: PropTypes.oneOfType([
    PropTypes.func,
    PropTypes.object
  ]),
  redirectTo: PropTypes.string,
  requireAuth: PropTypes.bool
};

export default PrivateRoute;
