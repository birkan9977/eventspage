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
  const [isDataReady, setIsDataReady] = useState(false);
  const [dataSortToggle, setDataSortToggle] = useState(false);
  const prevValueRef = useRef([]);

  const columns = useRef([]);
  const columnFilters = useRef();
  const prevValue = prevValueRef.current;
  //load data
  useEffect(() => {
    //simulating fetching data via an api call with promise
    getData()
      .then((response) => {
        const data = response.data;
        setRawData(response.data);
        return data[0];
      })
      .then((data) => {
        //console.log(data);
        columns.current = [
          {
            address: ["details", 0, "value"],
            type: "date",
            name: data["details"][0]["title"],
          },
          {
            address: ["id"],
            type: "number",
            name: "Id",
          },
          {
            address: ["details", 1, "value"],
            type: "string",
            name: data["details"][1]["title"],
          },
          {
            address: ["details", 2, "value"],
            type: "string",
            name: data["details"][2]["title"],
          },
          {
            address: ["details", 6, "value"],
            type: "string",
            name: data["details"][6]["title"],
          },
          {
            address: ["details", 4, "value"],
            type: "string",
            name: data["details"][4]["title"],
          },
        ];
        //console.log(columns.current);
        return columns.current;
      })
      .then((columns) => {
        columnFilters.current = columns.map((column, index) => {
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
      const column = columns.current[filters.sortBy];
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
      const column = columns.current[Number(filters.sortBy)];
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
