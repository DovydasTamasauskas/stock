import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, SMA, DAILY, DAILY_GET } from "../consts/CONST.js";
import {
  getTechnicalAnalysis,
  getTimeSeries,
  getDivedent,
  getBullish,
  getBeerish,
} from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [Price, AddPrice] = useState([]);
  const [Sma, AddSma] = useState([]);
  const [Divident, AddDivident] = useState(0);

  useEffectAsync(async () => {
    const { price, divident, SmaArray } = await getData(symbol, days);
    AddPrice(price);
    AddDivident(divident);
    AddSma(SmaArray);
  }, symbol);

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
            showlegend: false,
          },
          {
            x: days,
            y: Sma,
            type: "scatter",
            marker: { color: "green" },
            name: "SMA",
            opacity: 0.2,
            showlegend: false,
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 440,
          title: symbol,
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
        config={{ displayModeBar: false }}
      />
      <div style={{ color: "red" }}>Bullish {getBullish(Price, days)}</div>
      <div style={{ color: "green" }}>Bearish {getBeerish(Price, days)}</div>
      <div style={{ color: "black" }}>
        Divident {Math.round((Divident + Number.EPSILON) * 100) / 100}
      </div>
    </div>
  );
}

const getData = async (symbol, days) => {
  const price = await getTimeSeries(
    `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
    DAILY
  );

  const divident = await getDivedent(
    `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
    DAILY,
    days.length
  );

  const SmaArray = await getTechnicalAnalysis(
    `${BACKEND_HOST}?Get,${SMA},${symbol}`,
    SMA
  );

  return { price, divident, SmaArray };
};

export default Stock;
