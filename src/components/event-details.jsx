import StyledButton from "../assets/styled-components/styled-button";
import CardNavBar from "./card-navbar";
import { useEffect, useState } from "react";

const EventDetails = ({ index, selectedDataItem, changeData }) => {
  const [showButtons, setShowButtons] = useState(true);
  useEffect(() => {
    const elem = document.getElementById("buttonsContainer");
    if (elem) {
      elem.classList.remove("buttons-container-hide");
    }

    if (selectedDataItem) {
      if (
        selectedDataItem.details[4].value.toLowerCase() === "no action needed"
      ) {
        setShowButtons(false);
      } else {
        setShowButtons(true);
      }
    }
  }, [index]);

  const handleClickButton = (e) => {
    if (e.target.innerHTML.toLowerCase() === "no action needed") {
      document
        .getElementById("buttonsContainer")
        .classList.add("buttons-container-hide");
      changeData("no action needed");
    }
  };
  return (
    <div className="event-details-card">
      {showButtons ? (
        <div id="buttonsContainer" className="buttons-container">
          <StyledButton
            onClick={handleClickButton}
            text="no action needed"
            action={false}
            large={true}
            cls="btn-noaction"
          />
          <StyledButton
            onClick={handleClickButton}
            text="take action"
            action={true}
            large={true}
            cls="btn-action"
          />
        </div>
      ) : null}

      <div>
        <CardNavBar cardsData={selectedDataItem} index={index} />
      </div>
    </div>
  );
};

export default EventDetails;
