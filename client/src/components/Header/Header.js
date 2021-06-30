import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  AppBar,
  Toolbar,
  Select,
  Input,
  MenuItem,
  TextField,
} from "@material-ui/core";

import {
  Menu as MenuIcon,
  ArrowBack as ArrowBackIcon,
} from "@material-ui/icons";
import classNames from "classnames";
import useStyles from "./styles";
import { Typography } from "../Wrappers";
import DashLogo from "../../images/DashLogo.svg";

// context
import {
  useLayoutState,
  useLayoutDispatch,
  toggleSidebar,
} from "../../context/LayoutContext";

export default function Header(props) {
  var classes = useStyles();

  // global
  var layoutState = useLayoutState();
  var layoutDispatch = useLayoutDispatch();

  // local

  var [value, setValue] = useLocalStorage("value", "usd");

  var [data, setData] = useState({ rates: {} });

  useEffect(() => {
    const fetchData = async () => {
      await axios
        .get(
          `https://rates2.dashretail.org/rates?source=dashretail&symbol=dash${value}`,
        )
        .then((res) => {
          const rates = res.data[0];

          setData({ rates });
        });
    };
    const timer = setTimeout(() => {
      fetchData();
    }, 100);

    return () => clearTimeout(timer);
  }, [data]);

  //############################

  //############################################
  return (
    <AppBar position="fixed" elevation="0" className={classes.appBar}>
      <Toolbar className={classes.toolbar}>
        {/*
        <IconButton
          onClick={() => toggleSidebar(layoutDispatch)}
          className={classNames(
            classes.headerMenuButtonSandwich,
            classes.headerMenuButtonCollapse,
          )}
        >
          {layoutState.isSidebarOpened ? (
            <ArrowBackIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          ) : (
            <MenuIcon
              classes={{
                root: classNames(
                  classes.headerIcon,
                  classes.headerIconCollapse,
                ),
              }}
            />
          )}
        </IconButton>
            */}
        <img src={DashLogo} className={classes.dashGovWhite} alt="Dash Logo" />

        <div className={classes.grow} />

        <Typography
          size="h6"
          variant="subtitle"
          weight="bold"
          className={classes.dashRate}
        >
          Dash Price:{" "}
          <Typography
            size="h6"
            variant="subtitle"
            color="text"
            weight="light"
            className={classes.priceValueText}
          >
            {Math.round(data.rates.price * 100) / 100}
          </Typography>
        </Typography>

        <Select
          value={value}
          onChange={(e) => setValue(e.target.value)}
          input={
            <Input disableUnderline classes={{ input: classes.selectInput }} />
          }
          className={classes.select}
        >
          <MenuItem value="usd">USD</MenuItem>

          <MenuItem value="gbp">GBP</MenuItem>

          <MenuItem value="cad">CAD</MenuItem>

          <MenuItem value="eur">EUR</MenuItem>
        </Select>
      </Toolbar>
    </AppBar>
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
