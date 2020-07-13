import React from "react";
import "./App.css";
import Divident from "../components/Divident";
import ChartCandle from "../components/ChartCandle";
import RSI from "../components/RSI";
import MACD from "../components/MACD";
import OBV from "../components/OBV";
import { STOCKS } from "../consts/CONST.js";
import { getDays } from "../functions/func.js";

function App() {
  const days = getDays(100);
  const background = (key) => (key % 2 === 0 ? "#DCDCDC" : "#A9A9A9");

  return (
    <div className="App">
      Last updated: {days[0]}
      {STOCKS.map((stock, key) => (
        <div key={key}>
          <ChartCandle symbol={stock} days={days} color={background(key)} />
          <Divident symbol={stock} days={days} color={background(key)} />
          <OBV symbol={stock} days={days} color={background(key)} />
          <RSI symbol={stock} days={days} color={background(key)} />
          <MACD symbol={stock} days={days} color={background(key)} />
        </div>
      ))}
    </div>
  );
}

export default App;
