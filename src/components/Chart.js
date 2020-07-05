import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { API_Call } from '../consts/CONST.js';

function Stock({symbol}) {
  const [X, AddX] = useState([]);
  const [Y, AddY] = useState([]);

  useEffect(() => {
    //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSLA&outputsize=compact&apikey=HGJWFG4N8AQ66ICD
    fetch(API_Call.replace("__symbol__", symbol))
    .then(
      function(response) {
        return response.json();
      }
    )
    .then(
      function(data) {
        for (var key in data['Time Series (Daily)']) {
          AddY(Y => [...Y, key]);
          AddX(X => [...X, data['Time Series (Daily)'][key]['1. open']]);
        }
      }
    )
  }, []);

  return (
      <Plot
        data={[
          {
            x: Y,
            y: X,
            type: 'scatter',
            mode: 'lines+markers',
            marker: {color: 'red'},
          }
        ]}
        layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
      />
  );
}

export default Stock;