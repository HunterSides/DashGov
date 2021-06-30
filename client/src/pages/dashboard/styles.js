import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },
  proposalCard: {
    minHeight: "100%",
    display: "flex",
  },
  proposalFullHeightBody: {},
  visitsNumberContainer: {
    display: "flex",
    alignItems: "center",
    flexGrow: 1,
    paddingBottom: theme.spacing(1),
  },
  progressSection: {
    marginBottom: theme.spacing(3),
  },
  progressTitle: {
    marginBottom: theme.spacing(2),
  },
  progress: {
    marginBottom: theme.spacing(1),
    backgroundColor: "rgb(236, 236, 236)",
  },

  fullHeightBody: {
    display: "flex",
    flexGrow: 1,
    flexDirection: "column",
    justifyContent: "space-between",
  },
  tableWidget: {
    overflowX: "auto",
  },
  button: {},
  redirectButton: {
    backgroundColor: theme.palette.dash.primary,
  },
  progressBarPrimary: {
    backgroundColor: theme.palette.dash.primary,
  },

  progressBarWarning: {
    backgroundColor: theme.palette.warning.main,
  },

  performanceLegendWrapper: {
    display: "flex",
    flexGrow: 1,

    marginBottom: theme.spacing(1),
  },

  serverOverviewElement: {
    display: "flex",
    alignItems: "center",
    maxWidth: "100%",
  },
  serverOverviewElementText: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
  },
  percentChange: {
    minWidth: 145,
    paddingRight: theme.spacing(2),
    color: theme.palette.dash.primary,
  },
  serverOverviewElementChartWrapper: {
    width: "100%",
  },
  mainChartBody: {
    overflowX: "auto",
  },
  mainChartHeader: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    [theme.breakpoints.only("xs")]: {
      flexWrap: "wrap",
    },
  },
  mainChartHeaderLabels: {
    display: "flex",
    alignItems: "center",
    [theme.breakpoints.only("xs")]: {
      order: 3,
      width: "100%",
      justifyContent: "center",
      marginTop: theme.spacing(3),
      marginBottom: theme.spacing(2),
    },
  },
  mainChartHeaderLabel: {
    display: "flex",
    alignItems: "center",
    marginLeft: theme.spacing(3),
  },
  mainChartSelectRoot: {
    borderColor: theme.palette.text.hint + "80 !important",
  },
  mainChartSelect: {
    padding: 10,
    paddingRight: 25,
  },
  mainChartLegentElement: {
    fontSize: "18px !important",
    marginLeft: theme.spacing(1),
  },
  success: {
    backgroundColor: theme.palette.success.main,
    color: "#fff",
  },
  warning: {
    backgroundColor: theme.palette.warning.main,
    color: "#fff",
  },
  secondary: {
    backgroundColor: theme.palette.secondary.main,
    color: "#fff",
  },
  budgetHeader: {
    padding: theme.spacing(3),
    paddingBottom: theme.spacing(3),
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  budgetBody: {
    alignItems: "center",
    paddingBottom: theme.spacing(2),
    paddingRight: theme.spacing(3),
    paddingLeft: theme.spacing(3),
  },
}));
