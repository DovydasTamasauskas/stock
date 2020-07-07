import React, { useEffect } from "react";
import "./App.css";
import Chart from "../components/Chart";
import { BACKEND_HOST, STOCKS, DAILY, SMA } from "../consts/CONST.js";

function App() {
  let startHour = 17;
  let startMinute = 45;
  const interval = 60000;

  window.setInterval(function () {
    var date = new Date();
    for (let i = 0; i < STOCKS.length; i++) {
      if (
        date.getHours() === startHour &&
        date.getMinutes() === startMinute + i
      ) {
        fetch(`${BACKEND_HOST}?${DAILY},${STOCKS[i]}`);
        fetch(`${BACKEND_HOST}?${SMA},${STOCKS[i]}`);
      }
    }
  }, interval);
  console.log(STOCKS);
  return (
    <div className="App">
      {STOCKS.map((stock) => (
        <Chart symbol={stock} />
      ))}
    </div>
  );
}

export default App;
