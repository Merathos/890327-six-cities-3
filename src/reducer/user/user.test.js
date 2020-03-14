import {reducer, ActionCreator, ActionType, AuthorizationStatus} from "./user";


it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
    user: {}
  });
});

it(`Reducer should change authorizationStatus by a given value`, () => {
  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.AUTH,
  });

  expect(reducer({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
  }, {
    type: ActionType.REQUIRED_AUTHORIZATION,
    payload: AuthorizationStatus.NO_AUTH,
  })).toEqual({
    authorizationStatus: AuthorizationStatus.NO_AUTH,
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
    expect(ActionCreator.requireAuthorization(AuthorizationStatus.NO_AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.NO_AUTH,
    });

    expect(ActionCreator.requireAuthorization(AuthorizationStatus.AUTH)).toEqual({
      type: ActionType.REQUIRED_AUTHORIZATION,
      payload: AuthorizationStatus.AUTH,
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
