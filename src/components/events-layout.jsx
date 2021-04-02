import { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../app/context";
import EventsList from "./events-list";
import getData from "../services/service";
import Filters from "./filters";
import { sortData } from "../utilities/helperFunctions";
import EventDetails from "./event-details";
const Events = () => {
  const { filters } = useContext(AppContext); //context filter variables
  const [rawData, setRawData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDataSorted, setIsDataSorted] = useState(false);
  const [dataSortToggle, setDataSortToggle] = useState(false);
  const prevValueRef = useRef([]);
  //load data
  useEffect(() => {
    //simulating fetching data via an api call with promise
    getData()
      .then((response) => {
        setRawData(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //makes sure data is loaded before calling any child component
  useEffect(() => {
    if (rawData.length > 0) {
      const sortedData = sortData(
        rawData,
        filters.sortBy,
        filters.sortDirection
      );
      setEventsData(sortedData);
      setIsDataSorted(true);
      setDataSortToggle((state) => !state);
      setSelectedIndex(-1);
      return () => {
        sessionStorage.setItem("sortBy", filters.sortBy);
        sessionStorage.setItem("sortDirection", filters.sortDirection);
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  useEffect(() => {
    const sortedData = sortData(
      eventsData,
      filters.sortBy,
      filters.sortDirection
    );
    setEventsData(sortedData);
    setDataSortToggle((state) => !state);
    setSelectedIndex(-1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

  const prevValue = prevValueRef.current;

  useEffect(() => {
    prevValueRef.current = eventsData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eventsData]);

  const handleChangeSelectedIndex = (index) => {
    setSelectedIndex(index);
  };

  const handleChangeData = (evt) => {
    if (selectedIndex >= 0) {
      const newObj = eventsData.map((item, itemIndex) => {
        if (itemIndex === selectedIndex) {
          return {
            ...item,
            details: item.details.map((detailsItem, detailsIndex) => {
              if (detailsIndex === 4) {
                return {
                  ...detailsItem,
                  value: evt.value,
                  detail: evt.detail,
                  closeToEdit: evt.closeToEdit,
                };
              }
              return detailsItem;
            }),
          };
        }
        return item;
      });

      setEventsData(newObj);
    }
  };

  return (
    <div className="events-layout">
      <div className="events">
        <div>
          <h1>Events</h1>

          <Filters />
        </div>
        <div>
          {isDataSorted ? (
            <EventsList
              eventsData={eventsData}
              handleSelected={handleChangeSelectedIndex}
              selectedIndex={selectedIndex}
              dataSortToggle={dataSortToggle}
            />
          ) : null}
        </div>
      </div>
      <div className="event-details">
        <h1>Event Details</h1>
        <div>
          {isDataSorted ? (
            <EventDetails
              index={selectedIndex}
              selectedDataItem={eventsData[selectedIndex]}
              changeData={handleChangeData}
            />
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default Events;
