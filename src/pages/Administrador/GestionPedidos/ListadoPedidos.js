import {
  Grid,
  InputAdornment,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Controls } from "../../../components/controls/Controls";
import useTable from "../../../components/useTable";
import { Form, useForm } from "../../../components/useForm";
import pedidoService from "../../../services/pedidoService";

/* ICONS */
import SearchIcon from "@mui/icons-material/Search";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import LinearProgress from "@mui/material/LinearProgress";
import EditarPedido from "./EditarPedido";
import AgregarPedido from "./AgregarPedido";
import Popup from "../../../components/utils/PopUp";

const tableHeaders = [
  {
    id: "pedido",
    label: "Pedido",
    numeric: false,
    sortable: true,
  },
  {
    id: "cliente",
    label: "Cliente",
    numeric: false,
    sortable: false,
  },
  {
    id: "deposito",
    label: "Deposito",
    numeric: false,
    sortable: false,
  },
  {
    id: "oficina",
    label: "Oficina",
    numeric: false,
    sortable: false,
  },
];

const initialFieldValues = {
  id: -1,
  title: "",
};

export default function ListaPedidos({ openPopup }) {
  const [openPopupAdd, setOpenPopupAdd] = useState(false);
  const [openPopupEdit, setOpenPopupEdit] = useState(false);
  const [recordForEdit, setRecordForEdit] = useState(null);
  const [editIndex, setEditIndex] = useState(); //No tenemos nada al inicio - debemos seleccionar un indice
  const [recordForDel, setRecordForDel] = useState(null);
  const [openDelOnePopup, setDelOnePopup] = useState(false);
  const [openDelAllPopup, setDelAllPopup] = useState(false);
  const [pedidosCargados, setPedidosCargados] = useState(false);

  const [records, setRecords] = useState([]);
  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items;
    },
  });
  const {
    TblContainer,
    TblHead,
    TblPagination,
    recordsAfterPagingAndSorting,
    BoxTbl,
  } = useTable(records, tableHeaders, filterFn);

  useEffect(() => {
    setPedidosCargados(false);
    getPedidos();
  }, []);

  function transformarPedidos(request) {
    const recordsX = [];
    request.map((ped) => {
      //Armo el objeto
    });
    return recordsX;
  }

  const getPedidos = async () => {
    const request = await pedidoService.getPedidos();
    const recordsX = transformarPedidos(request);
    setRecords(recordsX);
    setPedidosCargados(true);
  };

  const eliminarPedidos = async () => {
    records.map((item) => {
      pedidoService.deletePedido(item.id);
    });
    setRecords([]);
    setDelAllPopup(false);
  };

  const handleSearch = (e) => {
    let target = e.target;
    /* React "state object" (useState()) doens't allow functions, only
     * objects.  Thus the function needs to be inside an object. */
    setFilterFn({
      fn: (items) => {
        if (target.value === "")
          /* no search text */
          return items;
        else
          return items.filter((x) =>
            x.apellidos.toLowerCase().includes(target.value.toLowerCase())
          );
      },
    });
  };

  const handleAdd = (e) => {
    setOpenPopupAdd(true);
  };

  const handleDelete = async (index, item) => {
    setEditIndex(index);
    setRecordForDel(item);
    setDelOnePopup(true);
  };

  const handleEdit = (index, item) => {
    setEditIndex(index);
    setRecordForEdit(item);
    setOpenPopupEdit(true);
  };

  return (
    <Form>
      <Grid container>
        <Grid item xs={2.5}>
          <Box sx={{ width: "10vw", align: "Right" }}></Box>
        </Grid>
        <Grid item xs={5.5}>
          <Controls.Input
            label="Buscar Pedidos por Cliente"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <SearchIcon />
                </InputAdornment>
              ),
            }}
            sx={{ width: 0.75 }}
            onChange={handleSearch}
            type="search"
          />
        </Grid>
        <Grid item xs={2}></Grid>
        {/* FIX:  left align */}
        <Grid item xs={2} align="right">
          <Controls.Button
            variant="text+icon"
            text="Agregar Nuevo Pedido"
            onClick={(event) => handleAdd(event)}
          />
        </Grid>
      </Grid>
      <BoxTbl>
        {pedidosCargados ? (
          <TblContainer>
            <TblHead />
            <TableBody>
              {recordsAfterPagingAndSorting().map((item, index) => (
                <TableRow key={item.id}>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      Fecha de pedido: {item.orderDate}
                    </Typography>
                    <div>Nro. Paquetes: {item.numPackages}</div>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {`${item.client.id}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {`${item.depot.id}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Typography sx={{ paddingLeft: 2.5 }}>
                      {`${item.office.id}`}
                    </Typography>
                  </TableCell>
                  <TableCell>
                    <Controls.ActionButton
                      color="warning"
                      onClick={() => {
                        handleEdit(index, item);
                      }}
                    >
                      <EditOutlinedIcon fontSize="small" />
                    </Controls.ActionButton>
                    {/* Accion eliminar */}
                    <Controls.ActionButton
                      color="warning"
                      onClick={() => {
                        handleDelete(index, item);
                      }}
                    >
                      <DeleteOutlinedIcon fontSize="small" />
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
      <Popup
        openPopup={openPopupEdit}
        setOpenPopup={setOpenPopupEdit}
        title={"Editar Pedido"}
      >
        <EditarPedido
          recordForEdit={recordForEdit}
          setOpenPopup={setOpenPopupEdit}
          records={records}
          setRecords={setRecords}
          transformarPedidos={transformarPedidos}
          editIndex={editIndex}
          setEditIndex={setEditIndex}
        />
      </Popup>

      <Popup
        openPopup={openPopupAdd}
        setOpenPopup={setOpenPopupAdd}
        title={"Agregar Pedido"}
      >
        <AgregarPedido
          setOpenPopup={setOpenPopupAdd}
          records={records}
          setRecords={setRecords}
          transformarPedidos={transformarPedidos}
        />
      </Popup>
    </Form>
  );
}
