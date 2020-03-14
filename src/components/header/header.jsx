import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAuthStatus, getUser} from "../../reducer/user/selectors.js";

const Header = ({authorizationStatus, user}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <a className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </a>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <a className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {authorizationStatus === `NO_AUTH` ? <span className="header__login">Sign in</span> :
                    <span className="header__user-name user__name">{user.email}</span>}
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  authorizationStatus: PropTypes.string,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  authorizationStatus: getAuthStatus(state),
  user: getUser(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
