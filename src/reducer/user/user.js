const initialState = {
  isAuthorized: false,
  user: {}
};

const ActionType = {
  CHECK_AUTH: `CHECK_AUTH`,
  SET_USER: `SET_USER`
};

const ActionCreator = {
  checkAuthorization: (status) => ({
    type: ActionType.CHECK_AUTH,
    payload: status
  }),
  setUser: (userInfo) => ({
    type: ActionType.SET_USER,
    payload: userInfo
  })
};

const Operation = {
  checkAuth: () => (dispatch, getState, api) => {
    return api.get(`/login`)
      .then((response) => {
        dispatch(ActionCreator.checkAuthorization(true));
        dispatch(ActionCreator.setUser(response.data));
      })
      .catch((err) => {
        throw err;
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
  }

  return state;
};

export {reducer, Operation, ActionType, ActionCreator};
