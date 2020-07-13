import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, MACD } from "../consts/CONST.js";
import { getTechnicalAnalysisMacd, getMinusPlius } from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [MacdHistPlius, AddMacdHistPlius] = useState([]);
  const [MacdHistMinus, AddMacdHitMinus] = useState([]);
  const [MacdSignal, AddMacdSignal] = useState([]);
  const [Macd, AddMacd] = useState([]);

  useEffectAsync(async () => {
    const { macd, macdSignal, macdHist } = await getTechnicalAnalysisMacd(
      `${BACKEND_HOST}?Get,${MACD},${symbol}`,
      MACD
    );
    const { plius, minus } = getMinusPlius(macdHist);
    AddMacdHistPlius(plius);
    AddMacdHitMinus(minus);
    AddMacdSignal(macdSignal);
    AddMacd(macd);
  }, symbol);

  return (
    <div style={{ backgroundColor: color, paddingBottom: 30 }}>
      <Plot
        data={[
          {
            x: days,
            y: MacdHistPlius,
            type: "bar",
            marker: { color: "green" },
            name: "MacdHist",
            showlegend: false,
          },
          {
            x: days,
            y: MacdHistMinus,
            type: "bar",
            marker: { color: "red" },
            name: "MacdHist",
            showlegend: false,
          },
          {
            x: days,
            y: Macd,
            type: "scatter",
            marker: { color: "blue" },
            name: "Macd",
            showlegend: false,
          },
          {
            x: days,
            y: MacdSignal,
            type: "scatter",
            marker: { color: "red" },
            name: "MacdSignal",
            showlegend: false,
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 440,
          title: symbol + " " + MACD,
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

export default Stock;
