import React, { useState } from "react";
import { BACKEND_HOST, DAILY } from "./consts/CONST.js";
import { getDivedent } from "../functions/func.js";
import useEffectAsync from "../helpers/useEffectAsync.js";

function Stock({ symbol, days, color }) {
  const [Divident, AddDivident] = useState(0);

  useEffectAsync(async () => {
    const { divident } = await getData(symbol, days);
    AddDivident(divident);
  }, symbol);

  return (
    <div style={{ backgroundColor: color }}>
      <div style={{ color: "black" }}>
        Divident {Math.round((Divident + Number.EPSILON) * 100) / 100}
      </div>
    </div>
  );
}

const getData = async (symbol, days) => {
  const divident = await getDivedent(
    `${BACKEND_HOST}?Get,${DAILY},${symbol}`,
    DAILY,
    days.length
  );

  return { divident };
};

export default Stock;
