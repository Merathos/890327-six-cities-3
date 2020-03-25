const initialState = {
  isAuthorized: false,
  user: {},
  authRequestStatus: ``
};

const ActionType = {
  CHECK_AUTH: `CHECK_AUTH`,
  SET_USER: `SET_USER`,
  SET_AUTH_REQUEST_STATUS: `SET_AUTH_REQUEST_STATUS`
};

const ActionCreator = {
  checkAuthorization: (status) => ({
    type: ActionType.CHECK_AUTH,
    payload: status
  }),
  setUser: (userInfo) => ({
    type: ActionType.SET_USER,
    payload: userInfo
  }),
  setAuthRequestStatus: (status) => ({
    type: ActionType.SET_AUTH_REQUEST_STATUS,
    payload: status
  })
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.checkAuthorization(true));
        dispatch(ActionCreator.setUser(response.data));
        dispatch(ActionCreator.setAuthRequestStatus(`SUCCESS`));
      })
      .catch(() => {
        dispatch(ActionCreator.setAuthRequestStatus(`SUCCESS`));
      });
  },

  login: (authData) => (dispatch, getState, api) => {
    return api.post(`/login`, {
      email: authData.login,
      password: authData.password,
    })
      .then((response) => {
        dispatch(ActionCreator.checkAuthorization(true));
        dispatch(ActionCreator.setUser(response.data));
      });
  },
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case ActionType.CHECK_AUTH:
      return {...state,
        isAuthorized: action.payload
      };
    case ActionType.SET_USER:
      return {...state,
        user: action.payload
      };
    case ActionType.SET_AUTH_REQUEST_STATUS:
      return {...state,
        authRequestStatus: action.payload
      };
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
