import errorIcon from "../assets/images/error.svg";
import successIcon from "../assets/images/success.svg";
import { useState, useEffect } from "react";

export default function DisplayResult({ textValue, handleResult }) {
  const [status, setStatus] = useState({});

  useEffect(() => {
    let statusObj = {};
    const len = textValue.length;
    const errorStyle = {
      color: "#d92323",
    };
    const successStyle = {
      color: "#3DA836",
    };

    if (len <= 0) {
      statusObj = {
        displayTitle: "A PROBLEM OCCURRED!",
        displayText:
          "We cannot continue due to a problem. Please try again later.",
        icon: errorIcon,
        success: false,
        style: errorStyle,
      };
    } else {
      statusObj = {
        displayTitle: "ACTION HAS BEEN TAKEN!",
        displayText: "You can see the action details from the details tab.",
        icon: successIcon,
        success: true,
        style: successStyle,
      };
    }
    setStatus(statusObj);
  }, [textValue]);

  const handleClick = () => {
    handleResult(status.success);
  };

  return (
    <div className="display-result">
      <i className="warning-icon">
        <img
          onClick={handleClick}
          className="warning-icon-image"
          src={status.icon}
          alt=""
        ></img>
      </i>
      <p className="display-warning-title" style={status.style}>
        {status.displayTitle}
      </p>
      <p className="display-warning-text">{status.displayText}</p>
    </div>
  );
}
