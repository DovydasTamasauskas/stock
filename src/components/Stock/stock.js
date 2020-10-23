/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { STOCKS, HOST } from "../../indicators/consts/CONST";

const WatchList = () => {
  const [value, setValue] = React.useState(undefined);
  const [days, setDays] = React.useState(100);
  React.useEffect(() => {
    value && window.open(HOST+"/?stock=" + value + "&days=" + days, "_blank")
  }, [value]);
  return (
    <>
      <Autocomplete
        id="stock"
        options={STOCKS}
        onChange={(event, newValue) => {
          setValue(newValue);
        }}
        getOptionLabel={(option) => option}
        renderInput={(params) => <TextField {...params} label="Stock info" variant="outlined" />}
      />
      <TextField
        id="Days"
        label="Days"
        variant="outlined"
        onChange={(event) => {
          setDays(event.target.value);
        }}
      />
  </>
  );
};

export default WatchList;
