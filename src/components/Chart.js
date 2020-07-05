import React, { useState, useEffect } from 'react';
import Plot from 'react-plotly.js';
import { CHART_URL, SMA_URL } from '../consts/CONST.js';
import axios from 'axios';

function Stock({ symbol }) {
  const [Data, AddData] = useState([]);
  const [Price, AddPrice] = useState([]);
  const [SMA, AddSMA] = useState([]);
  const [Bull, AddBull] = useState(0);
  const [Bear, AddBear] = useState(0);
  const [Divident, AddDivident] = useState(0);

  useEffect(() => {
    //https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=TSLA&outputsize=compact&apikey=HGJWFG4N8AQ66ICD
    async function fetchData() {
      const result = await axios(
        CHART_URL.replace("__symbol__", symbol),
      );
      let divident = 0;
      for (var key in result.data['Time Series (Daily)']) {
        AddPrice(Price => [...Price, result.data['Time Series (Daily)'][key]['1. open']]);
        AddData(Data => [...Data, key]);
        divident = result.data['Time Series (Daily)'][key]['7. dividend amount']
        if(divident != 0){ 
          AddDivident(Divident => Divident+parseFloat(divident));
        }
      }
    }
    fetchData();
  }, [symbol]);

  useEffect(async() => {
    var SMAArray = await getSMA(symbol);
    AddSMA(SAM => SMAArray);
  }, [symbol]);

  useEffect(() => {
    for (let i = 0; i < Price.length-1; i++){
      if(Price[i] > Price[i+1]){
        AddBull(Bull => Bull+1);
      }else{
        AddBear(Bear => Bear+1);
      }
    }
  }, [Price.length == 100]);

  return (
    <div>
    <h1>{symbol}</h1>
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
        layout={{width: window.innerWidth, height: 440}}
      />
      <div style={{color: "red"}}>Bullish {Bull}</div>
      <div style={{color: "green"}}>Bearish {Bear}</div>
      <div style={{color: "black"}}>Divident {Divident}</div>
  </div>
  );
}

  async function getSMA(symbol) {
    //https://www.alphavantage.co/query?function=SMA&symbol=TSLA&interval=daily&time_period=10&series_type=open&apikey=HGJWFG4N8AQ66ICD
    const result = await axios(
      SMA_URL.replace("__symbol__", symbol),
    );
    var array = [];
    for (var key in result.data['Technical Analysis: SMA']) {
      array.push(result.data['Technical Analysis: SMA'][key]['SMA']);
    }
    return array;
  }

export default Stock;