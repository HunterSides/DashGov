import { makeStyles } from "@material-ui/styles";

export default makeStyles((theme) => ({
  dashRate: {
    color: "black",
    marginLeft: theme.spacing(2.5),
    marginRight: theme.spacing(2.5),
    whiteSpace: "nowrap",
  },
  selectInput: {
    padding: 10,
    paddingRight: 25,
    "&:focus": {
      backgroundColor: "white",
    },
  },
}));
