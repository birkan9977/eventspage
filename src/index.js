import React from "react";
import ReactDOM from "react-dom";
import "./assets/styles/main.css";
//import "./assets/styles/leaflet.css";
import AppLayout from "./app-layout";
import reportWebVitals from "./reportWebVitals";

ReactDOM.render(
  <React.StrictMode>
    <AppLayout />
  </React.StrictMode>,
  document.getElementById("root")
);

reportWebVitals();
