/* eslint-disable no-use-before-define */
import React from "react";
import Chip from "@material-ui/core/Chip";
import TextField from "@material-ui/core/TextField";
import Autocomplete from "@material-ui/lab/Autocomplete";
import axios from "axios";
import { STOCKS } from "../../consts/CONST";
export default function FixedTags() {
  const [value, setValue] = React.useState([]);
  const [onChange, setOnChange] = React.useState(false);
  React.useEffect(async () => {
    const result = await axios(
      `http://www.database.lavina.lt/?Get,Analysis,WatchList`
    );
    setValue(result.data.split("-"));
  }, []);

  React.useEffect(() => {
    onChange &&
      axios(
        `http://www.database.lavina.lt/?Set,Analysis,WatchList,` +
          value.join("-")
      );
  }, [value]);
  return (
    <Autocomplete
      multiple
      id="fixed-tags-demo"
      value={value}
      onChange={(event, newValue) => {
        setValue([...newValue]);
        setOnChange(true);
      }}
      options={STOCKS}
      getOptionLabel={(option) => option}
      renderTags={(tagValue, getTagProps) =>
        tagValue.map((option, index) => (
          <Chip label={option} {...getTagProps({ index })} />
        ))
      }
      style={{ width: 500 }}
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
}
