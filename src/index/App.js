import React from "react";
import "./App.css";
import Divident from "../components/Divident";
import ChartCandle from "../components/ChartCandle";
import ChartCandleBBands from "../components/ChartCandleBBands";
import RSI from "../components/RSI";
import MACD from "../components/MACD";
import OBV from "../components/OBV";
import { STOCKS } from "../consts/CONST.js";
import { getDays, findDuplicates } from "../functions/func.js";

const showStock = (key, stock, days, background) => {
  return (
    <div key={key} style={{ backgroundColor: background(key) }}>
      {stock}
      <ChartCandle symbol={stock} days={days} color={background(key)} />
      {/* <ChartCandleBBands symbol={stock} days={days} color={background(key)} /> */}
      {/* <Divident symbol={stock} days={days} color={background(key)} /> */}
      {/* <OBV symbol={stock} days={days} color={background(key)} /> */}
      <RSI symbol={stock} days={days} color={background(key)} />
      <MACD symbol={stock} days={days} color={background(key)} />
    </div>
  );
};

function App() {
  const background = (key) => (key % 2 === 0 ? "#DCDCDC" : "#A9A9A9");
  var queryDays = new URLSearchParams(window.location.search).get("days");
  var queryStocks = new URLSearchParams(window.location.search).get("stocks");

  queryStocks = queryStocks === null ? 0 : parseInt(queryStocks);
  findDuplicates(STOCKS);
  const showStocks = STOCKS.slice(queryStocks * 5, (queryStocks + 1) * 5);
  let days = getDays(100);
  if (queryDays > 50 && queryDays < 365 * 15) {
    days = getDays(queryDays);
  }

  return (
    <div className="App">
      {showStocks.map((stock, key) => showStock(key, stock, days, background))}
    </div>
  );
}

export default App;
