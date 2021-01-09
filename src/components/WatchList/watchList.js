/* eslint-disable no-use-before-define */
import React from "react";
import axios from "axios";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import { BACKEND_HOST, STOCKS } from "../../indicators/consts/CONST";

const WatchList = () => {
  const [value, setValue] = React.useState([]);
  React.useEffect(async () => {
    const result = await axios(
      `${BACKEND_HOST}?Get,Analysis,WatchList`
    );
    setValue(result.data.split("-"));
  }, []);

  React.useEffect(() => {
    value.length > 0 &&
      axios(
        `${BACKEND_HOST}?Set,Analysis,WatchList,` +
          value.join("-")
      );
  }, [value]);
  return (
    <Autocomplete
      multiple
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue]);
      }}
      options={STOCKS}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      renderInput={(params) => (
        <TextField
          {...params}
          label="Watch List"
          variant="outlined"
          placeholder="Stocks"
        />
      )}
    />
  );
};

export default WatchList;
