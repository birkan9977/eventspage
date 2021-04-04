import { createContext } from "react";

export const InitialFilters = {
  sortBy: 0,
  sortDirection: -1,
};

export let LoadedFilters = {
  ...InitialFilters,
  sortBy: Number(sessionStorage.getItem("sortBy")) || InitialFilters.sortBy,
  sortDirection:
    Number(sessionStorage.getItem("sortDirection")) ||
    InitialFilters.sortDirection,
};

const AppContext = createContext(InitialFilters);

export const AppProvider = AppContext.Provider;

export default AppContext;
