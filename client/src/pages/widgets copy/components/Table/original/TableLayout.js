import React, { useMemo, useState, useEffect } from "react";
import axios from "axios";
import { useTable, useSortBy } from "react-table";

import * as api from "../../api/index";

import { COLUMNS } from "./columns/columns";
import "./table.css";

export const TableLayout = () => {
  const columns = useMemo(() => COLUMNS, []);
  //const data = useMemo(() => api.fetchProposals, []); //useMemo hook used for useTable to ensure data isn't recreated on each render

  const [data, setData] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:5000/proposals")
      .then((res) => {
        console.log(res);
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const {
    getTableProps, //used by react-table - use-table
    getTableBodyProps, //used by react-table - use-table
    headerGroups,
    rows,
    prepareRow,
  } = useTable(
    {
      columns: columns,
      data: data,
    },
    useSortBy,
  );

  // renders UI for table
  return (
    <table {...getTableProps()}>
      <thead>
        {headerGroups.map((headerGroup) => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map((column) => (
              <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                {column.render("Header")}
                <span>
                  {column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}
                </span>
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map((row) => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell) => {
                return <td {...cell.getCellProps()}>{cell.render("Cell")} </td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default TableLayout;
