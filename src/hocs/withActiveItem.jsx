import React from "react";

const withActiveItem = (Component) => {
  class withActiveItemComponent extends React.PureComponent {
    constructor(props) {
      super(props);

      this.handleClick = this.handleClick.bind(this);

      this.state = {
        isActive: false
      };
    }

    handleClick() {
      this.setState((prevState) => ({
        isActive: !prevState.isActive
      }));
    }

    render() {
      const {isActive} = this.state;
      return (
        <Component {...this.props} isActive = {isActive} handleClick = {this.handleClick}/>
      );
    }
  }

  withActiveItemComponent.propTypes = {};

  return withActiveItemComponent;
};

export default withActiveItem;
