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

export const getTimeSeries = async (endpoint, func) => {
  const endpointData = await axios(endpoint);
  var result = [];
  for (var key in endpointData.data[`Time Series (${func})`]) {
    result.push(endpointData.data[`Time Series (${func})`][key]["1. open"]);
  }
  return result;
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

export const getBullish = (price, days) => {
  var result = 0;
  for (let i = 0; i < price.length - 1 && days !== 0; i++) {
    if (price[i] > price[i + 1]) {
      result++;
    }
    days--;
  }
  return result;
};

export const getBeerish = (price, days) => {
  var result = 0;
  for (let i = 0; i < price.length - 1 && days !== 0; i++) {
    if (price[i] < price[i + 1]) {
      result++;
    }
    days--;
  }
  return result;
};
