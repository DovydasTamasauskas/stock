import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, SMA, DAILY } from "../consts/CONST.js";
import axios from "axios";
import { getDays, getTechnicalAnalysis } from "../functions/func.js";

function Stock({ symbol, days, color }) {
  const Date = getDays(days);
  const [Price, AddPrice] = useState([]);
  const [Sma, AddSma] = useState([]);
  const [Bull, AddBull] = useState(0);
  const [Bear, AddBear] = useState(0);
  const [Divident, AddDivident] = useState(0);

  useEffect(async () => {
    var { Price, Divident } = await getChartData(symbol, days);
    AddPrice(Price);
    AddDivident(Divident);
    var SmaArray = await getTechnicalAnalysis(
      `${BACKEND_HOST}?Get,${SMA},${symbol}`,
      SMA
    );
    AddSma(SmaArray);
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
            y: Sma,
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

export default Stock;
