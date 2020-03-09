import React from "react";
import {ActionCreator} from "../../actions/action-creator.js";
import {connect} from "react-redux";
import PropTypes from "prop-types";

const SORT_TYPES = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

const SortingOptions = ({currentSortType, handleClick, isActive, onSortTypeClick}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex="0" onClick={handleClick}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? `places__options--opened` : ``}`}>
        {SORT_TYPES.map((sortType, index) => {
          const sortTypeClass = currentSortType === sortType ? `places__option places__option--active` : `places__option`;
          return (
            <li key={sortType + index} className={sortTypeClass} tabIndex="0" onClick={() => {
              onSortTypeClick(sortType);
              handleClick();
            }}>{sortType}</li>
          );
        })}
      </ul>
    </form>
  );
};

SortingOptions.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired,
  handleClick: PropTypes.func,
  isActive: PropTypes.bool
};

const mapStateToProps = (state) => ({
  currentSortType: state.currentSortType
});

const mapDispatchToProps = {
  onSortTypeClick: ActionCreator.changeSortType
};

export {SortingOptions};
export default connect(mapStateToProps, mapDispatchToProps)(SortingOptions);
