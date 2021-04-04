import actionNavBar from "../data/action-popup-navbar-data";
import clsx from "clsx";

export default function ActionPopupNavbar({ activeTabIndex }) {
  return (
    <div className="action-popup-navbar">
      {actionNavBar.map((item, index) => {
        return (
          <div
            className={clsx(
              "action-tab",
              activeTabIndex === item.tab && "active-tab-underline"
            )}
            key={`action-tab-${index}`}
          >
            <span>{item.tab}</span>
            {item.text}
            <span className="whiteSpace"></span>
          </div>
        );
      })}
    </div>
  );
}
