import * as React from "react";
import {configure, mount} from "enzyme";
import * as Adapter from "enzyme-adapter-react-16";
import {BrowserRouter as Router} from "react-router-dom";
import {Provider} from "react-redux";
import configureStore from "redux-mock-store";
import SignIn from "../sign-in/sign-in";
import PrivateRoute from './private-route';

configure({adapter: new Adapter()});
const mockStore = configureStore([]);

it(`<PrivateRoute /> should not redirect`, () => {
  const store = mockStore({
    USER: {
      isAuthorized: false
    }
  });

  const tree = mount(
      <Provider store={store}>
        <Router>
          <PrivateRoute path={`/login`} component={SignIn} redirectTo={`/`} requireAuth={true} authRequestStatus={`SUCCESS`} />
        </Router>
      </Provider>);

  expect(tree.getDOMNode()).toMatchSnapshot();
});

it(`<PrivateRoute /> should redirect`, () => {
  const store = mockStore({
    USER: {
      isAuthorized: true
    }
  });

  const tree = mount(
      <Provider store={store}>
        <Router>
          <PrivateRoute path={`/login`} component={SignIn} redirectTo={`/`} requireAuth={false} authRequestStatus={`SUCCESS`} />
        </Router>
      </Provider>);

  expect(tree.getDOMNode()).toMatchSnapshot();
});
