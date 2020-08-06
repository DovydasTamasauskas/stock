import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Divident from "../components/Divident";
import ChartCandle from "../components/ChartCandle";
import ChartCandleBBands from "../components/ChartCandleBBands";
import RSI from "../components/RSI";
import MACD from "../components/MACD";
import OBV from "../components/OBV";
import {
  STOCKS,
  DEFAULT_DAYS_LONG,
  DEFAULT_PAGE_SIZE,
  DAILY as _DAILY,
  RSI as _RSI,
  MACD as _MACD,
  SMA as _SMA,
  BACKEND_HOST,
} from "../consts/CONST.js";
import {
  getDays,
  getQueryParams,
  background,
  fetchData,
  getStocksToShow,
  getChartDays,
} from "../functions/func.js";

const showStock = (key, stock, days, background) => {
  return (
    <div key={key} style={{ backgroundColor: background(key) }}>
      {stock}
      <div>
        <a href="#" onClick={() => fetchData(stock)}>
          Update Stock
        </a>
      </div>
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
  const [QueryParams, SetQueryParams] = useState(getQueryParams);
  const [Days, SetDays] = useState(getChartDays(QueryParams));
  const [StocksToShow, SetStocksToShow] = useState(
    getStocksToShow(QueryParams)
  );

  return (
    <div className="App">
      {StocksToShow.map((stock, key) =>
        showStock(key, stock, Days, background)
      )}
    </div>
  );
}

export default App;
