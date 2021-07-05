import React, { useState, useEffect } from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  makeStyles,
  Autocomplete,
  Button,
} from "@material-ui/core";

import axios from "axios";

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 100,
  },
}));

function RateQuery() {
  const classes = useStyles();
  const [data, setData] = useState({ rates: {} });
  const [selectedCurrency, setSelectedCurrency] = useState();

  function handleSubmit(e, selectedCurrency) {
    e.preventDefault();
    axios
      .get(
        `https://rates2.dashretail.org/rates?source=dashretail&symbol=dash${selectedCurrency}`,
      )
      .then((res) => {
        const rates = res.data[0];
        setData({ rates });
        console.log(rates);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  function handleChange(e) {
    setSelectedCurrency(e.target.value);
    console.log(selectedCurrency);
  }

  return (
    <div>
      <FormControl className={classes.formControl}>
        <InputLabel type="text" placeholder="Select" value={selectedCurrency}>
          Select{" "}
        </InputLabel>
        <Select onChange={(e) => handleChange(e)}>
          <MenuItem id="usd" value={"usd"} onSubmit={(e) => handleSubmit(e)}>
            <Button disableElevation type="submit">
              USD
            </Button>
          </MenuItem>
          <MenuItem id="gbp" value={"gbp"} onSubmit={(e) => handleSubmit(e)}>
            <Button disableElevation type="submit">
              GBP
            </Button>
          </MenuItem>
          <MenuItem id="cad" value={"cad"} onSubmit={(e) => handleSubmit(e)}>
            <Button disableElevation type="submit">
              CAD
            </Button>
          </MenuItem>
          <MenuItem id="eur" value={"eur"} onSubmit={(e) => handleSubmit(e)}>
            <Button disableElevation type="submit">
              EUR
            </Button>
          </MenuItem>
        </Select>
      </FormControl>
      <div classname={classes.rates}>
        <p>
          {data.rates.baseCurrency}/{data.rates.quoteCurrency}:{" "}
          {data.rates.price}
        </p>
      </div>
    </div>
  );
}
export default RateQuery;
