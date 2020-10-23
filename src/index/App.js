import React, { useState } from "react";
// import axios from "axios";

import "./App.css";
import {
  // BBands,
  Candle,
  // Divident,
  MACD,
  // OBV,
  RSI,
} from "../indicators/indicator";

import {
  Header,
} from "../components";
import {
  getQueryParams,
  background,
  fetchData,
  getStocksToShow,
  getChartDays,
} from "../indicators/functions/func.js";
import useEffectAsync from "../indicators/helpers/useEffectAsync.js";
import { HOST } from "../indicators/consts/CONST";

const showStock = (key, stock, days, background) => {
  return (
    <div key={key} style={{ backgroundColor: background(key) }}>
      <a onClick={() => window.open(HOST+"/?stock=" + stock + "&days=500", "_blank")}>{stock}</a>
      <Candle symbol={stock} days={days} color={background(key)} />
      {/* <BBands symbol={stock} days={days} color={background(key)} /> */}
      {/* <Divident symbol={stock} days={days} color={background(key)} /> */}
      {/* <OBV symbol={stock} days={days} color={background(key)} /> */}
      <RSI symbol={stock} days={days} color={background(key)} />
      <MACD symbol={stock} days={days} color={background(key)} />
    </div>
  );
};

function App() {
  const [QueryParams] = useState(getQueryParams);
  const [Days] = useState(getChartDays(QueryParams));
  const [StocksToShow, SetStocksToShow] = useState();

  useEffectAsync(async () => {
    const data = await getStocksToShow(QueryParams);
    SetStocksToShow(data);
  });

  return (
    <div className="App">
      <Header />

      {!!StocksToShow &&
        StocksToShow.map(
          (stock, key) =>
            stock !== "" && showStock(key, stock, Days, background)
        )}
    </div>
  );
}

export default App;
