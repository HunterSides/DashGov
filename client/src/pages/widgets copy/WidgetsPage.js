import React, { useState, useEffect } from "react";
import axios from "axios";
import { Grid, LinearProgress, Box } from "@material-ui/core";
import { useTheme } from "@material-ui/styles";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  ReferenceLine,
  ReferenceArea,
  XAxis,
  YAxis,
  Tooltip,
  Label,
  LabelList,
} from "recharts";

import ProgressBar from "react-bootstrap/ProgressBar";

// styles
import useStyles from "./styles";
import "../widgets/components/Table/ProgressBarStyles.scss";
// components
import mock from "../mock";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import CustomTable from "./components/Table/CustomTable";
//import Budget from "./components/Budget/Budget";
//import VotingActivity from "./components/VotingActivity/VotingActivity";
//import votingDeadline from "./components/VotingDeadline/VotingDeadline";

export default function WidgetsPage(props) {
  var classes = useStyles();
  var theme = useTheme();

  var [votingDeadline, setVotingDeadline] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  var [timeUntilFunding, setTimeUntilFunding] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
  });
  var [blocksRemaining, setBlocks] = useState({});
  var [blocksRemainingUntilSuper, setBlocksUntilSuper] = useState({});
  var [triggerDeadlineDate, setTriggerDate] = useState({});
  var [nextSuperblockDate, setSuperDate] = useState({});
  var [rate, setRates] = useState({});
  var [allocatedFunds, setFunds] = useState({});
  var [allocatedPercent, setPercent] = useState({});
  var [fundedRate, setFundedRate] = useState({});
  var [proposalData, setProposalData] = useState([]);
  var [superBlockData, setSuperBlockData] = useState([]);
  var [triggerBlock, setTriggerBlock] = useState({});
  useEffect(() => {
    (async () => {
      const dashRates = await axios.get(
        `https://rates2.dashretail.org/rates?source=dashretail&symbol=dashusd`,
      );
      const proposal = mock.proposals;
      const superblock = mock.superblock[0];
      const triggerBlock = superblock.triggerblock;
      const rates = dashRates.data[0];
      const pastTriggerObject = superblock.pastTrigger;

      //used to calc deadline and date time for trigger
      const remainingDeadlineBlocks = triggerBlock - superblock.currentblock;
      const deadlineToMinutes = remainingDeadlineBlocks * 2.625;
      const d = Math.floor(deadlineToMinutes / 1440);
      const h = Math.floor((deadlineToMinutes - d * 1440) / 60);
      const m = Math.round(deadlineToMinutes % 60);
      const timeUntilDeadline = { days: d, hours: h, minutes: m };
      //used to calc superblock countdown
      const remainingSuperBlocks =
        superblock.nextsuperblock - superblock.currentblock;
      const nextSuperblockToMinutes = remainingSuperBlocks * 2.625;
      const dr = Math.floor(nextSuperblockToMinutes / 1440);
      const hr = Math.floor((nextSuperblockToMinutes - dr * 1440) / 60);
      const mr = Math.round(nextSuperblockToMinutes % 60);
      const timeUntilFundingDispersed = { days: dr, hours: hr, minutes: mr };

      // Functions
      const triggerDateFromMinutes = () => {
        var currentDate = new Date();
        var futureDate = new Date(
          currentDate.getTime() + deadlineToMinutes * 60000,
        );
        var options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        var stringifyDate = futureDate.toLocaleString("default", options);
        var newTriggerDate = stringifyDate;
        setTriggerDate(newTriggerDate);
      };
      const superBlockDateFromMinutes = () => {
        var currentDate = new Date();
        var futureDate = new Date(
          currentDate.getTime() + nextSuperblockToMinutes * 60000,
        );
        var options = {
          month: "long",
          day: "numeric",
          year: "numeric",
        };
        var stringifyDate = futureDate.toLocaleString("default", options);
        var newSuperDate = stringifyDate;
        setSuperDate(newSuperDate);
      };

      const calcRates = async () => {
        var calcDashRate = Math.round(superblock.budget * rates.price);
        var newRate = calcDashRate.toLocaleString();
        setRates({ newRate });
      };

      const calcBudgetAllocation = async () => {
        var allocatedFunds = proposal
          .filter((proposal) => proposal.fCachedFunding === true)
          .map((proposal) => proposal.payment_amount)
          .reduce((a, b) => a + b, 0);
        var roundFunds =
          Math.round((allocatedFunds + Number.EPSILON) * 100) / 100;
        var funds = roundFunds.toLocaleString();
        var fundRate = Math.round(roundFunds * rates.price);
        var newFundedRate = fundRate.toLocaleString();
        var percent = ((allocatedFunds / superblock.budget) * 100).toFixed(0);
        setPercent(percent);
        setFundedRate(newFundedRate);
        setFunds(funds);
      };

      const triggerToProposals = () => {
        proposal.forEach((v) => {
          v.pastTrigger = pastTriggerObject;
        });
      };

      triggerToProposals(proposal, pastTriggerObject);
      triggerDateFromMinutes(deadlineToMinutes);
      superBlockDateFromMinutes(superBlockDateFromMinutes);
      calcRates(superblock, rates);
      calcBudgetAllocation(proposal, rates);

      setTriggerBlock(triggerBlock);
      setBlocks(remainingDeadlineBlocks);
      setBlocksUntilSuper(remainingSuperBlocks);
      setProposalData(mock.proposals);
      setSuperBlockData(mock.superblock);
      setVotingDeadline(timeUntilDeadline);
      setTimeUntilFunding(timeUntilFundingDispersed);
    })();
  }, []);

  const toPercent = (decimal, fixed = 0) =>
    `${(decimal * 100).toFixed(fixed)}%`;

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };
  const customTooltip = (props) => {
    return (
      <div
        className="customized-tooltip-content"
        style={{
          border: "#bbb 1.5px solid",
        }}
      >
        <p
          style={{
            margin: "0 0",
            padding: "3px 7.5px",
          }}
        >
          {props.payload &&
            props.payload[0] != null &&
            props.payload[0].payload.name}
        </p>
        <p
          style={{
            margin: "0 0",
            padding: "3px 7.5px",
            color: "#007AFF",
          }}
        >
          This Cycle:{" "}
          {props.payload &&
            props.payload[0] != null &&
            props.payload[0].payload.current}
        </p>
        <p
          style={{
            margin: "0 0",
            padding: "3px 7.5px",
            color: "#E2E2E2",
          }}
        >
          Last Cycle:{" "}
          {props.payload &&
            props.payload[0] != null &&
            props.payload[0].payload.previous}
        </p>
      </div>
    );
  };

  return (
    <>
      <div>
        <h3>
          This page is to illustrate widget functionality and style using mock
          data
        </h3>
      </div>
      <div className={classes.mainDivBody}>
        <div>
          <p>Green = passing and will be funded</p>
          <p>Yellow = passing but will not be funded</p>
          <p>No Color = not yet passing </p>
          <p>Red = not passing and past trigger</p>
          <p>
            *voting data for each proposal does not correspond to the status
            indicator on left hand side.
          </p>
        </div>
        <Grid container spacing={3}>
          {superBlockData.map((item) => (
            <Grid
              item
              lg={4}
              md={4}
              sm={12}
              xs={12}
              key={item}
              className={classes.mainGridBody}
            >
              <Widget
                title={
                  <>
                    <Typography
                      gutterBottom="true"
                      size="sm"
                      variant="h6"
                      weight="bold"
                    >
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
                {/*<div className={classes.budgetBody}>
                  <Typography
                    size="30px"
                    className={classes.serverOverviewElementText}
                    noWrap
                  >
                    ${fundedRate} / ${rate.newRate} USD
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    weight="bold"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                    noWrap
                  >
                    {allocatedFunds} / {item.budget} Dash
                  </Typography>
                </div>*/}
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
                    {/*<XAxis dataKey="day" /> */}
                    {/*<YAxis tickFormatter={toPercent} /> */}
                    {/*<Tooltip content={renderTooltipContent} /> */}
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
                    {/* CAN BE USED FOR RENDERING TOOLTIP 
                    
                    <Area
                      type="natural"
                      dataKey="a"
                      stackId="1"
                      activeDot={false}
                      stroke={theme.palette.primary.main}
                      fill={theme.palette.primary.light}
                    />
                    <Area
                      type="natural"
                      dataKey="b"
                      stackId="1"
                      activeDot={false}
                      stroke="#FFFFF"
                      fill="#FFFFFF"
                    /> */}
                  </AreaChart>
                </ResponsiveContainer>
              </Widget>
            </Grid>
          ))}
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Widget
              title={
                <>
                  <Typography
                    gutterBottom="true"
                    size="sm"
                    variant="h6"
                    weight="bold"
                  >
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
          </Grid>
          {superBlockData.map((item) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={item}>
              <Widget
                title={
                  <>
                    <Typography
                      gutterBottom="true"
                      size="sm"
                      variant="h6"
                      weight="bold"
                    >
                      Voting Deadline
                    </Typography>
                    <Typography
                      variant="h6"
                      colorBrightness="secondary"
                      className={classes.serverOverviewElementText}
                      noWrap
                    >
                      {triggerDeadlineDate}
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
                      {triggerBlock}({blocksRemaining} remaining)
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
                      <Box pl={2} pr={1} pt={2.5}>
                        <ProgressBar class="progress">
                          <ProgressBar
                            variant="currentBlock"
                            now={item.currentblock}
                            key={2}
                          />
                          <ProgressBar
                            variant="remainingBlocks"
                            now={item.triggerBlock}
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
            </Grid>
          ))}
          {superBlockData.map((item) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={item}>
              <Widget
                title={
                  <>
                    <Typography
                      gutterBottom="true"
                      size="sm"
                      variant="h6"
                      weight="bold"
                    >
                      Superblock Countdown
                    </Typography>
                    <Typography
                      variant="h6"
                      colorBrightness="secondary"
                      className={classes.serverOverviewElementText}
                      noWrap
                    >
                      {nextSuperblockDate}
                    </Typography>
                    <Typography
                      variant="subtitle2"
                      colorBrightness="secondary"
                      className={classes.serverOverviewElementText}
                      weight="bold"
                      noWrap
                      gutterBottom="true"
                    >
                      {timeUntilFunding.days} Days {timeUntilFunding.hours}{" "}
                      Hours {timeUntilFunding.minutes} minutes
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
                    Trigger Block:{" "}
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
                    Next Superblock:{" "}
                    <Typography
                      variant="subtitle1"
                      size="sm"
                      colorBrightness="secondary"
                      display="inline"
                    >
                      {item.nextsuperblock}({blocksRemainingUntilSuper}{" "}
                      remaining)
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
                          Trigger
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={8} sm={8} md={8} lg={8}>
                      <Box pl={3} pr={1} pt={2.5}>
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
                          Superblock
                        </Typography>
                      </Box>
                    </Grid>
                  </Grid>
                </div>
              </Widget>
            </Grid>
          ))}
          {proposalData.map((item) => (
            <Grid item xs={12} key={item.name}>
              <CustomTable {...item} />
            </Grid>
          ))}
        </Grid>
      </div>
    </>
  );
}
