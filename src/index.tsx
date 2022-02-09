import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./components/App";
import reportWebVitals from "./reportWebVitals";
import { testfilms } from "./components/data/data";
import { BrowserRouter } from "react-router-dom";

if (localStorage.getItem("films") === null) {
  localStorage.setItem("films", JSON.stringify(testfilms));
}

ReactDOM.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>,
  document.getElementById("root")
);

reportWebVitals();
