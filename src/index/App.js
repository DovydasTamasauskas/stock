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
  WatchList,
  MyList,
} from "../components";
import {
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
      <div class="col-md-12 " style={{backgroundColor:"white", paddingTop:10}}>
        <div class="col-md-4"><WatchList /></div>
        <div class="col-md-4"></div>
        <div class="col-md-4"><MyList /></div>
      </div>
      {!!StocksToShow &&
        StocksToShow.map(
          (stock, key) =>
            stock !== "" && showStock(key, stock, Days, background)
        )}
    </div>
  );
}

export default App;
