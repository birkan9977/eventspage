import * as actions from "./reducerActions";
import { InitialFilters } from "../app/context";

const reducer = (state, action) => {
  const { payload } = action;
  switch (action.type) {
    case actions.changeFilter:
      return ChangeFilter(state, payload);

    case actions.defaultFilter:
      return resetFilters();

    default:
      return state;
  }
};

export function resetFilters() {
  sessionStorage.clear();
  return InitialFilters;
}

export function ChangeFilter(state, payload) {
  let newState = {
    ...state,
    [payload.filterName]: Number(payload.filterValue),
  };

  return newState;
}

export default reducer;
