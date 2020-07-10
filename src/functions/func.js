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
  const result = await axios(endpoint);
  var array = [];
  for (var key in result.data[`Technical Analysis: ${func}`]) {
    array.push(result.data[`Technical Analysis: ${func}`][key][func]);
  }
  return array;
};
