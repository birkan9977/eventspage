import { useState, useEffect, useContext, useRef } from "react";
import AppContext from "../app/context";
import EventsList from "./events-list";
import getData from "../services/service";
import Filters from "./filters";
import { sortData } from "../utilities/helperFunctions";
import EventDetails from "./event-details";
import columnsData from "../data/columns-data";

const Events = () => {
  const { filters } = useContext(AppContext); //context filter variables
  const [rawData, setRawData] = useState([]);
  const [eventsData, setEventsData] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(-1);
  const [isDataReady, setIsDataReady] = useState(false);
  const [dataSortToggle, setDataSortToggle] = useState(false);

  const prevValueRef = useRef([]);
  const columnsInfo = useRef([]);
  const columnFilters = useRef();
  const prevValue = prevValueRef.current;

  //load data
  useEffect(() => {
    //simulate fetching data via an api call with promise
    getData()
      .then((response) => {
        const data = response.data;
        setRawData(response.data);
        return data[0];
      })
      .then((dataFirstRow) => {
        //get column definitions from first row - customize 'columnsData' to change column definitions
        columnsInfo.current = columnsData(dataFirstRow);
        return columnsInfo.current;
      })
      .then((columnsInfo) => {
        columnFilters.current = columnsInfo.map((column, index) => {
          return {
            name: column.name,
            value: index,
          };
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  //makes sure data is loaded before calling any child component
  useEffect(() => {
    if (rawData.length > 0) {
      //console.log('rawData',rawData)
      const column = columnsInfo.current[filters.sortBy];
      const sortedData = sortData(
        column.type,
        rawData,
        Number(filters.sortDirection),
        ...column["address"]
      );
      setEventsData(sortedData);
      setIsDataReady(true);
      setDataSortToggle((state) => !state);
      setSelectedIndex(-1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [rawData]);

  useEffect(() => {
    if (eventsData.length > 0 && prevValue !== eventsData) {
      console.log("test");
      const column = columnsInfo.current[Number(filters.sortBy)];
      const sortedData = sortData(
        column.type,
        eventsData,
        Number(filters.sortDirection),
        ...column["address"]
      );
      setEventsData(sortedData);
      setDataSortToggle((state) => !state);
      setSelectedIndex(-1);
    }

    sessionStorage.setItem("sortBy", Number(filters.sortBy));
    sessionStorage.setItem("sortDirection", Number(filters.sortDirection));
    prevValueRef.current = eventsData;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [filters]);

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

          {isDataReady ? (
            <Filters columnFilters={columnFilters.current} />
          ) : null}
        </div>
        <div>
          {isDataReady ? (
            <EventsList
              rows={eventsData}
              columnsInfo={columnsInfo.current}
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
          {isDataReady ? (
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
