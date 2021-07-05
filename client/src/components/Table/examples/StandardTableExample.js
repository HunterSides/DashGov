import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";

import useProposals from "../../hooks/proposalsHook";

const useStyles = makeStyles({
  table: {
    minWidth: 650
  }
});

function createData(name, YesCount, NoCount, url) {
  return { name, YesCount, NoCount, url };
}

const rows = [
  /*createProposal(
    proposals.name,
    proposals.YesCount,
    proposals.NoCount,
    proposals.url
  ),*/
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9)
];

export default function DenseTable() {
  const classes = useStyles();
  const [proposals] = useProposals();
  return (
    <TableContainer component={Paper}>
      <Table className={classes.table} size="small" aria-label="a dense table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell align="right">Yes Count</TableCell>
            <TableCell align="right">No Count&nbsp;</TableCell>
            <TableCell align="right">url&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map(row => (
            <TableRow key={row.name}>
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.YesCount}</TableCell>
              <TableCell align="right">{row.NoCount}</TableCell>
              <TableCell align="right">{row.url}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
