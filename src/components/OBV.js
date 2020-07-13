import React, { useState } from "react";
import Plot from "react-plotly.js";
import { BACKEND_HOST, OBV } from "../consts/CONST.js";
import { getTechnicalAnalysis } from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [Obv, AddObv] = useState([]);

  useEffectAsync(async () => {
    const obv = await getTechnicalAnalysis(
      `${BACKEND_HOST}?Get,${OBV},${symbol}`,
      OBV
    );
    AddObv(obv);
  }, symbol);

  return (
    <div style={{ backgroundColor: color }}>
      <Plot
        data={[
          {
            x: days,
            y: Obv,
            type: "bar",
            marker: { color: "black" },
            name: "Stock",
          },
        ]}
        layout={{
          width: window.innerWidth,
          height: 240,
          title: symbol,
          plot_bgcolor: color,
          paper_bgcolor: color,
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

export default Stock;
