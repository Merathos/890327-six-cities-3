import {ActionCreator, ActionType} from "./application.js";
import {reducer} from "./application.js";

it(`Reducer without additional parameters should return initial state`, () => {
  expect(reducer(void 0, {})).toEqual({
    currentSortType: `Popular`,
    hoveredCard: {}
  });
});

it(`Reducer should change sort type by a given value`, () => {
  expect(reducer({
    currentSortType: `Popular`,
    hoveredCard: {}
  }, {
    type: ActionType.CHANGE_SORT_TYPE,
    payload: `Price: low to high`,
  })).toEqual({
    currentSortType: `Price: low to high`,
    hoveredCard: {}
  });
});

it(`Reducer should change hovered card by a given value`, () => {
  expect(reducer({
    currentSortType: `Price: low to high`,
    hoveredCard: {}
  }, {
    type: ActionType.SET_HOVERED_CARD,
    payload: {
      coords: [123, 123]
    },
  })).toEqual({
    currentSortType: `Price: low to high`,
    hoveredCard: {coords: [123, 123]}
  });
});

it(`Reducer should remove hovered card`, () => {
  expect(reducer({
    currentSortType: `Price: low to high`,
    hoveredCard: {coords: [123, 123]}
  }, {
    type: ActionType.REMOVE_HOVERED_CARD,
    payload: {},
  })).toEqual({
    currentSortType: `Price: low to high`,
    hoveredCard: {}
  });
});

describe(`Action creators work correctly`, () => {
  it(`Action creator for sort change returns correct action`, () => {
    expect(ActionCreator.changeSortType(`Price: low to high`)).toEqual({
      type: ActionType.CHANGE_SORT_TYPE,
      payload: `Price: low to high`,
    });
  });
  it(`Action creator for setting hovered card returns correct action`, () => {
    expect(ActionCreator.setHoveredCard({coords: [123123, 123123]})).toEqual({
      type: ActionType.SET_HOVERED_CARD,
      payload: {coords: [123123, 123123]},
    });
  });
  it(`Action creator for removing hovered card returns correct action`, () => {
    expect(ActionCreator.removeHoveredCard()).toEqual({
      type: ActionType.REMOVE_HOVERED_CARD,
      payload: {},
    });
  });
});
