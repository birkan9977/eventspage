import { useContext } from "react";
import AppContext from "../app/context";
import { changeFilter, defaultFilter } from "../store/reducerActions";

const sortDirection = [
  {
    name: "Azalan",
    value: -1,
  },
  {
    name: "Artan",
    value: 1,
  },
];

const Filters = ({ columnFilters }) => {
  const { filters, dispatch } = useContext(AppContext);

  const sendtoReducer = (filterName, filterValue) => {
    const action = {
      type: changeFilter,
      payload: {
        filterName: filterName,
        filterValue: Number(filterValue),
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
        onChange={(e) => sendtoReducer("sortBy", e.target.value)}
        value={filters.sortBy}
      >
        {columnFilters.map((item, index) => (
          <option key={`column-${index}`} value={item.value}>
            {item.name}
          </option>
        ))}
      </select>
      <select
        className="filter-bars"
        id="sort-direction-filter"
        onChange={(e) => sendtoReducer("sortDirection", e.target.value)}
        value={filters.sortDirection}
      >
        {sortDirection.map((item, index) => (
          <option key={`sort-direction-${index}`} value={item.value}>
            {item.name}
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
