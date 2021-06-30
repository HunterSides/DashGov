import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  card: {
    minHeight: "100%",
    display: "flex",
    flexDirection: "column",
  },

  proposalSection: {
    marginBottom: theme.spacing(1),
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
  redirectButton: {
    backgroundColor: theme.palette.dash.primary,
    borderRadius: 6,
    textTransform: "none",
    [theme.breakpoints.only("xs")]: { marginTop: 15 },
    [theme.breakpoints.only("sm")]: { marginTop: 15 },
    [theme.breakpoints.only("md")]: { marginTop: 20 },
    [theme.breakpoints.only("lg")]: {
      maxWidth: "100%",
      maxHeight: "100%",
      minWidth: "150px",
      minHeight: "50px",
    },
    [theme.breakpoints.only("xl")]: {
      maxWidth: "100%",
      maxHeight: "100%",
      minWidth: "150px",
      minHeight: "50px",
    },

    color: "#fff",
    "&:hover": {
      backgroundColor: theme.palette.dash.primary,
      color: "#fff",
    },
  },

  proposalDescriptionText: {
    minWidth: 145,
    paddingRight: theme.spacing(1),
    [theme.breakpoints.only("xs")]: {},
    [theme.breakpoints.only("sm")]: {},
    [theme.breakpoints.only("md")]: {},
    [theme.breakpoints.only("lg")]: {},
    [theme.breakpoints.only("xl")]: {},
  },
  proposalVotes: {
    paddingRight: theme.spacing(1),
  },
  proposalYesVotes: {
    paddingRight: theme.spacing(1),
  },
  proposalAbstainVotes: {
    paddingRight: theme.spacing(1),
  },
  proposalNoVotes: {
    paddingRight: theme.spacing(1),
  },
  redirectLink: {
    backgroundColor: "",
    color: "white",
    padding: "",
    display: "",
    textDecoration: "",
    textAlign: "",
  },
  proposalBar: {
    marginBottom: theme.spacing(1),
    backgroundColor: theme.palette.secondary.dark,
    borderRadius: 6,
  },
  proposalBarYes: {
    backgroundColor: theme.palette.success.main,
  },
  proposalBarAbstain: {
    backgroundColor: theme.palette.info.main,
  },
  proposalBarNo: {
    backgroundColor: theme.palette.warning.main,
  },
  requestedAmount: {},
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
  statusIndicator: {
    borderLeftColor: theme.palette.success.main,
  },
}));
