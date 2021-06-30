import React, { useState, useEffect } from "react";
import { Grid, Box, LinearProgress, Button } from "@material-ui/core";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useTheme } from "@material-ui/styles";

// styles
import useStyles from "./styles";
import "./ProgressBarStyles.scss";
// components
import Widget from "../../../../components/Widget";
import { Typography } from "../../../../components/Wrappers";

const MIN = 100;
const MAX = 200;
const normalize = (value) => ((value - MIN) * 100) / (MAX - MIN);

export default function Table(props) {
  const [progress, setProgress] = useState(MIN);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((oldProgress) => {
        if (oldProgress === MAX) {
          return 0;
        }
        return Math.min(oldProgress + 15, MAX);
      });
    }, 500);

    return () => {
      clearInterval(timer);
    };
  }, []);

  var {
    name,
    payment_amount,
    url,
    AbsoluteYesCount,
    YesCount,
    NoCount,
    AbstainCount,
    fCachedFunding,
  } = props;
  var classes = useStyles();
  var theme = useTheme();

  return (
    <Box borderLeft={3} borderRadius={8} className={classes.statusIndicator}>
      <Widget noBodyPadding noHeaderPadding>
        <Box padding={4}>
          <Grid container alignItems="center">
            <Grid
              item
              xs={12}
              md={12}
              lg={10}
              xl={10}
              className={classes.fullHeightBody}
            >
              <Grid item xs={12} md={12}>
                <Typography
                  variant="subtitle2"
                  colorBrightness="secondary"
                  paragraph="true"
                  className={classes.proposalDescriptionText}
                >
                  {name} Dash Help Q2 2021 Support & Training Center + Education
                  on YouTube and Social media + CX improvement + Strategic and
                  operational planning + BTL Marketing enhance with Data Driven
                  approach + Dash Retail POS introduction + Dash injection to
                  Venezuelan market
                </Typography>
              </Grid>
              <Grid container item spacing={1}>
                <Grid item xs={12} sm={12} md={4} lg={4} xl={3}>
                  <Typography
                    size="sm"
                    variant="subtitle"
                    weight="bold"
                    color="text"
                    className={classes.proposalDescriptionText}
                    noWrap
                  >
                    {Math.round(payment_amount)} DASH per month(2 months
                    remaining)
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={5} md={3} lg={3} xl={2}>
                  <Typography
                    size="sm"
                    variant="subtitle"
                    color="text"
                    weight="bold"
                    colorBrightness="secondary"
                    className={classes.proposalDescriptionText}
                    noWrap
                  >
                    YES{" "}
                    <Typography
                      size="sm"
                      variant="subtitle"
                      color="success"
                      weight="bold"
                      className={classes.proposalYesVotes}
                    >
                      {YesCount}
                    </Typography>
                  </Typography>
                  <Typography
                    size="sm"
                    variant="subtitle"
                    color="text"
                    weight="bold"
                    colorBrightness="secondary"
                    className={classes.proposalDescriptionText}
                    noWrap
                  >
                    ABSTAIN{" "}
                    <Typography
                      size="sm"
                      variant="subtitle"
                      color="warning"
                      weight="bold"
                      className={classes.proposalAbstainVotes}
                    >
                      {AbstainCount}
                    </Typography>
                  </Typography>
                  <Typography
                    size="sm"
                    variant="subtitle"
                    color="text"
                    weight="bold"
                    colorBrightness="secondary"
                    className={classes.proposalDescriptionText}
                    noWrap
                  >
                    NO{" "}
                    <Typography
                      size="sm"
                      variant="subtitle"
                      color="secondary"
                      weight="bold"
                      className={classes.proposalNoVotes}
                    >
                      {NoCount}
                    </Typography>
                  </Typography>
                </Grid>
                <Grid item xs={6} sm={5} md={3} lg={3} xl={5}>
                  <Box pt={1.5}>
                    <ProgressBar class="progress">
                      <ProgressBar variant="yes" now={YesCount} key={1} />
                      <ProgressBar
                        variant="abstain"
                        now={AbstainCount}
                        key={2}
                      />
                      <ProgressBar variant="no" now={NoCount} key={3} />
                    </ProgressBar>
                  </Box>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={4} md={4} lg={2} xl={2}>
              <Button
                className={classes.redirectButton}
                disableElevation
                size="sm"
                variant="contained"
                color="primary"
                href={url}
                target="_blank"
                title={url}
              >
                <Typography
                  size="sm"
                  variant="subtitle2"
                  weight="light"
                  color="text"
                  noWrap
                >
                  View on Dash Central
                </Typography>
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Widget>
    </Box>
  );
}
