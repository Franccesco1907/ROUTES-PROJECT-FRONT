import {
  Box,
  LinearProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import useTable from "../../../components/useTable";

import "./PlanTransporteGeneral.css";

const tableHeaders = [
  {
    id: "id",
    label: "Id y Accion",
    numeric: false,
    sortable: false,
  },
  {
    id: "fechaLlegada",
    label: "Fecha y hora de llegada",
    numeric: false,
    sortable: false,
  },
  {
    id: "fechaSalida",
    label: "Fecha y hora de salida",
    numeric: false,
    sortable: false,
  },
  {
    id: "lugarLlegada",
    label: "Lugar de llegada",
    numeric: false,
    sortable: false,
  },
  {
    id: "lugarSalida",
    label: "Lugar de salida",
    numeric: false,
    sortable: false,
  },
];

export default function Viajes(props) {
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [travelsCargados, setTravelsCargados] = useState(false);
  const [records, setRecords] = useState(props.travels);
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl,
  } = useTable(records, tableHeaders, filterFn);

  useEffect(() => {
    setTravelsCargados(false);
    getTravels();
  }, [props]);

  const getTravels = async () => {
    let request = props.travels;
    console.log("getTravels", records, props.travels);
    const recordsX = transformarViajes(request);
    setRecords(recordsX);
    setTravelsCargados(true);
  };

  function transformarViajes(request) {
    const recordsX = [];
    request.map((viaje) => {
      //console.log("partes antes de foramtear", par);
      //let fecha = ped.orderDate.substring(0, 19);
      //Armo el objeto
      recordsX.push({
        idTravel: viaje.idTravel,
        action: viaje.action,
        dateArrival: viaje.dateArrival,
        dateDeparture: viaje.dateDeparture,
        nameStartVertex: viaje.nameStartVertex,
        nameEndVertex: viaje.nameEndVertex,
      });
    });
    return recordsX;
  }

  return (
    <div>
      <h1 Style="color: var(--blue);">Viajes</h1>
      <BoxTbl>
        {travelsCargados ? (
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item}>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.idTravel}
                    </Typography>
                    <div>Accion: {item.action}</div>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.dateArrival.substring(0, 10)}
                    </Typography>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.dateArrival.substring(11, 16)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.dateDeparture.substring(0, 10)}
                    </Typography>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.dateDeparture.substring(11, 16)}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.nameStartVertex}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.nameEndVertex}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </TblContainer>
        ) : (
          <Box sx={{ width: "100%" }}>
            <LinearProgress />
          </Box>
        )}
        <TblPagination />
      </BoxTbl>
    </div>
  );
}
