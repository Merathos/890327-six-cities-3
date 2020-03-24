import * as React from "react";
import {Subtract} from "utility-types";

interface S {
  isActive: boolean;
}

interface InjectingProps {
  isActive: boolean;
  handleClick: () => void;
}

const withActiveItem = (Component) => {
  type P = React.ComponentProps<typeof Component>;
  type T = Subtract<P, InjectingProps>;

  return class WithActiveItemComponent extends React.PureComponent<T, S> {
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
  };
};

export default withActiveItem;
