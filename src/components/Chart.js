import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { CHART_URL, SMA_URL } from '../consts/CONST.js';
import axios from 'axios';

function Stock({symbol}) {
  const [Data, AddData] = useState([]);
  const [Price, AddPrice] = useState([]);
  const [SMA, AddSMA] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        CHART_URL.replace("__symbol__", symbol),
      );
      for (var key in result.data['Time Series (Daily)']) {
        AddPrice(Price => [...Price, result.data['Time Series (Daily)'][key]['1. open']]);
        AddData(Data => [...Data, key]);
      }
    }
    fetchData();
  }, [symbol]);

  useEffect(() => {
    async function fetchData() {
      const result = await axios(
        SMA_URL.replace("__symbol__", symbol),
      );
      for (var key in result.data['Technical Analysis: SMA']) {
        AddSMA(SMA => [...SMA, result.data['Technical Analysis: SMA'][key]['SMA']]);
      }
    }
    fetchData();
  }, [symbol]);

  return (
      <Plot
        data={[
          {
            x: Data,
            y: Price,
            type: 'scatter',
            marker: {color: 'red'},
          },
          {
            x: Data,
            y: SMA,
            type: 'scatter',
            marker: {color: 'green'},
          }
        ]}
        layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
      />
  );
}

export default Stock;