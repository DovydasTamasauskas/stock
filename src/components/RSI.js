import React, { useState, useEffect } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, RSI } from "../consts/CONST.js";
import { getDays, getTechnicalAnalysis } from "../functions/func.js";
import axios from "axios";

function Stock({ symbol, days, color }) {
  const Date = getDays(days);
  const [Rsi, AddRsi] = useState([]);

  useEffect(async () => {
    const rsi = await getTechnicalAnalysis(
      `${BACKEND_HOST}?Get,${RSI},${symbol}`,
      RSI
    );
    AddRsi(rsi);
  }, [symbol]);

  return (
    <div style={{ backgroundColor: color, paddingBottom: 30 }}>
      <Plot
        data={[
          {
            x: Date,
            y: Rsi,
            type: "scatter",
            marker: { color: "black" },
            name: "RSI",
          },
          {
            type: "line",
            x: Date,
            y: new Array(days).fill([30]).flat(),
            marker: { color: "#B8860B" },
            opacity: 0.5,
          },
          {
            type: "line",
            x: Date,
            y: new Array(days).fill([70]).flat(),
            marker: { color: "#B8860B" },
            opacity: 0.5,
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 440,
          title: symbol + " " + RSI,
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
      />
    </div>
  );
}

export default Stock;
