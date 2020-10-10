/* eslint-disable no-use-before-define */
import React from "react";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";

import { STOCKS } from "../../indicators/consts/CONST";

const WatchList = () => {
  const [value, setValue] = React.useState(undefined);
  React.useEffect(() => {
    value && window.open("http://localhost:3000/?stock=" + value, "_blank")
  }, [value]);
  return (
    <Autocomplete
      id="combo-box-demo"
      options={STOCKS}
      onChange={(event, newValue) => {
        setValue(newValue);
      }}
      getOptionLabel={(option) => option}
      renderInput={(params) => <TextField {...params} label="Stock info" variant="outlined" />}
  />
  );
};

export default WatchList;
