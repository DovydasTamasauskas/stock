import axios from "axios";

export const getDays = (days) => {
  var date = new Date();
  var result = [];

  for (var i = 0; i < days; i++) {
    date.setDate(date.getDate() - 1);
    result.push(
      date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
    );
  }

  return result;
};

export const getTechnicalAnalysis = async (endpoint, func) => {
  const endpointData = await axios(endpoint);
  var result = [];
  for (var key in endpointData.data[`Technical Analysis: ${func}`]) {
    result.push(endpointData.data[`Technical Analysis: ${func}`][key][func]);
  }
  return result;
};

export const getTechnicalAnalysisMacd = async (endpoint, func) => {
  const endpointData = await axios(endpoint);
  var macd = [],
    macdSignal = [],
    macdHist = [];
  for (var key in endpointData.data[`Technical Analysis: ${func}`]) {
    macd.push(endpointData.data[`Technical Analysis: ${func}`][key][func]);
    macdSignal.push(
      endpointData.data[`Technical Analysis: ${func}`][key]["MACD_Signal"]
    );
    macdHist.push(
      endpointData.data[`Technical Analysis: ${func}`][key]["MACD_Hist"]
    );
  }
  return { macd, macdSignal, macdHist };
};

export const getTechnicalAnalysisBBands = async (endpoint, func) => {
  const endpointData = await axios(endpoint);
  var lower = [],
    middle = [],
    upper = [];
  for (var key in endpointData.data[`Technical Analysis: ${func}`]) {
    lower.push(
      endpointData.data[`Technical Analysis: ${func}`][key]["Real Lower Band"]
    );
    middle.push(
      endpointData.data[`Technical Analysis: ${func}`][key]["Real Middle Band"]
    );
    upper.push(
      endpointData.data[`Technical Analysis: ${func}`][key]["Real Upper Band"]
    );
  }
  return { lower, middle, upper };
};

export const getMinusPlius = (macdHist) => {
  var plius = [],
    minus = [];
  for (var i = 0; i < macdHist.length; i++) {
    if (parseFloat(macdHist[i]) > 0) {
      plius.push(macdHist[i]);
      minus.push("0");
    } else if (parseFloat(macdHist[i]) < 0) {
      plius.push("0");
      minus.push(macdHist[i]);
    } else {
      plius.push("0");
      minus.push("0");
    }
  }
  return { plius, minus };
};

export const getTimeSeries = async (endpoint, func) => {
  const endpointData = await axios(endpoint);
  var result = [];
  for (var key in endpointData.data[`Time Series (${func})`]) {
    result.push(endpointData.data[`Time Series (${func})`][key]["1. open"]);
  }
  return result;
};

export const getTimeSeriesCandle = async (endpoint, func) => {
  const endpointData = await axios(endpoint);
  var open = [],
    close = [],
    high = [],
    low = [];
  for (var key in endpointData.data[`Time Series (${func})`]) {
    open.push(endpointData.data[`Time Series (${func})`][key]["1. open"]);
    close.push(endpointData.data[`Time Series (${func})`][key]["4. close"]);
    high.push(endpointData.data[`Time Series (${func})`][key]["2. high"]);
    low.push(endpointData.data[`Time Series (${func})`][key]["3. low"]);
  }
  var daysOld = 1;
  while (
    !endpointData.data[`Time Series (${func})`][getDateToString(daysOld)]
  ) {
    daysOld++;
  }
  return {
    open,
    close,
    high,
    low,
    daysOld,
  };
};

export const getDivedent = async (endpoint, func, days) => {
  const endpointData = await axios(endpoint);
  var result = 0;
  for (var key in endpointData.data[`Time Series (${func})`]) {
    if (
      endpointData.data[`Time Series (${func})`][key]["7. dividend amount"] !==
        0 &&
      days > 0
    ) {
      result += parseFloat(
        endpointData.data[`Time Series (${func})`][key]["7. dividend amount"]
      );
    }
    days--;
  }
  return result;
};

const getDateToString = (minus) => {
  var dateNow = new Date();
  dateNow.setDate(dateNow.getDate() - minus);
  return (
    dateNow.getFullYear() +
    "-" +
    (dateNow.getMonth() > 9
      ? dateNow.getMonth() + 1
      : "0" + (dateNow.getMonth() + 1)) +
    "-" +
    dateNow.getDate()
  );
};

// export const getBullish = (price, days) => {
//   var result = 0;
//   for (let i = 0; i < price.length - 1 && days !== 0; i++) {
//     if (price[i] > price[i + 1]) {
//       result++;
//     }
//     days--;
//   }
//   return result;
// };

// export const getBeerish = (price, days) => {
//   var result = 0;
//   for (let i = 0; i < price.length - 1 && days !== 0; i++) {
//     if (price[i] < price[i + 1]) {
//       result++;
//     }
//     days--;
//   }
//   return result;
// };
