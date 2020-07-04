import React from 'react';
import Plot from 'react-plotly.js';

class Stock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      STOCK_Y: [],
      STOCK_X: []
    }
  }

  componentDidMount() {
    this.fetchStock();
  }

  fetchStock() {
    const pointerToThis = this;
    const API_KEY = 'HGJWFG4N8AQ66ICD';
    let StockSymbol = 'TSLA';
    let API_Call = `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${StockSymbol}&outputsize=compact&apikey=${API_KEY}`;
    let STOCK_Y = [];
    let STOCK_X = [];
    console.log(API_Call);
    fetch(API_Call)
      .then(
        function(response) {
          return response.json();
        }
      )
      .then(
        function(data) {
          for (var key in data['Time Series (Daily)']) {
            STOCK_Y.push(key);
            STOCK_X.push(data['Time Series (Daily)'][key]['1. open']);
          }
          pointerToThis.setState({
            STOCK_Y: STOCK_Y,
            STOCK_X: STOCK_X
          });
        }
      )
  }


  render() {
    return (
      <div>

        <h1>Stock Market</h1>
        <Plot
          data={[
            {
              x: this.state.STOCK_Y,
              y: this.state.STOCK_X,
              type: 'scatter',
              mode: 'lines+markers',
              marker: {color: 'red'},
            }
          ]}
          layout={{width: 720, height: 440, title: 'A Fancy Plot'}}
        />
      </div>
    )
  }
}

export default Stock;