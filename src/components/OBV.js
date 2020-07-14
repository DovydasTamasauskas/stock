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
    <div>
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
          margin: {
            r: 50,
            t: 15,
            b: 10,
            l: 50,
          },
          width: window.innerWidth,
          height: 100,
          plot_bgcolor: color,
          paper_bgcolor: color,
          xaxis: {
            showgrid: false,
            zeroline: false,
            showline: false,
          },
          yaxis: {
            showline: false,
            zeroline: false,
          },
        }}
        config={{ displayModeBar: false }}
      />
    </div>
  );
}

export default Stock;
