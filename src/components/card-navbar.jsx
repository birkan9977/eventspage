import { useState, useEffect } from "react";
import Location from "./location";
import Media from "./media";
const CardNavBar = ({ cardsData, index }) => {
  const [selectedTab, setSelectedTab] = useState("details");

  useEffect(() => {
    const elem = document.getElementById("under-line-navbar");
    const clsName = `${selectedTab}-underline`;
    elem.className = `underline-default ${clsName}`;

    const listElements = document.querySelectorAll(".card-navbar>li");

    listElements.forEach((el) => {
      if (el.innerHTML !== selectedTab) {
        el.className = "tab-unselected";
      } else {
        el.className = "tab-selected";
      }
    });
  }, [selectedTab, cardsData]);

  const handleChangeNavTab = (e) => {
    setSelectedTab(e.target.innerHTML);
  };

  const displayDetails = () => {
    //customize below to specify which details to be displayed and their order from left to right (array index)
    const details = [
      cardsData.details[4],
      cardsData.details[7],
      cardsData.details[3],
      cardsData.details[5],
    ];
    return details;
  };
  return (
    <div className="card-container">
      <div className="card-navbar-container">
        <ul className="card-navbar" onClick={handleChangeNavTab}>
          <li>details</li>
          <li>location</li>
          <li>media</li>
        </ul>
        <div className="navline-container">
          <div id="under-line-navbar"></div>
          <div className="navbar-underline"></div>
        </div>
      </div>
      <div>
        {(cardsData && selectedTab) === "details" ? (
          <div className="details-tab">
            {displayDetails().map((item, index) => {
              return (
                <div key={`item-${index}`}>
                  <div key={`row-${index}`} className="details-tab-flex">
                    <h5 key={`h-${index}`}>{item.title}</h5>
                    {!item.detail ? (
                      <p key={`d-${index}`}>{item["value"]}</p>
                    ) : (
                      <p key={`d-${index}`}>{item["detail"]}</p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        ) : null}
      </div>

      <div>
        {(cardsData && selectedTab) === "location" ? (
          <Location locationData={cardsData.location} index={index} />
        ) : null}
      </div>
      <div>
        {(cardsData && selectedTab) === "media" ? (
          <Media mediaData={cardsData.media} />
        ) : null}
      </div>
    </div>
  );
};

export default CardNavBar;
