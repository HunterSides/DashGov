export default function Dashboard(props) {
  var classes = useStyles();
  var theme = useTheme();
  var [proposalData, setProposalData] = useState([]);
  var [superBlockData, setSuperBlockData] = useState([]);
  var [currentDate, setCurrentDate] = useState();
  var [votingDeadline, setVotingDeadline] = useState();
  var [payoutDate, setPayoutDate] = useState();

  useEffect(() => {
    (async () => {
      const proposals = await axios.get("http://localhost:5000/proposals");
      const superblocks = await axios.get("http://localhost:5000/superblocks");

      const superblock = superblocks.data[0];

      setProposalData(proposals.data);
      setSuperBlockData(superblocks.data);

      console.log(superblock);
    })();
  }, []);

  //################################Used To calculate voting deadline #########################################
  function convertDateTime() {
    let date = new Date();
    let options = { month: "long", day: "numeric", year: "numeric" };
    var time = new Date().toLocaleString("default", {
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
      hour12: true,
      timeZone: "UTC"
    });
    console.log(date.toLocaleString("default", options));
    console.log(time);
  }

  function calcVoteDeadline() {
    const votingdeadline = superBlockData.nextsuperblock - 1662;
    const convertToMinutes = 2.625;
    if (votingdeadline < superBlockData.currentblock) {
      const date =
        (superBlockData.nextsuperblock - superBlockData.currentblock) * 2.625;
      setPayoutDate(date);
    } else if (votingdeadline > superBlockData.currentblock) {
      const deadline = (votingdeadline - superBlockData.currentblock) * 2.625;
      setVotingDeadline(deadline);
    }
  }
  //################################Used To convert Chart Data to Percentage#########################################
  const mockChartData = [
    {
      month: "2015.01",
      a: 50000,
      b: 2042485
    },
    {
      month: "2015.02",
      a: 120000,
      b: 2042485
    },
    {
      month: "2015.03",
      a: 140000,
      b: 2042485
    },
    {
      month: "2015.04",
      a: 500000,
      b: 2042485
    },
    {
      month: "2015.05",
      a: 327000,
      b: 2042485
    },
    {
      month: "2015.06",
      a: 100000,
      b: 2042485
    },
    {
      month: "2015.07",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.08",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.09",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.10",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.11",
      a: 50000,
      b: 2042485
    },
    {
      month: "2015.12",
      a: 120000,
      b: 2042485
    },
    {
      month: "2015.13",
      a: 140000,
      b: 2042485
    },
    {
      month: "2015.14",
      a: 500000,
      b: 2042485
    },
    {
      month: "2015.15",
      a: 327000,
      b: 2042485
    },
    {
      month: "2015.16",
      a: 100000,
      b: 2042485
    },
    {
      month: "2015.17",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.18",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.19",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.20",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.21",
      a: 50000,
      b: 2042485
    },
    {
      month: "2015.22",
      a: 120000,
      b: 2042485
    },
    {
      month: "2015.23",
      a: 140000,
      b: 2042485
    },
    {
      month: "2015.24",
      a: 500000,
      b: 2042485
    },
    {
      month: "2015.25",
      a: 327000,
      b: 2042485
    },
    {
      month: "2015.26",
      a: 100000,
      b: 2042485
    },
    {
      month: "2015.27",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.28",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.29",
      a: 700000,
      b: 2042485
    },
    {
      month: "2015.30",
      a: 700000,
      b: 2042485
    }
  ];

  const toPercent = (decimal, fixed = 0) =>
    `${(decimal * 100).toFixed(fixed)}%`;

  const getPercent = (value, total) => {
    const ratio = total > 0 ? value / total : 0;

    return toPercent(ratio, 2);
  };

  const renderTooltipContent = o => {
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
                total
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
      <Box ml={3} mr={3}>
        <Grid container spacing={3}>
          <Grid item lg={4} md={8} sm={6} xs={12}>
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
                  $327,000 / $2,042,485
                </Typography>
                <Typography
                  variant="subtitle2"
                  weight="bold"
                  colorBrightness="secondary"
                  className={classes.serverOverviewElementText}
                  noWrap
                >
                  565.73 / 4945.00 Dash
                </Typography>
              </div>

              <ResponsiveContainer width="100%" height="100%">
                <AreaChart
                  width={500}
                  height={400}
                  data={mockChartData}
                  stackOffset="expand"
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0
                  }}
                >
                  <XAxis dataKey="month" />
                  <YAxis tickFormatter={toPercent} />
                  <Tooltip content={renderTooltipContent} />
                  <Area
                    type="natural"
                    dataKey="a"
                    stackId="1"
                    stroke={theme.palette.primary.main}
                    fill={theme.palette.primary.light}
                  />
                  <Area
                    type="natural"
                    dataKey="b"
                    stackId="1"
                    stroke="#82ca9d"
                    fill="#FFFFFF"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Widget>
          </Grid>
          <Grid item lg={4} md={8} sm={6} xs={12}>
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
                    left: 60
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
          {superBlockData.map(item => (
            <Grid item lg={4} md={8} sm={6} xs={12} key={item}>
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
                    May 25th 2021
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    colorBrightness="secondary"
                    className={classes.serverOverviewElementText}
                    weight="bold"
                    noWrap
                    gutterBottom="true"
                  >
                    15 Days, 9 hours, 9 minutes
                  </Typography>
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
                        {item.nextsuperblock}(
                        {item.nextsuperblock - item.currentblock} remaining)
                      </Typography>
                    </Typography>
                  </div>
                </div>
                <div className={classes.progressSection}>
                  <Typography
                    size="sm"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                  >
                    Start
                  </Typography>

                  <LinearProgress
                    variant="determinate"
                    value={77}
                    classes={{ barColorPrimary: classes.progressBarPrimary }}
                    className={classes.progress}
                  />
                  <Typography
                    size="sm"
                    color="text"
                    colorBrightness="secondary"
                    className={classes.progressSectionTitle}
                  >
                    Trigger
                  </Typography>
                </div>
              </Widget>
            </Grid>
          ))}
          {proposalData.map(item => (
            <Grid item xs={12} key={item.name}>
              <CustomTable {...item} />
            </Grid>
          ))}
        </Grid>
      </Box>
    </>
  );
}
