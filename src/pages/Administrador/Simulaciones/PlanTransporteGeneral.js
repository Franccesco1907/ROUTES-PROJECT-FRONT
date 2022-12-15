import {
  Box,
  LinearProgress,
  TableBody,
  TableCell,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Controls } from "../../../components/controls/Controls";

import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import useTable from "../../../components/useTable";

import "./PlanTransporteGeneral.css";
import Viajes from "./Viajes";

const tableHeaders = [
  {
    id: "id",
    label: "Id",
    numeric: false,
    sortable: false,
  },
  {
    id: "numPaquetes",
    label: "Numero de Paquetes",
    numeric: false,
    sortable: false,
  },
  {
    id: "estado",
    label: "Estado",
    numeric: false,
    sortable: false,
  },
  {
    id: "acciones",
    label: "Acciones",
    numeric: false,
    sortable: false,
  },
];

export default function PlanTransporteGeneral(props) {
  const handleShowTravel = (idTruckPlan, travels) => {
    console.log("evento detail idTruckPlan", idTruckPlan, travels);
    setTravels(travels);
    setVisible(true);
  };

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const [truckPlansCargados, setTruckPlansCargados] = useState(false);
  const [records, setRecords] = useState(props.truckPlanRef);
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
    setTruckPlansCargados(false);
    getTruckPlans();
  }, []);

  const getTruckPlans = async () => {
    let request = props.truckPlanRef;
    console.log("getCamiones", records, props.truckPlanRef);
    const recordsX = transformarPlanes(request);
    setRecords(recordsX);
    setTruckPlansCargados(true);
  };

  function transformarPlanes(request) {
    const recordsX = [];
    request.map((plan) => {
      //console.log("partes antes de foramtear", par);
      //let fecha = ped.orderDate.substring(0, 19);
      //Armo el objeto
      recordsX.push({
        idTruckPlan: plan.idTruckPlan,
        numPackages: plan.numPackages,
        status: plan.status,
        idTruck: plan.idTruck,
        travels: plan.travels,
      });
    });
    return recordsX;
  }

  return (
    <div>
      <h1 Style="color: var(--blue);">Planes de Transporte</h1>
      <BoxTbl>
        {truckPlansCargados ? (
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item}>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {item.idTruckPlan}
                    </Typography>
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
                        handleShowTravel(item.idTruckPlan, item.travels);
                      }}
                    >
                      <RemoveRedEyeIcon fontSize="small" />
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
