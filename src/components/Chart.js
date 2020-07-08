import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, SMA, DAILY } from "../consts/CONST.js";
import axios from "axios";

function Stock({ symbol, days, color }) {
  const [Date, AddDate] = useState([]);
  const [Price, AddPrice] = useState([]);
  const [SMA, AddSMA] = useState([]);
  const [Bull, AddBull] = useState(0);
  const [Bear, AddBear] = useState(0);
  const [Divident, AddDivident] = useState(0);

  useEffect(async () => {
    var { Price, Divident } = await getChartData(symbol, days);
    AddPrice(Price);
    AddDivident(Divident);
    AddDate(getDays(days));
    var SMAArray = await getSMA(symbol);
    AddSMA(SMAArray);
    for (let i = 0; i < Price.length - 1; i++) {
      if (Price[i] > Price[i + 1]) {
        AddBull((Bull) => Bull + 1);
      } else {
        AddBear((Bear) => Bear + 1);
      }
    }
  }, [symbol]);

  return (
    <div style={{ backgroundColor: color, paddingBottom: 30 }}>
      <Plot
        data={[
          {
            x: Date,
            y: Price,
            type: "scatter",
            marker: { color: "black" },
            name: "Stock",
          },
          {
            x: Date,
            y: SMA,
            type: "scatter",
            marker: { color: "green" },
            name: "SMA",
            opacity: 0.5,
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 440,
          title: symbol,
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
      />
      <div style={{ color: "red", backgroundColor: color }}>Bullish {Bull}</div>
      <div style={{ color: "green" }}>Bearish {Bear}</div>
      <div style={{ color: "black" }}>Divident {Divident}</div>
    </div>
  );
}

const getSMA = async (symbol) => {
  //https://www.alphavantage.co/query?function=SMA&symbol=TSLA&interval=daily&time_period=10&series_type=open&apikey=HGJWFG4N8AQ66ICD
  //const result = await axios(SMA_URL.replace("__symbol__", symbol));
  const result = await axios(`${BACKEND_HOST}?Get,${SMA},${symbol}`);
  var array = [];
  for (var key in result.data["Technical Analysis: SMA"]) {
    array.push(result.data["Technical Analysis: SMA"][key]["SMA"]);
  }
  return array;
};

const getChartData = async (symbol, days) => {
  //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSLA&outputsize=compact&apikey=HGJWFG4N8AQ66ICD
  //const result = await axios(CHART_URL.replace("__symbol__", symbol));
  const result = await axios(`${BACKEND_HOST}?Get,${DAILY},${symbol}`);
  var Price = [],
    Divident = 0,
    count = 0;
  for (var key in result.data["Time Series (Daily)"]) {
    Price.push(result.data["Time Series (Daily)"][key]["1. open"]);
    if (
      result.data["Time Series (Daily)"][key]["7. dividend amount"] !== 0 &&
      count < days
    ) {
      Divident += parseFloat(
        result.data["Time Series (Daily)"][key]["7. dividend amount"]
      );
      count++;
    }
  }
  return { Price, Divident };
};

const getDays = (days) => {
  var date = new Date();
  var result = [];

  for (var i = 0; i < days; i++) {
    date.setDate(date.getDate() - 1);
    result.push(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  return result;
};

export default Stock;
