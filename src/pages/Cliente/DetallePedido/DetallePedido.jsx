import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import { useLocation } from "react-router-dom";

import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import SearchIcon from "@mui/icons-material/Search";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";

import "./DetallePedido.css";
import { Form } from "../../../components/useForm";
import {
  Box,
  Grid,
  InputAdornment,
  LinearProgress,
  TablePagination,
  TableRow,
  Typography,
} from "@mui/material";
import { Controls } from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import deliveryService from "../../../services/deliveryService";
import ContentHeader from "../../../components/AppMain/ContentHeader";
import BorderBox from "../../../components/PackRunner/BorderBox";
import HeaderPedido from "../../../components/PackRunner/HeaderPedido";

const tableHeaders = [
  {
    id: "codigo",
    label: "Cod. de parte",
    numeric: false,
    sortable: true,
  },
  {
    id: "cantidad",
    label: "Cantidad",
    numeric: false,
    sortable: false,
  },
  {
    id: "fecha",
    label: "Fecha y hora de entrega",
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

export default function DetallePedido() {
  const location = useLocation();
  const path = "detalle/planTransporte";
  const history = useHistory();
  const [partesCargadas, setPartesCargadas] = useState(false);
  const [pedido, setPedido] = useState(location.state);
  const [numPartes, setNumPartes] = useState();
  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });

  const handleDetail = (e, path, item) => {
    console.log("evento detail", e);
    console.log("item detail", item);
    console.log("location detail", location);
    item = {...item, "id_ped": location.state.id}
    history.push(path, item);
  };

  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl,
  } = useTable(records, tableHeaders, filterFn);

  useEffect(() => {
    setPartesCargadas(false);
    getPartes();
  }, []);

  function transformarPartes(request) {
    const recordsX = [];
    request.map((par) => {
      //console.log("partes antes de foramtear", par);
      //let fecha = ped.orderDate.substring(0, 19);
      //Armo el objeto
      recordsX.push({
        code: par.id,
        numPackages: par.numPackages,
        deliveryDate: par.deliveryDate,
        // fleet: par.assignedTruck.truck.fleet,
      });
    });
    return recordsX;
  }

  const getPartes = async () => {
    //obtengo id del pedido
    const request = await deliveryService.getDeliveryByOrder(pedido.id);
    setNumPartes(request.length);
    const recordsX = transformarPartes(request);
    setRecords(recordsX);
    setPartesCargadas(true);
  };

  return (
    <div>
      <h1 className="detail-order-title">DETALLE DE PEDIDO: </h1>
      <div className="detail-row">
        <div className="detail-column">
          <h2 className="detail-order-subtitle">
            PEDIDO: <span style={{ color: "#000000" }}>{pedido.id}</span>
          </h2>
          <h2 className="detail-order-subtitle">
            FECHA DE PEDIDO:{" "}
            <span style={{ color: "#000000" }}>
              {pedido.orderDate
                ? pedido.orderDate.substring(0, 10)
                : "No asignado"}
            </span>
          </h2>
          <h2 className="detail-order-subtitle">
            HORA DE PEDIDO:{" "}
            <span style={{ color: "#000000" }}>
              {pedido.orderDate
                ? pedido.orderDate.substring(11, 19)
                : "No asignado"}
            </span>
          </h2>
          <h2 className="detail-order-subtitle">
            CANTIDAD DE PAQUETES:{" "}
            <span style={{ color: "#000000" }}>{pedido.numPackages}</span>
          </h2>
          <h2 className="detail-order-subtitle">
            CANTIDAD DE PARTES:{" "}
            <span style={{ color: "#000000" }}>{numPartes}</span>
          </h2>
        </div>
        <div className="detail-column">
          <h2 className="detail-order-subtitle">
            LUGAR DE ENTREGA:{" "}
            <span style={{ color: "#000000" }}>{pedido.office}</span>
          </h2>
          <h2 className="detail-order-subtitle">
            FECHA DE ENTREGA:{" "}
            <span style={{ color: "#000000" }}>
              {pedido.deliveryDate
                ? pedido.deliveryDate.substring(0, 10)
                : "No asignado"}
            </span>
          </h2>
          <h2 className="detail-order-subtitle">
            HORA DE ENTREGA:{" "}
            <span style={{ color: "#000000" }}>
              {pedido.deliveryDate
                ? pedido.deliveryDate.substring(11, 19)
                : "No asignado"}
            </span>
          </h2>
        </div>
      </div>
      <Form>
        <BoxTbl>
          {partesCargadas ? (
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item.code}>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {item.code}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {item.numPackages}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {item.delivery
                          ? item.deliveryDate.substring(0, 10)
                          : "No asignado"}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="info"
                        onClick={(event) => {
                          handleDetail(event, path, item);
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
      </Form>
    </div>
  );
}
