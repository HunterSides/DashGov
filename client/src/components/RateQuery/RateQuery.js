import React, { useState } from "react";

import axios from "axios";
import Paper from "@material-ui/core/Paper";
import useStyles from "./styles";
import { MenuItem, Select, Input } from "@material-ui/core";
import Typography from "../Wrappers";
const options = [
  { value: "usd", label: "USD" },
  { value: "gbp", label: "GBP" },
  { value: "cad", label: "CAD" },
  { value: "eur", label: "EUR" },
];

function RateQueryTwo() {
  const [selectedOption, setSelectedOption] = useLocalStorage("name", "Bob");
  const [data, setData] = useState({ rates: {} });
  const classes = useStyles();
  function handleFetch(selectedOption) {
    axios
      .get(
        `https://rates2.dashretail.org/rates?source=dashretail&symbol=dash${selectedOption}`,
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

  return (
    <div className="RateQueryTwo">
      <form onChange={handleFetch}>
        <Select
          defaultValue={selectedOption}
          onChange={setSelectedOption}
          options={options}
        />
      </form>
      <div>
        <Paper>
          <p>
            {data.rates.baseCurrency}/{data.rates.quoteCurrency}:{" "}
            {data.rates.price}
          </p>
        </Paper>
      </div>
    </div>
  );
}

//function which uses react-hook use-state to save to localstorage
function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.log(error);
      return initialValue;
    }
  });
  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      //save state
      setStoredValue(valueToStore);
      // save to local storage
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.log(error);
    }
  };
  return [storedValue, setValue];
}
export default RateQueryTwo;
