import { createContext } from "react";

export const InitialFilters = {
  sortBy: "date",
  sortDirection: "descending",
};

export let LoadedFilters = {
  ...InitialFilters,
  sortBy: sessionStorage.getItem("sortBy") || InitialFilters.sortBy,
  sortDirection:
    sessionStorage.getItem("sortDirection") || InitialFilters.sortDirection,
};

LoadedFilters = {
  ...LoadedFilters,
};

const AppContext = createContext(LoadedFilters);

export const AppProvider = AppContext.Provider;

export default AppContext;
