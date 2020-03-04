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

export class SortingOptions extends React.PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      isHovered: false
    };

    this.handleHover = this.handleHover.bind(this);
  }

  handleHover() {
    this.setState((prevState) => ({
      isHovered: !prevState.isHovered
    }));
  }

  render() {
    return (
      <form className="places__sorting" action="#" method="get">
        <span className="places__sorting-caption">Sort by </span>
        <span className="places__sorting-type" tabIndex="0" onClick={this.handleHover}>
          {this.props.currentSortType}
          <svg className="places__sorting-arrow" width="7" height="4">
            <use xlinkHref="#icon-arrow-select"/>
          </svg>
        </span>
        <ul className={`places__options places__options--custom ${this.state.isHovered ? `places__options--opened` : ``}`}>
          {SORT_TYPES.map((sortType, index) => {
            const sortTypeClass = this.props.currentSortType === sortType ? `places__option places__option--active` : `places__option`;
            return (
              <li key={sortType + index} className={sortTypeClass} tabIndex="0" onClick={() => {
                this.props.onSortTypeClick(sortType);
                this.handleHover();
              }}>{sortType}</li>
            );
          })}
        </ul>
      </form>
    );
  }
}

SortingOptions.propTypes = {
  currentSortType: PropTypes.string.isRequired,
  onSortTypeClick: PropTypes.func.isRequired
};

const mapStateToProps = (state) => ({
  currentSortType: state.currentSortType
});

const mapDispatchToProps = {
  onSortTypeClick: ActionCreator.changeSortType
};

export default connect(mapStateToProps, mapDispatchToProps)(SortingOptions);
