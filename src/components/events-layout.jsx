import { useState, useEffect, useContext } from "react";
import AppContext from "../app/context";
import EventsList from "./events-list";
import getData from "../services/service";
import Filters from "./filters";
import { sortData, convertToDateObject } from "../utilities/helperFunctions";
import EventDetails from "./event-details";
const Events = () => {
  const { filters } = useContext(AppContext); //context filter variables
  const [eventsData, setEventsData] = useState([]);
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [sortedToggle, setSortedToggle] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [stateToggle, setUpdateStateToggle] = useState(false);

  //load data
  useEffect(() => {
    //simulating fetching data via an api call with promise
    getData()
      .then((response) => {
        setEventsData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //makes sure data is loaded before calling any child component
  useEffect(() => {
    if (eventsData.length > 0) {
      setIsDataLoaded(true);
      sortData(eventsData, filters.sortBy, filters.sortDirection);
      convertToDateObject(eventsData, "details", 0);
      setSortedToggle((state) => !state);
      sessionStorage.setItem("sortBy", filters.sortBy);
      sessionStorage.setItem("sortDirection", filters.sortDirection);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData, filters]);

  //sets 'selectedIndex' state variable to null after each sorting
  useEffect(() => {
    setSelectedIndex(null);
  }, [sortedToggle]);

  const handleChangeSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  const handleChangeData = (e) => {
    let newObj = Object.assign({}, eventsData[selectedIndex]);

    if (selectedIndex) {
      newObj["details"][4]["value"] = "No action needed";
      setUpdateStateToggle((state) => !state);
    }
  };

  return (
    <div className="events-layout">
      <div className="events">
        <div>
          <h1>Events</h1>

          <Filters />
        </div>
        {isDataLoaded ? (
          <EventsList
            eventsData={eventsData}
            handleSelected={handleChangeSelectedIndex}
            selectedIndex={selectedIndex}
            sortedToggle={sortedToggle}
          />
        ) : null}
      </div>
      <div className="event-details">
        <h1>Event Details</h1>

        <EventDetails
          index={selectedIndex}
          selectedDataItem={eventsData[selectedIndex]}
          changeData={handleChangeData}
        />
      </div>
    </div>
  );
};

export default Events;
