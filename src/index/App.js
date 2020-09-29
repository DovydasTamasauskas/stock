import React, { useState } from "react";
import "./App.css";
import axios from "axios";
import Divident from "../components/Divident";
import ChartCandle from "../components/ChartCandle";
import ChartCandleBBands from "../components/ChartCandleBBands";
import RSI from "../components/RSI";
import MACD from "../components/MACD";
import OBV from "../components/OBV";
import WatchList from "../components/WatchList/watchList";
import {
  getDays,
  getQueryParams,
  background,
  fetchData,
  getStocksToShow,
  getChartDays,
} from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

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

  // const [aaa, setAaa] = useState(<>a</>);
  // React.useEffect(async () => {
  //   const result = await axios(
  //     `http://www.database.lavina.lt/?Get,Analysis,WatchList`
  //   );
  //   // console.log(result.data.split("-"));
  //   setAaa(<WatchList list={result.data} />);
  // }, []);
  return (
    <div className="App">
      <WatchList />
      {/* {!!StocksToShow &&
        StocksToShow.map(
          (stock, key) => stock != "" && showStock(key, stock, Days, background)
        )} */}
    </div>
  );
}

export default App;
