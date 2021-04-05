import { useState, useEffect } from "react";
import Location from "./location";
import Media from "./media";
import { extraColumns } from "../data/columns-data";
import { customReducer } from "../utilities/helperFunctions";
import { useMediaQuery } from "react-responsive";

const CardNavBar = ({ cardsData, index }) => {
  const [selectedTab, setSelectedTab] = useState(0); //details
  const moveStyleX = {
    transform: `translateX(${selectedTab * 10}rem)`,
    opacity: "1",
  };
  const moveStyleY = {
    transform: `translateY(${selectedTab * 2.5}rem)`,
    opacity: "1",
  };

  const isSmallScreen = useMediaQuery({ query: "(max-width: 73.75em)" });

  useEffect(() => {
    const listElements = document.querySelectorAll(".card-navbar>li");

    listElements.forEach((elem, index) => {
      if (index === selectedTab) {
        elem.className = "tab-selected";
      } else {
        elem.className = "tab-unselected";
      }
    });
  }, [selectedTab, cardsData]);

  const handleChangeNavTab = (e) => {
    setSelectedTab(e.target.value);
  };

  const displayDetails = (item) => {
    if (item.hasOwnProperty("detail")) {
      if (customReducer(cardsData, item.detail) !== undefined) {
        return customReducer(cardsData, item.detail);
      }
    }
    return customReducer(cardsData, item.value);
  };

  return (
    <div className="card-container">
      <div className="card-navbar-container">
        <ul className="card-navbar" onClick={handleChangeNavTab}>
          <li value={0}>details</li>
          <li value={1}>location</li>
          <li value={2}>media</li>
        </ul>
        <div className="navline-container">
          <div
            id="moving-line"
            className="underline-default"
            style={isSmallScreen ? moveStyleY : moveStyleX}
          ></div>
          <div className="navbar-fixed-underline"></div>
        </div>
      </div>
      <div>
        {cardsData && selectedTab === 0 ? (
          <div className="details-tab">
            {extraColumns(cardsData).map((item, index) => {
              return (
                <div key={`item-${index}`}>
                  <div key={`row-${index}`} className="details-tab-flex">
                    <h5 key={`h-${index}`}>{item.title}</h5>
                    <p key={`d-${index}`}>{displayDetails(item)}</p>
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div>
        {cardsData && selectedTab === 1 ? (
          <Location locationData={cardsData.location} index={index} />
        ) : null}
      </div>
      <div>
        {cardsData && selectedTab === 2 ? (
          <Media mediaData={cardsData.media} />
        ) : null}
      </div>
    </div>
  );
};

export default CardNavBar;
