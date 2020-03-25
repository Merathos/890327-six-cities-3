import * as React from "react";
import {connect} from "react-redux";
import {ActionCreator} from "../../reducer/application/application";
import {getSortType} from "../../reducer/data/selectors";

const SORT_TYPES = [
  `Popular`,
  `Price: low to high`,
  `Price: high to low`,
  `Top rated first`
];

interface Props {
  currentSortType: string;
  isActive: boolean;
  onSortClick: () => void;
  onSortTypeClick: (sortType: string) => void;
}

const SortingOptions: React.FC<Props> = ({currentSortType, onSortClick, isActive, onSortTypeClick}) => {
  return (
    <form className="places__sorting" action="#" method="get">
      <span className="places__sorting-caption">Sort by </span>
      <span className="places__sorting-type" tabIndex={0} onClick={onSortClick}>
        {currentSortType}
        <svg className="places__sorting-arrow" width="7" height="4">
          <use xlinkHref="#icon-arrow-select"/>
        </svg>
      </span>
      <ul className={`places__options places__options--custom ${isActive ? `places__options--opened` : ``}`}>
        {SORT_TYPES.map((sortType, index) => {
          const sortTypeClass = currentSortType === sortType ? `places__option places__option--active` : `places__option`;
          return (
            <li key={sortType + index} className={sortTypeClass} tabIndex={0} onClick={() => {
              onSortTypeClick(sortType);
              onSortClick();
            }}>{sortType}</li>
          );
        })}
      </ul>
    </form>
  );
};

const mapStateToProps = (state) => ({
  currentSortType: getSortType(state)
});

const mapDispatchToProps = {
  onSortTypeClick: ActionCreator.changeSortType
};

export {SortingOptions};
export default connect(mapStateToProps, mapDispatchToProps)(SortingOptions);
