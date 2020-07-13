import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, RSI } from "../consts/CONST.js";
import { getTechnicalAnalysis } from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [Rsi, AddRsi] = useState([]);

  useEffectAsync(async () => {
    const rsi = await getTechnicalAnalysis(
      `${BACKEND_HOST}?Get,${RSI},${symbol}`,
      RSI
    );
    AddRsi(rsi);
  }, symbol);

  return (
    <div style={{ backgroundColor: color, paddingBottom: 30 }}>
      <Plot
        data={[
          {
            x: days,
            y: Rsi,
            type: "scatter",
            marker: { color: "black" },
            name: "RSI",

            showlegend: false,
          },
          {
            type: "line",
            x: days,
            y: new Array(days.length).fill([30]).flat(),
            marker: { color: "#B8860B" },
            opacity: 0.5,
            showlegend: false,
          },
          {
            type: "line",
            x: days,
            y: new Array(days.length).fill([70]).flat(),
            marker: { color: "#B8860B" },
            opacity: 0.5,
            showlegend: false,
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 440,
          title: symbol + " " + RSI,
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

export default Stock;
