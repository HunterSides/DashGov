import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, Box, Button } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";
import "./ProgressBarStyles.scss";
// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

export default function Budget(props) {
  return (
    <Widget
      title={
        <>
          <Typography gutterBottom="true" size="sm" variant="h6" weight="bold">
            Budget Allocation {allocatedPercent}%
          </Typography>
          <Typography
            variant="h6"
            colorBrightness="secondary"
            className={classes.serverOverviewElementText}
            noWrap
          >
            ${fundedRate} / ${rate.newRate} USD
          </Typography>
          <Typography variant="subtitle2" weight="bold">
            {allocatedFunds} / {item.budget} Dash
          </Typography>
        </>
      }
      noBodyPadding
      className={classes.card}
      headerClass={classes.budgetHeader}
      bodyClass={classes.fullHeightBody}
    >
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={mock.budget}
          stackOffset="expand"
          margin={{
            top: 0,
            right: 0,
            left: 0,
            bottom: 0,
          }}
        >
          <ReferenceLine
            y={item.budget}
            label="Max"
            stroke={theme.palette.success.main}
            strokeDasharray="3 3"
          />
          <Area
            type="natural"
            dataKey="a"
            activeDot={false}
            stroke="#336CFB"
            strokeWidth={2}
            fill="#CFDDFF"
            fillOpacity={1}
          />
        </AreaChart>
      </ResponsiveContainer>
    </Widget>
  );
}
