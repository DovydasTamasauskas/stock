import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, MACD } from "../../consts/CONST.js";
import { getTechnicalAnalysis, getMinusPlius } from "../../functions/func.js";
import useEffectAsync from "../../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [MacdHistPlius, AddMacdHistPlius] = useState([]);
  const [MacdHistMinus, AddMacdHitMinus] = useState([]);
  const [MacdSignal, AddMacdSignal] = useState([]);
  const [Macd, AddMacd] = useState([]);

  useEffectAsync(async () => {
    const { macd, macdSignal, macdHist } = await getTechnicalAnalysis(
      `${BACKEND_HOST}?Get,${MACD},${symbol}`,
      MACD,
      symbol
    );
    const { plius, minus } = getMinusPlius(macdHist);
    AddMacdHistPlius(plius);
    AddMacdHitMinus(minus);
    AddMacdSignal(macdSignal);
    AddMacd(macd);
  }, symbol);

  return (
    <div>
      <Plot
        data={[
          {
            x: days,
            y: MacdHistPlius,
            type: "bar",
            marker: { color: "#228B22" },
            name: "MacdHist",
            showlegend: false,
          },
          {
            x: days,
            y: MacdHistMinus,
            type: "bar",
            marker: { color: "#B22222" },
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
            marker: { color: "#B22222" },
            name: "MacdSignal",
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
          height: 240,
          plot_bgcolor: color,
          paper_bgcolor: color,
          xaxis: {
            showgrid: false,
          },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

export default Stock;
