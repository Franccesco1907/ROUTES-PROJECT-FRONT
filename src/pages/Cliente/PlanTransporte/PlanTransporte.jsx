import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { withStyles, makeStyles } from "@material-ui/core/styles";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import deliveryService from "../../../services/deliveryService";

import "./PlanTransporte.css";

const StyledTableCell = withStyles((theme) => ({
  head: {
    backgroundColor: "#3B4A81",
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const StyledTableRow = withStyles((theme) => ({
  root: {
    "&:nth-of-type(odd)": {
      backgroundColor: theme.palette.action.hover,
    },
  },
}))(TableRow);


const useStyles = makeStyles({
  table: {
    minWidth: 700,
  },
});

export default function PlanTransporte() {
  const location = useLocation();
  const [parte, setParte] = useState(location.state);
  const [truckPlans, setTruckPlans] = useState([]);

  useEffect(() => {
    console.log("location", location)
    getTruckPlans(parte.code);
  }, []);

  const getTruckPlans = async (id_parte) => {
    let request = await deliveryService.getTruckPlansByOrder(id_parte);
    console.log("request", request);
    setTruckPlans(request);
  };
  const classes = useStyles();

  
  function formatDate(date) {
    let d = new Date(date);
    let month = (d.getMonth() + 1).toString().padStart(2, '0');
    let day = d.getDate().toString().padStart(2, '0');
    let year = d.getFullYear();
    let hour = d.getUTCHours().toString().padStart(2, '0');
    let minutes = d.getUTCMinutes().toString().padStart(2, '0');
    let dateFormated = `${day}-${month}-${year} ${hour}:${minutes}`;
    return dateFormated;
  }

  return (
    <div>
      <h1 className="plan-transport-title">PLAN DE TRANSPORTE: </h1>
      <h2 className="plan-transport-title">
        PEDIDO: <span style={{ color: "#000000" }}> {location.state.id_ped} </span>
      </h2>
      <h2 className="plan-transport-title">
        PARTE: <span style={{ color: "#000000" }}> {parte.code} </span>
      </h2>
      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="customized table">
          <TableHead>
            <TableRow>
              <StyledTableCell>Origen</StyledTableCell>
              <StyledTableCell>Destino</StyledTableCell>
              <StyledTableCell align="center">
                Fecha y hora de llegada
              </StyledTableCell>
              <StyledTableCell align="center">
                Fecha y hora de salida
              </StyledTableCell>
              <StyledTableCell align="center">
                Acción
              </StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {truckPlans.map((row) => (
              <StyledTableRow key={row.nameStartVertex + ' - ' + row.nameEndVertex}>
                <StyledTableCell component="th" scope="row">
                  {row.nameStartVertex}
                </StyledTableCell>
                <StyledTableCell component="th" scope="row">
                  {row.nameEndVertex}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(row.dateDeparture)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {formatDate(row.dateArrival)}
                </StyledTableCell>
                <StyledTableCell align="center">
                  {row.action}
                </StyledTableCell>
              </StyledTableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
}
