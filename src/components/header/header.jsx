import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {getAuthStatus, getUser} from "../../reducer/user/selectors.js";
import {Link} from 'react-router-dom';

const Header = ({isAuthorized, user}) => {
  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Link to="/" className="header__logo-link header__logo-link--active">
              <img className="header__logo" src="img/logo.svg" alt="6 cities logo" width="81" height="41" />
            </Link>
          </div>
          <nav className="header__nav">
            <ul className="header__nav-list">
              <li className="header__nav-item user">
                <Link to={isAuthorized ? `/favorites` : `/login`} className="header__nav-link header__nav-link--profile" href="#">
                  <div className="header__avatar-wrapper user__avatar-wrapper">
                  </div>
                  {isAuthorized ? <span className="header__user-name user__name">{user.email}</span> :
                    <span className="header__login">Sign in</span>}
                </Link>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  isAuthorized: PropTypes.bool,
  user: PropTypes.object
};

const mapStateToProps = (state) => ({
  isAuthorized: getAuthStatus(state),
  user: getUser(state)
});

export {Header};
export default connect(mapStateToProps)(Header);
