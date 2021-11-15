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

export default function VotingDeadline(props) {
  return (
    <Widget
      title={
        <>
          <Typography gutterBottom="true" size="sm" variant="h6" weight="bold">
            Voting Deadline
          </Typography>
          <Typography
            variant="h6"
            colorBrightness="secondary"
            className={classes.serverOverviewElementText}
            noWrap
          >
            {deadlineDate}
          </Typography>
          <Typography
            variant="subtitle2"
            colorBrightness="secondary"
            className={classes.serverOverviewElementText}
            weight="bold"
            noWrap
            gutterBottom="true"
          >
            {votingDeadline.days} Days {votingDeadline.hours} Hours{" "}
            {votingDeadline.minutes} minutes
          </Typography>
        </>
      }
      upperTitle
      className={classes.card}
      bodyClass={classes.fullHeightBody}
    >
      <Box paddingTop={2}>
        <Typography
          variant="subtitle1"
          size="sm"
          colorBrightness="secondary"
          weight="bold"
        >
          Current Block:{" "}
          <Typography
            variant="subtitle1"
            size="sm"
            colorBrightness="secondary"
            display="inline"
          >
            {item.currentblock}
          </Typography>
        </Typography>

        <Typography
          variant="subtitle1"
          size="sm"
          colorBrightness="secondary"
          weight="bold"
        >
          Trigger Block:{" "}
          <Typography
            variant="subtitle1"
            size="sm"
            colorBrightness="secondary"
            display="inline"
          >
            {item.nextsuperblock}({blocksRemaining} remaining)
          </Typography>
        </Typography>
      </Box>
      <div className={classes.progressSection}>
        <Grid container item spacing={1}>
          <Grid item xs={1} sm={1} md={1} lg={1}>
            <Box pt={1.5}>
              <Typography
                size="sm"
                color="text"
                weight="bold"
                className={classes.progressSectionTitle}
              >
                Start
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={9} sm={9} md={9} lg={9}>
            <Box pl={1} pr={1} pt={2.5}>
              <ProgressBar class="progress">
                <ProgressBar
                  variant="currentBlock"
                  now={item.currentblock}
                  key={2}
                />
                <ProgressBar
                  variant="remainingBlocks"
                  now={item.nextsuperblock}
                  key={3}
                />
              </ProgressBar>
            </Box>
          </Grid>
          <Grid item xs={2} sm={2} md={2} lg={2}>
            <Box pt={1.5}>
              <Typography
                size="sm"
                color="text"
                weight="bold"
                className={classes.progressSectionTitle}
              >
                Trigger
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </div>
    </Widget>
  );
}
