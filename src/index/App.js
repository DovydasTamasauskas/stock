import React from "react";
import "./App.css";
import Chart from "../components/Chart";
import RSI from "../components/RSI";
import { STOCKS } from "../consts/CONST.js";
import { getDays } from "../functions/func.js";

function App() {
  // let startHour = 18;
  // let startMinute = 10;
  // const interval = 60000;
  // window.setInterval(function () {
  //   var date = new Date();
  //   for (let i = 0; i < STOCKS.length; i++) {
  //     if (
  //       date.getHours() === startHour &&
  //       date.getMinutes() === startMinute + i
  //     ) {
  //       fetch(`${BACKEND_HOST}?${DAILY},${STOCKS[i]}`);
  //       fetch(`${BACKEND_HOST}?${SMA},${STOCKS[i]}`);
  //     }
  //   }
  // }, interval);

  const days = getDays(100);
  const background = (key) => (key % 2 === 0 ? "#DCDCDC" : "#A9A9A9");
  return (
    <div className="App">
      {STOCKS.map((stock, key) => (
        <div key={key}>
          <Chart symbol={stock} days={days} color={background(key)} />
          <RSI symbol={stock} days={days} color={background(key)} />
        </div>
      ))}
    </div>
  );
}

export default App;
