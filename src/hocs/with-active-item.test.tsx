import * as React from "react";
import {configure, shallow} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import withActiveItem from "./with-active-item";

configure({adapter: new Adapter()});

interface P {
  isActive: boolean;
  handleClick: () => void;
}

const MockComponent: React.FC<P> = () => <div />;
const MockComponentWrapped = withActiveItem(MockComponent);

it(`Should toggle active state`, () => {
  const wrapper = shallow(<MockComponentWrapped />);

  expect(wrapper.props().isActive).toEqual(false);

  wrapper.props().handleClick();

  expect(wrapper.props().isActive).toEqual(true);
});
