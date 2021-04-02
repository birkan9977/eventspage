import icon_x from "../assets/images/Icon_X.svg";
import clsx from "clsx";
import { useState, useEffect } from "react";
import actionData from "../data/action-data";
import ActionOptions from "./action-options";
import StyledButton from "../assets/styled-components/styled-button";
import TakeActionTab from "./take-action-tab";
import ActionPopupNavbar from "./action-popup-navbar";
import Loader from "./loader";
import DisplayResult from "./display-result";
const NUMOFTABS = 2;

export default function ActionPopup({ handleClose, handlePopupResult }) {
  const [activeTabIndex, setActiveTabIndex] = useState(1);
  const [selectedOption, setSelectedOption] = useState("0");
  const [selectedOptionData, setSelectedOptionData] = useState({});
  const [textValue, setTextValue] = useState("");
  const [timer, setTimer] = useState(true);

  useEffect(() => {
    if (activeTabIndex === -1) {
      setTimeout(() => {
        setTimer(false);
      }, 1000);
    }
  }, [activeTabIndex]);

  const handleTextChange = (evt) => {
    setTextValue(evt);
  };

  useEffect(() => {
    const found = actionData.find((item) => item.option === selectedOption);
    if (selectedOption !== "0") {
      const newOptionData = {
        ...selectedOptionData,
        title: found.title,
        text: found.text,
      };
      setSelectedOptionData(newOptionData);
    }
  }, [selectedOption]);

  const handleSelectedOption = (evt) => {
    setSelectedOption(evt.target.value);
  };

  const handleActions = (e) => {
    const targetEvent = e.target;

    switch (targetEvent.value) {
      case "next":
        if (activeTabIndex < NUMOFTABS) {
          setActiveTabIndex((state) => state + 1);
        }
        break;
      case "back":
        if (activeTabIndex > 1) {
          setActiveTabIndex((state) => state - 1);
        }
        break;

      case "takeAction":
        setActiveTabIndex(-1);

        break;

      default:
    }
  };

  const handleResult = (evt) => {
    if (evt) {
      const popupData = {
        selectedOption: {
          title: selectedOptionData.title,
          text: selectedOptionData.text,
        },
        resolutionDetail: textValue,
        success: evt,
      };
      handlePopupResult(popupData);
    }
    handleClose();
  };

  return (
    <div className="action-container">
      <div id="ScreenBackPopUp" className="fullScreenBack">
        <div
          className={clsx({
            "action-popup": true,
            "action-popup-2": activeTabIndex === -1,
          })}
        >
          <img
            className="iconx-close"
            onClick={handleClose}
            src={icon_x}
            alt=""
          ></img>
          {activeTabIndex === -1 && timer ? <Loader /> : null}
          {activeTabIndex === -1 && !timer ? (
            <DisplayResult textValue={textValue} handleResult={handleResult} />
          ) : null}

          {activeTabIndex !== -1 ? (
            <ActionPopupNavbar activeTabIndex={activeTabIndex} />
          ) : null}
          {activeTabIndex === 1 ? (
            <div className="select-action-options-container">
              {actionData.map((item) => {
                return (
                  <ActionOptions
                    option={item.option}
                    title={item.title}
                    text={item.text}
                    handleSelectedOption={handleSelectedOption}
                    selectedOption={selectedOption}
                  />
                );
              })}
            </div>
          ) : null}
          {activeTabIndex === 2 ? (
            <TakeActionTab
              selectedOptionData={selectedOptionData}
              handleTextChange={handleTextChange}
              textValue={textValue}
            />
          ) : null}
          <div className="action-popup-buttons-container">
            {activeTabIndex === 1 ? (
              <StyledButton
                onClick={handleActions}
                text="next"
                type="primary"
                size="small"
                disabled={selectedOption === "0"}
                buttonValue="next"
                clsName="next-button"
              />
            ) : null}
            {activeTabIndex === 2 ? (
              <StyledButton
                onClick={handleActions}
                text="back"
                type="secondary"
                size="small"
                disabled={selectedOption === "0"}
                buttonValue="back"
                clsName="back-button"
              />
            ) : null}
            {activeTabIndex === 2 ? (
              <StyledButton
                onClick={handleActions}
                text="take action"
                type="primary"
                size="large"
                disabled={selectedOption === "0"}
                buttonValue="takeAction"
                clsName="take-action-button"
              />
            ) : null}
          </div>
        </div>
      </div>
    </div>
  );
}
