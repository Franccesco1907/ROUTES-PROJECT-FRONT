import React, { useState, useEffect } from "react";
import { TableBody, TableCell, TableRow, Typography, Box } from "@mui/material";
import { Controls } from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import "./BloquearTramos.css";
import CloseIcon from '@mui/icons-material/Close';
import LinearProgress from "@mui/material/LinearProgress";
import truckPlanService from "../../../services/truckPlanService";

import "./AveriasCamiones.css";
import Viajes from "./Viajes";


const tableHeaders = [
  {
    id: "id",
    label: "ID - ESTADO",
    numeric: false,
    sortable: true,
  },
  {
    id: "numPackages",
    label: "PAQUETES",
    numeric: false,
    sortable: false,
  },
  {
    id: "estado",
    label: "ESTADO",
    numeric: false,
    sortable: false,
  },
  {
    id: "averiar",
    label: "TIPO AVERIA",
    numeric: false,
    sortable: false,
  },
  {
    id: "viaje",
    label: "VIAJES",
    numeric: false,
    sortable: false,
  }
];

export default function AveriasCamiones(props) {
  const handleDisableTruckPlan = (idTruckPlan) => {
    console.log("evento detail idTruckPlan", idTruckPlan);
    truckPlanService.disableTruckPlan(idTruckPlan).then( data => {
      console.log("result of disableTruckPlan", data);
    })
  };
  const handleCrippleTruckPlan = (idTruckPlan) => {
    console.log("evento detail idTruckPlan", idTruckPlan);
    truckPlanService.crippleTruckPlan(idTruckPlan).then( data => {
      console.log("result of crippleTruckPlan", data);
    })
  };
  const handleKillTruckPlan = (idTruckPlan) => {
    console.log("evento detail idTruckPlan", idTruckPlan);
    truckPlanService.killTruckPlan(idTruckPlan).then( data => {
      console.log("result of killTruckPlan", data);
    })
  };

  const handleDetail = (item) => {
    console.log("evento detail item", item);
    setVisible(true);
    setTravels(item.travels);
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [camionesCargados, setCamionesCargados] = useState(false);
  const [records, setRecords] = useState(props.truckPlanRef.current);
  const [visible, setVisible] = useState(false);
  const [travels, setTravels] = useState([]);

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl,
  } = useTable(records, tableHeaders, filterFn);

  useEffect(() => {
    setCamionesCargados(false);
    getCamiones();
    console.log("camiones supuestamente cargados", records, props.truckPlanRef)
    setRecords(props.truckPlanRef.current)
  }, [props]);

  const getCamiones = () => {
    console.log("getCamiones", records);
    if (props.truckPlanRef.current != undefined && props.truckPlanRef.current != null)
      setCamionesCargados(true);
  };

  return (
    <div className="averias-container">
      <h1 Style="color: var(--blue);">Averias de camiones</h1>
      <BoxTbl>
        {camionesCargados ? (
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item.idTruck}>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      ID DEL CAMIÓN: {item.idTruck} - {item.idTruckPlan}
                    </Typography>
                    <div>Estado: {item.status}</div>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {`${item.numPackages}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {`${item.status}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="info"
                      onClick={(event) => {
                        handleDisableTruckPlan(item.idTruckPlan);
                      }}
                    >
                      1
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="info"
                      onClick={(event) => {
                        handleCrippleTruckPlan(item.idTruckPlan);
                      }}
                    >
                      2
                    </Controls.ActionButton>
                    <Controls.ActionButton
                      color="info"
                      onClick={(event) => {
                        handleKillTruckPlan(item.idTruckPlan);
                      }}
                    >
                      3
                    </Controls.ActionButton>
                  </TableCell>
                  <TableCell>
                  <Controls.ActionButton
                      color="info"
                      onClick={(event) => {
                        handleDetail(item);
                      }}
                    >
                      VER
                    </Controls.ActionButton>
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
      {visible ? <Viajes travels={travels} /> : <></>}
    </div>
  );
}
