import StyledButton from "../assets/styled-components/styled-button";
import CardNavBar from "./card-navbar";
import { useEffect, useState } from "react";
import ActionPopup from "./action-popup";

const EventDetails = ({ index, selectedDataItem, changeData }) => {
  const [showButtons, setShowButtons] = useState(true);
  const [displayActionPopup, setDisplayActionPopup] = useState(false);
  useEffect(() => {
    const elem = document.getElementById("buttonsContainer");
    if (elem) {
      elem.classList.remove("buttons-container-hide");
    }

    if (selectedDataItem) {
      if (
        selectedDataItem.details[4].value.toLowerCase() ===
          "no action needed" ||
        selectedDataItem.details[4].closeToEdit
      ) {
        setShowButtons(false);
      } else {
        setShowButtons(true);
      }
    }
  }, [index, selectedDataItem]);

  useEffect(() => {
    const elem = document.getElementById("ScreenBackPopUp");
    if (elem && selectedDataItem) {
      if (displayActionPopup) {
        elem.classList.add("displayBackScreen");
      } else {
        elem.classList.remove("displayBackScreen");
      }
    }
  }, [displayActionPopup, selectedDataItem]);

  const handleActions = (e) => {
    if (selectedDataItem) {
      const buttonValue = e.target.value;
      switch (buttonValue) {
        case "noAction":
          document
            .getElementById("buttonsContainer")
            .classList.add("buttons-container-hide");
          changeData({ value: "No action needed" });
          break;
        case "takeAction":
          setDisplayActionPopup(true);
          break;
        default:
      }
    }
  };

  const handleCloseActionPopup = () => {
    setDisplayActionPopup(false);
  };
  const handlePopupResult = (evt) => {
    changeData({
      value: evt.selectedOption.title,
      detail: evt.resolutionDetail,
      closeToEdit: evt.success,
    });
  };

  return (
    <div className="event-details-card">
      {showButtons ? (
        <div id="buttonsContainer" className="buttons-container">
          <StyledButton
            onClick={handleActions}
            text="no action needed"
            type="secondary"
            size="large"
            clsName="btn-noaction"
            buttonValue="noAction"
          />
          <StyledButton
            onClick={handleActions}
            text="take action"
            type="primary"
            size="large"
            clsName="btn-action"
            buttonValue="takeAction"
          />
        </div>
      ) : null}

      <div>
        <CardNavBar cardsData={selectedDataItem} index={index} />
      </div>
      <div>
        {displayActionPopup && selectedDataItem !== undefined ? (
          <ActionPopup
            handleClose={handleCloseActionPopup}
            handlePopupResult={handlePopupResult}
          />
        ) : null}
      </div>
    </div>
  );
};

export default EventDetails;
