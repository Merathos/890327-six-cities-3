import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/data/data";
import {getCities, getCurrentCity} from "../../reducer/data/selectors";
import {City} from "../../interfaces";

interface Props {
  currentCity: City;
  cities: City[];
  onCityClick: (city: City) => void;
}

const CitiesList: React.FC<Props> = ({onCityClick, currentCity, cities}) => {
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

const mapStateToProps = (state) => ({
  cities: getCities(state),
  currentCity: getCurrentCity(state)
});

const mapDispatchToProps = {
  onCityClick: ActionCreator.changeCity
};

export {CitiesList};
export default connect(mapStateToProps, mapDispatchToProps)(CitiesList);
