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
  XAxis,
  YAxis,
  Tooltip,
} from "recharts";
import ProgressBar from "react-bootstrap/ProgressBar";
// styles
import useStyles from "./styles";
import "../dashboard/components/Table/ProgressBarStyles.scss";
// components
import mock from "./mock";
import Widget from "../../components/Widget";
import { Typography } from "../../components/Wrappers";
import CustomTable from "./components/Table/CustomTable";

export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  var [proposalData, setProposalData] = useState([]);
  var [superBlockData, setSuperBlockData] = useState([]);
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
  var [deadlineDate, setDate] = useState({});
  var [allocatedFunds, setFunds] = useState({});
  var [rate, setRates] = useState({});
  var [fundedRate, setFundedRate] = useState({});

  useEffect(() => {
    (async () => {
      const proposals = await axios.get("localhost:5000/proposals"); //replace localhost with ip of server ("http://147.182.212.182:81/proposals")
      const superblocks = await axios.get("localhost:5000/superblocks");
      const dashRates = await axios.get(
        `https://rates2.dashretail.org/rates?source=dashretail&symbol=dashusd`,
      );
      const superblock = superblocks.data[0]; //used to calc deadline and date time
      const rates = dashRates.data[0];
      const proposal = proposals.data;
      const pastTriggerObject = superblock.pastTrigger;
      const votingdeadline = superblock.nextsuperblock - 1662;
      const remainingDeadlineBlocks = votingdeadline - superblock.currentblock;
      const deadlineToMinutes = remainingDeadlineBlocks * 2.625;
      const remainingTime =
        (superblock.nextsuperblock - superblock.currentblock) * 2.625;
      const remainingBlocks =
        superblock.nextsuperblock - superblock.currentblock;
      const d = Math.floor(deadlineToMinutes / 1440);
      const h = Math.floor((deadlineToMinutes - d * 1440) / 60);
      const m = Math.round(deadlineToMinutes % 60);
      const timeUntilDeadline = { days: d, hours: h, minutes: m };
      const dr = Math.floor(remainingTime / 1440);
      const hr = Math.floor((remainingTime - dr * 1440) / 60);
      const mr = Math.round(remainingTime % 60);
      const timeUntilFundingDispersed = { days: dr, hours: hr, minutes: mr };

      // Functions
      const dateFromMinutes = () => {
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
        var newDate = stringifyDate;
        setDate(newDate);
      };

      const calcRates = async () => {
        var calcDashRate = Math.round(superblock.budget * rates.price);
        var newRate = calcDashRate.toLocaleString();
        setRates({ newRate });
      };

      const calcBudgetAllocation = () => {
        var allocatedFunds = proposal
          .filter((proposal) => proposal.fCachedFunding === true)
          .map((proposal) => proposal.payment_amount)
          .reduce((a, b) => a + b, 0);
        var roundFunds =
          Math.round((allocatedFunds + Number.EPSILON) * 100) / 100;
        var funds = roundFunds.toLocaleString();
        var calcFundedRate = Math.round(funds * rates.price);
        var newFundedRate = calcFundedRate.toLocaleString();

        setFundedRate({ newFundedRate });
        setFunds(funds);
      };
      const triggerToProposals = () => {
        proposal.forEach((v) => {
          v.pastTrigger = pastTriggerObject;
        });
        console.log(proposalData);
      };

      triggerToProposals(proposal, pastTriggerObject);
      dateFromMinutes(deadlineToMinutes);
      calcRates(superblock, rates);
      calcBudgetAllocation(proposal, rates);

      setBlocks(remainingBlocks);
      setProposalData(proposal);
      setSuperBlockData(superblocks.data);
      setVotingDeadline(timeUntilDeadline);
      setTimeUntilFunding(timeUntilFundingDispersed);
    })();
  }, []);

  const mockChartData = [
    {
      month: "2015.01",
      a: 50000,
      b: 2042485,
    },
    {
      month: "2015.02",
      a: 120000,
      b: 2042485,
    },
    {
      month: "2015.03",
      a: 140000,
      b: 2042485,
    },
    {
      month: "2015.04",
      a: 500000,
      b: 2042485,
    },
    {
      month: "2015.05",
      a: 327000,
      b: 2042485,
    },
    {
      month: "2015.06",
      a: 100000,
      b: 2042485,
    },
    {
      month: "2015.07",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.08",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.09",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.10",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.11",
      a: 50000,
      b: 2042485,
    },
    {
      month: "2015.12",
      a: 120000,
      b: 2042485,
    },
    {
      month: "2015.13",
      a: 140000,
      b: 2042485,
    },
    {
      month: "2015.14",
      a: 500000,
      b: 2042485,
    },
    {
      month: "2015.15",
      a: 327000,
      b: 2042485,
    },
    {
      month: "2015.16",
      a: 100000,
      b: 2042485,
    },
    {
      month: "2015.17",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.18",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.19",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.20",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.21",
      a: 50000,
      b: 2042485,
    },
    {
      month: "2015.22",
      a: 120000,
      b: 2042485,
    },
    {
      month: "2015.23",
      a: 140000,
      b: 2042485,
    },
    {
      month: "2015.24",
      a: 500000,
      b: 2042485,
    },
    {
      month: "2015.25",
      a: 327000,
      b: 2042485,
    },
    {
      month: "2015.26",
      a: 100000,
      b: 2042485,
    },
    {
      month: "2015.27",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.28",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.29",
      a: 700000,
      b: 2042485,
    },
    {
      month: "2015.30",
      a: 700000,
      b: 2042485,
    },
  ];

  const toPercent = (decimal, fixed = 0) =>
    `${(decimal * 100).toFixed(fixed)}%`;

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };

  const renderTooltipContent = (o) => {
    const { payload, label } = o;
    const total = payload.reduce((result, entry) => result + entry.value, 0);

    return (
      <div className="customized-tooltip-content">
        <p className="total">{`${label} (Total: ${total})`}</p>
        <ul className="list">
          {payload.map((entry, index) => (
            <li key={`item-${index}`} style={{ color: entry.color }}>
              {`${entry.name}: ${entry.value}(${getPercent(
                entry.value,
                total,
              )})`}
            </li>
          ))}
        </ul>
      </div>
    );
  };
  //#################################################################################################

  return (
    <>
      <div className={classes.mainDivBody}>
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
                title="Budget Allocation 20%"
                noBodyPadding
                className={classes.card}
                headerClass={classes.budgetHeader}
                bodyClass={classes.fullHeightBody}
              >
                <div className={classes.budgetBody}>
                  <Typography
                    variant="h6"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                    noWrap
                  >
                    ${fundedRate.newFundedRate} / ${rate.newRate} USD
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
                </div>

                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={mockChartData}
                    stackOffset="expand"
                    margin={{
                      top: 0,
                      right: 0,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    {/* <XAxis dataKey="month" />  */}
                    {/* <YAxis tickFormatter={toPercent} /> */}
                    <Tooltip content={renderTooltipContent} />
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
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Widget>
            </Grid>
          ))}
          <Grid item lg={4} md={4} sm={12} xs={12}>
            <Widget
              title="Voting Activity"
              noBodyPadding
              className={classes.card}
              headerClass={classes.budgetHeader}
              bodyClass={classes.fullHeightBody}
            >
              <div className={classes.budgetBody}>
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
              </div>
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mock.bardata}
                  margin={{
                    top: 50,
                    right: 60,
                    left: 60,
                  }}
                >
                  <Bar
                    yAxisId="left"
                    dataKey="pv"
                    fill="#E2E2E2"
                    radius={10}
                    barSize={5}
                  />
                  <Bar
                    yAxisId="right"
                    dataKey="uv"
                    fill="#008DE4"
                    radius={10}
                    barSize={5}
                  />
                </BarChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          {superBlockData.map((item) => (
            <Grid item lg={4} md={4} sm={12} xs={12} key={item}>
              <Widget
                title="Voting Deadline"
                upperTitle
                className={classes.card}
                bodyClass={classes.fullHeightBody}
              >
                <div className={classes.numericalBudgetData}>
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
                  {/* 
                  <Typography
                    variant="subtitle2"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                    weight="bold"
                    noWrap
                    gutterBottom="true"
                  >
                    Funding distribution in:{" "}
                    <Typography variant="subtitle2">
                      {timeUntilFunding.days} Days {timeUntilFunding.hours}{" "}
                      Hours {timeUntilFunding.minutes} minutes
                    </Typography>
                  </Typography>
                    */}
                  <div className={classes.votingDeadlineBlock}>
                    <div className={classes.votingDeadlineBlockItem}>
                      <Typography variant="subtitle2" weight="bold">
                        Current Block:
                        <Typography variant="subtitle2">
                          {item.currentblock}
                        </Typography>
                      </Typography>
                    </div>
                    <Typography variant="subtitle2" weight="bold" noWrap>
                      Trigger Block:
                      <Typography variant="subtitle2" noWrap>
                        {item.nextsuperblock}({blocksRemaining} remaining)
                      </Typography>
                    </Typography>
                  </div>
                </div>
                <div className={classes.progressSection}>
                  <Grid container item spacing={1}>
                    <Grid item xs={1} sm={1} md={2} lg={2}>
                      <Box pt={1.5}>
                        <Typography
                          size="sm"
                          color="text"
                          colorBrightness="secondary"
                          className={classes.progressSectionTitle}
                        >
                          Start
                        </Typography>
                      </Box>
                    </Grid>
                    <Grid item xs={10} sm={10} md={8} lg={8}>
                      <Box pt={2.5}>
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
                    <Grid item xs={1} sm={1} md={2} lg={2}>
                      <Box pt={1.5}>
                        <Typography
                          size="sm"
                          color="text"
                          colorBrightness="secondary"
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
