import { useContext, useEffect } from "react";
import AppContext from "../app/context";
import { changeFilter, defaultFilter } from "../store/reducerActions";

const sortBy = [
  {
    visibleName: "Date",
    value: "date",
  },
  {
    visibleName: "Id",
    value: "id",
  },
];

const sortDirection = [
  {
    visibleName: "Descending",
    value: "descending",
  },
  {
    visibleName: "Ascending",
    value: "ascending",
  },
];

const Filters = () => {
  const { filters, dispatch } = useContext(AppContext);

  //restore option menus to their initial values after global reset
  const handleMenu = (filterValues) => {
    document.getElementById("column-filter").value = filterValues.sortBy;
    document.getElementById("sort-direction-filter").value =
      filterValues.sortDirection;
  };

  useEffect(() => {
    handleMenu(filters);
  }, [filters]);

  const sendtoReducer = (filterName, filterValue) => {
    const action = {
      type: changeFilter,
      payload: {
        filterName: filterName,
        filterValue: filterValue,
      },
    };
    dispatch(action);
  };

  const resetFilters = () => {
    const action = {
      type: defaultFilter,
    };
    dispatch(action);
  };
  return (
    <div className="filters">
      <select
        className="filter-bars"
        id="column-filter"
        defaultValue={filters.sortBy}
        onChange={(e) => sendtoReducer("sortBy", e.target.value)}
      >
        {sortBy.sort().map((item, index) => (
          <option key={`sortBy-${index}`} value={item.value}>
            {item.visibleName}
          </option>
        ))}
      </select>
      <select
        className="filter-bars"
        id="sort-direction-filter"
        defaultValue={filters.sortDirection}
        onChange={(e) => sendtoReducer("sortDirection", e.target.value)}
      >
        {sortDirection.sort().map((item, index) => (
          <option key={`sortDirection-${index}`} value={item.value}>
            {item.visibleName}
          </option>
        ))}
      </select>
      <button className="filter-bars" onClick={() => resetFilters()}>
        Reset Filters
      </button>
    </div>
  );
};

export default Filters;
