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

export default function VotingActivity(props) {
  return (
    <Widget
      title={
        <>
          <Typography gutterBottom="true" size="sm" variant="h6" weight="bold">
            Voting Activity
          </Typography>
          <Typography
            variant="h6"
            colorBrightness="secondary"
            className={classes.serverOverviewElementText}
            noWrap
          >
            123 votes cast this cycle
          </Typography>
          <Typography
            variant="subtitle2"
            weight="bold"
            colorBrightness="secondary"
            className={classes.percentChange}
            noWrap
          >
            23% from this time last cycle.
          </Typography>
        </>
      }
      noBodyPadding
      className={classes.card}
      headerClass={classes.budgetHeader}
      bodyClass={classes.fullHeightBody}
    >
      <ResponsiveContainer width="100%" height="100%">
        <BarChart
          data={mock.dailyVotingActivity}
          margin={{
            top: 50,
            right: 60,
            left: 60,
          }}
        >
          <Tooltip
            content={customTooltip}
            position={{ x: 285, y: -120 }}
            cursor={{ fill: "transparent" }}
          />
          <Bar
            yAxisId="left"
            dataKey="previous"
            fill="#E2E2E2"
            radius={[6, 6, 0, 0]}
            barSize={5}
          />
          <Bar
            yAxisId="right"
            dataKey="current"
            fill="#008DE4"
            radius={[6, 6, 0, 0]}
            barSize={5}
          />
        </BarChart>
      </ResponsiveContainer>
    </Widget>
  );
}
