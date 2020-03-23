import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./components/app/app";
import {Provider} from "react-redux";
import {createStore, applyMiddleware, compose} from "redux";
import {createApi} from "./api/api";
import thunk from "redux-thunk";
import reducer from "./reducer/reducer";
import {Operation as DataOperation} from "./reducer/data/data";
import {Operation as UserOperation, ActionCreator} from "./reducer/user/user";

const onUnauthorized = () => {
  store.dispatch(ActionCreator.checkAuthorization(false));
};

const api = createApi(onUnauthorized);

const store = createStore(reducer, compose(applyMiddleware(thunk.withExtraArgument(api))));

store.dispatch(DataOperation.loadOffers());
store.dispatch(UserOperation.checkAuth());
store.dispatch(DataOperation.loadBookmarkedOffers());

ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.querySelector(`#root`)
);
