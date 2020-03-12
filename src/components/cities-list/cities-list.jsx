import React from "react";
import {connect} from "react-redux";
import PropTypes from "prop-types";
import {ActionCreator} from "../../reducer/application/application.js";


const CitiesList = ({onCityClick, currentCity, cities}) => {
  return (
    <section className="locations container">
      <ul className="locations__list tabs__list">
        {cities.slice(0, 6).map((city, index) => (
          <li key={city.name + index} className={`locations__item`} onClick={() => onCityClick(city)}>
            <a className={`locations__item-link tabs__item ${currentCity.name === city.name ? `tabs__item--active` : ``}`} href="#">
              <span>{city.name}</span>
            </a>
          </li>
        ))}
      </ul>
    </section>
  );
};

CitiesList.propTypes = {
  currentCity: PropTypes.object,
  onCityClick: PropTypes.func,
  cities: PropTypes.array
};

const mapStateToProps = (state) => ({
  cities: state.cities,
  currentCity: state.currentCity,
});

const mapDispatchToProps = {
  onCityClick: ActionCreator.changeCity
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
