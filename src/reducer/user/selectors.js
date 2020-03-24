import NameSpace from "../name-space";

export const getAuthStatus = (state) => {
  return state[NameSpace.USER].isAuthorized;
};

export const getUser = (state) => {
  return state[NameSpace.USER].user;
};

export const getAuthRequestStatus = (state) => {
  return state[NameSpace.USER].authRequestStatus;
};
