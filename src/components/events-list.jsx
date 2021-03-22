import ListItems from "./list-items";
import { useState, useEffect } from "react";
//display rows
const EventsList = ({
  eventsData,
  handleSelected,
  selectedIndex,
  sortedToggle,
}) => {
  const [selected, setSelected] = useState(
    `clicable-list-item-${selectedIndex}`
  ); //string(holds div ids created during render)
  const [previousSelected, setPreviousSelected] = useState(null); //string(div id)

  //handle after effects on value change of state variable 'selected'
  useEffect(() => {
    const element = document.getElementById(selected);
    if (element) {
      element.classList.add("clicked-item");
      let index = element.dataset.index;
      //send the selected index retrieved from custom data attribute to parent with this callback
      handleSelected(index);
    }

    const previousElement = document.getElementById(previousSelected);
    if (previousElement) {
      previousElement.classList.remove("clicked-item");
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selected]);

  //if same box clicked handle toggle selection as a side effect
  useEffect(() => {
    if (previousSelected === selected) {
      setSelected(null);
      handleSelected(null);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousSelected]);

  //clear highlights when sortedToggle updates or non selected
  useEffect(() => {
    setSelected(null);
    let elements = document.querySelectorAll(".list-row");
    if (elements) {
      elements.forEach((element) => {
        if (element.classList.contains("clicked-item")) {
          element.classList.remove("clicked-item");
        }
      });
    }
  }, [sortedToggle]);

  //assigne column titles here
  const displayColumns = (row) => {
    //customize below to specify which columns to be displayed and their order from left to right (array index)
    const refinedRow = [
      row.details[0],
      { title: "Id", value: row.id },
      row.details[1],
      row.details[2],
      row.details[6],
      row.details[4],
    ];
    return refinedRow;
  };

  //handle selected div box and change 'selected' state variable via a recursive function moving towards parent
  const handleClickEvent = (e) => {
    let count = 0;
    let elementId = "";
    // a recursive function is used here becuause inner elements are on top of the outer div which keeps id of the row
    recursiveIdFinder(e.target);
    setPreviousSelected(selected);
    setSelected(elementId);

    function recursiveIdFinder(elem) {
      count++;
      if (elem.id.indexOf("clicable") > -1) {
        elementId = elem.id;
        return elementId;
      }
      if (count > 10) {
        return console.log(elem.nodeName, count, "not found!");
      } else {
        recursiveIdFinder(elem.parentElement);
      }
    }
  };

  return (
    <div className="events-list-container">
      <ul className="events-list">
        {eventsData.map((row, index) => {
          return (
            <div
              className="list-row"
              onClick={handleClickEvent}
              id={`clicable-list-item-${index}`}
              data-index={index}
              key={`row-${index}`}
            >
              <ListItems columns={displayColumns(row)} rowIndex={index} />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default EventsList;
