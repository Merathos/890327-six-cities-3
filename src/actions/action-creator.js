const ActionType = {
  CHANGE_CITY: `CHANGE_CITY`
};

const ActionCreator = {
  changeCity: (city) => ({
    type: ActionType.CHANGE_CITY,
    payload: city
  })
};

export {ActionCreator, ActionType};
