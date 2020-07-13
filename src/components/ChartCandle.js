import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, SMA, DAILY } from "../consts/CONST.js";
import {
  getTechnicalAnalysis,
  getTimeSeriesCandle,
} from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [Open, AddOpen] = useState([]);
  const [Close, AddClose] = useState([]);
  const [Low, AddLow] = useState([]);
  const [High, AddHigh] = useState([]);
  const [Sma, AddSma] = useState([]);

  useEffectAsync(async () => {
    const {
      stock: { open, close, high, low },
      SmaArray,
    } = await getData(symbol);
    AddOpen(open);
    AddClose(close);
    AddLow(low);
    AddHigh(high);
    AddSma(SmaArray);
  }, symbol);

  return (
    <div style={{ backgroundColor: color }}>
      <Plot
        data={[
          {
            x: days,
            close: Close,
            open: Open,
            low: Low,
            high: High,
            decreasing: { line: { color: "#B22222" } },
            increasing: { line: { color: "#228B22" } },
            line: { color: "rgba(31,119,180,1)" },
            type: "candlestick",
            xaxis: "x",
            yaxis: "y",
          },
          {
            x: days,
            y: Sma,
            type: "scatter",
            marker: { color: "black" },
            name: "SMA",
            opacity: 0.5,
            showlegend: false,
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 640,
          dragmode: "zoom",
          showlegend: false,
          xaxis: {
            autorange: true,
            domain: [0, 1],
            // range: ["2020-06-03 12:00", "2020-07-10 12:00"],
            // rangeslider: { range: ["2020-01-10 12:00", "2020-07-10 12:00"] },
            title: "Date",
            type: "date",
          },
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

const getData = async (symbol) => {
  const { open, close, high, low } = await getTimeSeriesCandle(
    `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
    DAILY
  );

  const SmaArray = await getTechnicalAnalysis(
    `${BACKEND_HOST}?Get,${SMA},${symbol}`,
    SMA
  );

  return { stock: { open, close, high, low }, SmaArray };
};

export default Stock;
