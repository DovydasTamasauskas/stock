import axios from "axios";
import {
  STOCKS,
  DEFAULT_DAYS_LONG,
  DEFAULT_PAGE_SIZE,
  DAILY as _DAILY,
  RSI as _RSI,
  MACD as _MACD,
  SMA as _SMA,
  BACKEND_HOST,
} from "../consts/CONST.js";

export const isUpToDay = (d) => {
  var date = new Date();
  var weekDay = date.getDay();
  var add = 0;
  add += weekDay === 0 ? 1 : 0;
  add += weekDay === 1 ? 2 : 0;

  return new Date(d).getDate()+1 === date.getDate()-add;
}

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

export const getTechnicalAnalysis = async (endpoint, indicator, stock) => {
  const techAnalys = parseTechData(indicator);
  return axios(endpoint)
    .then((res) =>
      Object.values(res.data[`Technical Analysis: ${indicator}`]).map(
        techAnalys
      )
    )
    .then((res) =>
      isFloat(res)
        ? res
        : {
            macdSignal: Object.values(res).map((x) => x["MACD_Signal"]),
            macdHist: Object.values(res).map((x) => x["MACD_Hist"]),
            macd: Object.values(res).map((x) => x["MACD"]),
          }
    )
    .catch(() => {
      return { macdSignal: [], macdHist: [], macd: [] };
    });
};

const parseTechData = (indicator) => {
  switch (indicator) {
    case _MACD:
      return (x) => x;
    default:
      return (x) => x[indicator];
  }
};

const isFloat = (res) => !isNaN(parseFloat(Object.values(res)[0]));

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
    low = [],
    lastUpdateDate = null;
  for (var key in endpointData.data[`Time Series (${func})`]) {
    open.push(endpointData.data[`Time Series (${func})`][key]["1. open"]);
    close.push(endpointData.data[`Time Series (${func})`][key]["4. close"]);
    high.push(endpointData.data[`Time Series (${func})`][key]["2. high"]);
    low.push(endpointData.data[`Time Series (${func})`][key]["3. low"]);
    lastUpdateDate = lastUpdateDate == null ? key : lastUpdateDate;
  }
  return {
    open,
    close,
    high,
    low,
    daysOld: lastUpdateDate,
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

export const findDuplicates = (arr) => {
  let sorted_arr = arr.slice().sort();
  let results = [];
  for (let i = 0; i < sorted_arr.length - 1; i++) {
    if (sorted_arr[i + 1] === sorted_arr[i]) {
      results.push(sorted_arr[i]);
    }
  }
  results.length !== 0 && console.log("duplicates stocks", results);
};

export const getQueryParams = () => {
  const queryStocks = parseToInteger(
    new URLSearchParams(window.location.search).get("stocks")
  );
  return {
    stocks: queryStocks,
    days: new URLSearchParams(window.location.search).get("days"),
    stock: new URLSearchParams(window.location.search).get("stock"),
    all: new URLSearchParams(window.location.search).get("all"),
    analysis: new URLSearchParams(window.location.search).get("analysis"),
  };
};

const parseToInteger = (string) => {
  const parsed = parseInt(string);
  return isNaN(parsed) ? 0 : parsed;
};

export const background = (key) => (key % 2 === 0 ? "#DCDCDC" : "#A9A9A9");

export const fetchData = (symbol) => {
  axios(`${BACKEND_HOST}?VFJX12SNBPEWKHQB,${_DAILY},${symbol}`);
  axios(`${BACKEND_HOST}?VFJX12SNBPEWKHQB,${_RSI},${symbol}`);
  axios(`${BACKEND_HOST}?VFJX12SNBPEWKHQB,${_MACD},${symbol}`);
  axios(`${BACKEND_HOST}?VFJX12SNBPEWKHQB,${_SMA},${symbol}`);
  window.location.reload(false);
};

export const getStocksToShow = async (params) => {
  if (params.analysis !== null) {
    const endpointData = await axios(
      `http://www.database.lavina.lt/?Get,Analysis,${params.analysis}`
    );
    console.log(
      "link",
      `http://www.database.lavina.lt/?Get,Analysis,${params.analysis}`
    );
    return endpointData.data.split("-");
  }

  if (params.stock !== null) {
    return [params.stock];
  }

  if (params.all !== null) {
    return STOCKS;
  }

  return STOCKS.slice(
    params.stocks * DEFAULT_PAGE_SIZE,
    (params.stocks + 1) * DEFAULT_PAGE_SIZE
  );
};

export const getChartDays = (QueryParams) =>
  QueryParams.days > 1 && QueryParams.days < 365 * 15
    ? getDays(QueryParams.days)
    : getDays(DEFAULT_DAYS_LONG);

export const calculateAnalysis = (open, close) => {
  return {
    open: calculate(open),
    close: calculate(close),
    chart: calculateChart(open, close),
  };
};

const calculate = (chart) => {
  var isUp = undefined;
  var result = [];
  var days;
  for (var i = 0; i < 30; i++) {
    if (chart[i] > chart[i + 1]) {
      if (isUp === true) {
        days = result[result.length - 1].days + 1;
        result.pop();
        result.push({ days: days, indicator: "up" });
      } else {
        result.push({ days: 1, indicator: "up" });
      }
      isUp = true;
    } else {
      if (isUp === false) {
        days = result[result.length - 1].days + 1;
        result.pop();
        result.push({ days: days, indicator: "down" });
      } else {
        result.push({ days: 1, indicator: "down" });
      }
      isUp = false;
    }
  }
  return result;
};

const calculateChart = (open, close) => {
  var isUp = undefined;
  var result = [];
  var days;
  for (var i = 0; i < 30; i++) {
    if (open[i] < close[i]) {
      if (isUp === true) {
        days = result[result.length - 1].days + 1;
        result.pop();
        result.push({ days: days, indicator: "up" });
      } else {
        result.push({ days: 1, indicator: "up" });
      }
      isUp = true;
    } else {
      if (isUp === false) {
        days = result[result.length - 1].days + 1;
        result.pop();
        result.push({ days: days, indicator: "down" });
      } else {
        result.push({ days: 1, indicator: "down" });
      }
      isUp = false;
    }
  }
  return result;
};
