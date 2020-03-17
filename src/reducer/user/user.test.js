import {reducer, ActionCreator, ActionType} from "./user";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    isAuthorized: false,
    user: {}
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    isAuthorized: false,
  }, {
    type: ActionType.CHECK_AUTH,
    payload: true,
  })).toEqual({
    isAuthorized: true,
  });

  expect(reducer({
    isAuthorized: true,
  }, {
    type: ActionType.CHECK_AUTH,
    payload: false,
  })).toEqual({
    isAuthorized: false,
  });

  expect(reducer({
    isAuthorized: true
  }, {
    type: ActionType.CHECK_AUTH,
    payload: true,
  })).toEqual({
    isAuthorized: true,
  });

  expect(reducer({
    isAuthorized: false,
  }, {
    type: ActionType.CHECK_AUTH,
    payload: false,
  })).toEqual({
    isAuthorized: false,
  });
});

it(`Reducer should change user by a given value`, () => {
  expect(reducer({
    user: {},
  }, {
    type: ActionType.SET_USER,
    payload: {
      id: 1,
      email: `sadgsadfa@gmail.com`,
      name: `dfgsadff`,
      avatarUrl: `/static/avatar/9.jpg`,
      isPro: false
    },
  })).toEqual({
    user: {
      id: 1,
      email: `sadgsadfa@gmail.com`,
      name: `dfgsadff`,
      avatarUrl: `/static/avatar/9.jpg`,
      isPro: false
    },
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for require authorization returns correct action`, () => {
    expect(ActionCreator.checkAuthorization(false)).toEqual({
      type: ActionType.CHECK_AUTH,
      payload: false,
    });

    expect(ActionCreator.checkAuthorization(true)).toEqual({
      type: ActionType.CHECK_AUTH,
      payload: true,
    });
  });

  it(`Action creator for set user returns correct action`, () => {
    expect(ActionCreator.setUser({
      id: 1,
      email: `sadgsadfa@gmail.com`,
      name: `dfgsadff`,
      avatarUrl: `/static/avatar/9.jpg`,
      isPro: false
    })).toEqual({
      type: ActionType.SET_USER,
      payload: {
        id: 1,
        email: `sadgsadfa@gmail.com`,
        name: `dfgsadff`,
        avatarUrl: `/static/avatar/9.jpg`,
        isPro: false
      },
    });
  });
});
