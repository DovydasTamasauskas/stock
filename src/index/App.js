import React, { useState } from "react";
import axios from "axios";

import "./App.css";
// import Divident from "../indicators/Divident";
import ChartCandle from "../indicators/indicator/ChartCandle";
// import ChartCandleBBands from "../indicators/ChartCandleBBands";
import RSI from "../indicators/indicator/RSI";
import MACD from "../indicators/indicator/MACD";
// import OBV from "../indicators/OBV";
import WatchList from "../components/WatchList/watchList";
import {
  getDays,
  getQueryParams,
  background,
  fetchData,
  getStocksToShow,
  getChartDays,
} from "../indicators/functions/func.js";
import useEffectAsync from "../indicators/helpers/useEffectAsync.js";

const showStock = (key, stock, days, background) => {
  return (
    <div key={key} style={{ backgroundColor: background(key) }}>
      <a onClick={() => fetchData(stock)}>{stock}</a>
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
  const [StocksToShow, SetStocksToShow] = useState();

  useEffectAsync(async () => {
    const data = await getStocksToShow(QueryParams);
    SetStocksToShow(data);
  });

  return (
    <div className="App">
      <WatchList />
      {!!StocksToShow &&
        StocksToShow.map(
          (stock, key) => stock != "" && showStock(key, stock, Days, background)
        )}
    </div>
  );
}

export default App;
