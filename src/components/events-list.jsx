import ListItems from "./list-items";
import { useState, useEffect } from "react";
import { customReducer } from "../utilities/helperFunctions";
//display rows
const EventsList = ({
  columnsInfo,
  rows,
  handleSelected,
  selectedIndex,
  dataSortToggle,
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
      handleSelected(Number(index));
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
      setSelected("");
      handleSelected(-1);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [previousSelected]);

  //clear highlights when dataSortToggle updates or non selected
  useEffect(() => {
    setSelected("");
    let elements = document.querySelectorAll(".list-row");
    if (elements) {
      elements.forEach((element) => {
        if (element.classList.contains("clicked-item")) {
          element.classList.remove("clicked-item");
        }
      });
    }
  }, [dataSortToggle]);

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
        {rows.map((row, index) => {
          return (
            <div
              className="list-row"
              onClick={handleClickEvent}
              id={`clicable-list-item-${index}`}
              data-index={index}
              key={`row-${index}`}
            >
              <ListItems
                columns={columnsInfo.map((column) => {
                  return {
                    ...column,
                    value: customReducer(row, ...column.address),
                  };
                })}
                rowIndex={index}
              />
            </div>
          );
        })}
      </ul>
    </div>
  );
};
export default EventsList;
