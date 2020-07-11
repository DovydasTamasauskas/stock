import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, SMA, DAILY } from "../consts/CONST.js";
import {
  getTechnicalAnalysis,
  getTimeSeries,
  getDivedent,
  getBullish,
  getBeerish,
} from "../functions/func.js";

function Stock({ symbol, days, color }) {
  const [Price, AddPrice] = useState([]);
  const [Sma, AddSma] = useState([]);
  const [Divident, AddDivident] = useState(0);

  useEffect(async () => {
    const price = await getTimeSeries(
      `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
      DAILY
    );
    AddPrice(price);
    const divident = await getDivedent(
      `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
      DAILY,
      days.length
    );
    AddDivident(divident);
    const SmaArray = await getTechnicalAnalysis(
      `${BACKEND_HOST}?Get,${SMA},${symbol}`,
      SMA
    );
    AddSma(SmaArray);
  }, [symbol]);

  return (
    <div style={{ backgroundColor: color, paddingBottom: 30 }}>
      <Plot
        data={[
          {
            x: days,
            y: Price,
            type: "scatter",
            marker: { color: "black" },
            name: "Stock",
          },
          {
            x: days,
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
      <div style={{ color: "red" }}>Bullish {getBullish(Price, days)}</div>
      <div style={{ color: "green" }}>Bearish {getBeerish(Price, days)}</div>
      <div style={{ color: "black" }}>
        Divident {Math.round((Divident + Number.EPSILON) * 100) / 100}
      </div>
    </div>
  );
}

export default Stock;
