// import React, { useState } from "react";
// import Plot from "react-plotly.js";
// import { BACKEND_HOST, RSI } from "./consts/CONST.js";
// import { getTechnicalAnalysis } from "../functions/func.js";
// import useEffectAsync from "../indicators/helpers/useEffectAsync.js";

// function Stock({ symbol, days, color }) {
//   const [Rsi, AddRsi] = useState([]);

//   useEffectAsync(async () => {
//     const rsi = await getTechnicalAnalysis(
//       `${BACKEND_HOST}?Get,${RSI},${symbol}`,
//       RSI,
//       symbol
//     );
//     AddRsi(rsi);
//   }, symbol);

//   return (
//     <div>
//       <Plot
//         data={[
//           {
//             x: days,
//             y: Rsi,
//             type: "scatter",
//             marker: { color: "black" },
//             name: "RSI",

//             showlegend: false,
//           },
//           {
//             type: "line",
//             x: days,
//             y: new Array(days.length).fill([30]).flat(),
//             marker: { color: "#B8860B" },
//             opacity: 0.5,
//             showlegend: false,
//           },
//           {
//             type: "line",
//             x: days,
//             y: new Array(days.length).fill([70]).flat(),
//             marker: { color: "#B8860B" },
//             opacity: 0.5,
//             showlegend: false,
//           },
//         ]}
//         layout={{
//           margin: {
//             r: 50,
//             t: 5,
//             b: 0,
//             l: 50,
//           },
//           width: window.innerWidth,
//           height: 240,
//           plot_bgcolor: color,
//           paper_bgcolor: color,
//           xaxis: {
//             showgrid: false,
//           },
//         }}
//         config={{ displayModeBar: false }}
//       />
//     </div>
//   );
// }

// export default Stock;
