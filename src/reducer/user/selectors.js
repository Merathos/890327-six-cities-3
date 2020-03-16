import NameSpace from "../name-space";

export const getAuthStatus = (state) => {
  return state[NameSpace.USER].isAuthorized;
};

export const getUser = (state) => {
  return state[NameSpace.USER].user;
};
