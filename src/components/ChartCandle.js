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
  const [DaysOld, setDaysOld] = useState(0);
  const [AA, AddAA] = useState([]);

  useEffectAsync(async () => {
    const {
      stock: { open, close, high, low },
      SmaArray,
      daysOld,
    } = await getData(symbol);
    AddOpen(open);
    AddClose(close);
    AddLow(low);
    AddHigh(high);
    AddSma(SmaArray);
    setDaysOld(daysOld);
    AddAA(aaa(open));
  }, symbol);

  return (
    <div>
      <div>{DaysOld}</div>
      <div>{Close[0]}</div>
      <div>{AA.length !== 0 && AA.map((x, key) => renderUpDown(x, key))}</div>
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
          margin: {
            r: 50,
            t: 15,
            b: 10,
            l: 50,
          },
          width: window.innerWidth,
          height: 640,
          dragmode: "zoom",
          showlegend: false,
          xaxis: {
            autorange: true,
            domain: [0, 1],
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

const renderUpDown = (data, key) => {
  return (
    <a
      key={key}
      style={{
        color: getIndicatorColor(data.indicator),
        fontSize: 10 + data.days * 3,
      }}
    >
      {data.days}
    </a>
  );
};

const getIndicatorColor = (indicator) =>
  indicator === "up" ? "#228B22" : "#B22222";

const getData = async (symbol) => {
  const { open, close, high, low, daysOld } = await getTimeSeriesCandle(
    `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
    DAILY
  );

  const SmaArray = await getTechnicalAnalysis(
    `${BACKEND_HOST}?Get,${SMA},${symbol}`,
    SMA,
    symbol
  );

  return { stock: { open, close, high, low }, SmaArray, daysOld };
};

const aaa = (chart) => {
  var isUp = undefined;
  var result = [];
  var days;
  for (var i = 0; i < 30; i++) {
    if (chart[i] > chart[i + 1]) {
      if (isUp === true) {
        days = result[result.length - 1].days + 1;
        result.pop();
        result.push({ days: days, indicator: "up" });
      } else {
        result.push({ days: 1, indicator: "up" });
      }
      isUp = true;
    } else {
      if (isUp === false) {
        days = result[result.length - 1].days + 1;
        result.pop();
        result.push({ days: days, indicator: "down" });
      } else {
        result.push({ days: 1, indicator: "down" });
      }
      isUp = false;
    }
  }
  return result;
};

export default Stock;
