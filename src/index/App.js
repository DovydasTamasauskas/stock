import React from "react";
import "./App.css";
import Chart from "../components/Chart";
import { BACKEND_HOST, DAILY, SMA, STOCKS } from "../consts/CONST.js";

function App() {
  let startHour = 7;
  let startMinute = 0;
  const interval = 60000;

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

  return (
    <div className="App">
      {/* {STOCKS.map((stock, i) => (
        <Chart key={i} symbol={stock} days={100} color={"#DCDCDC"} />
      ))} */}
      <Chart symbol="SPY" days={200} color={"#DCDCDC"} />
      <Chart symbol="SPY" days={50} color={"#A9A9A9"} />
    </div>
  );
}

export default App;
