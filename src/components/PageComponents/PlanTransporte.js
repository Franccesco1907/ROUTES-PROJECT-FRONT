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
  import { Controls } from "../../components/controls/Controls";
  import useTable from "../../components/useTable";
  import { Form } from "../../components/useForm";
  import pedidoService from "../../services/pedidoService";
  import { useHistory } from "react-router-dom";
  
  /* ICONS */
  import SearchIcon from "@mui/icons-material/Search";
  import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
  import LinearProgress from "@mui/material/LinearProgress";
  import userService from "../../services/userService";
  
  const tableHeaders = [
    {
      id: "pedido",
      label: "Pedido",
      numeric: false,
      sortable: true,
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
  
  export default function PlanTransporte() {
    const path = "misPedidos/detalle";
    const handleDetail = (e, path, item) => {
      console.log("evento detail", e);
      console.log("item detail", item);
      history.push(path);
    };
    const history = useHistory();
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
        console.log("pedidos antes de foramtear", ped);
        //let fecha = ped.orderDate.substring(0, 19);
        //Armo el objeto
        recordsX.push({
          id: ped.id,
          numPackages: ped.numPackages,
          orderDate: ped.orderDate,
          depot: ped.depot.name,
          office: ped.office.name,
        });
      });
      return recordsX;
    }
  
    const getPedidos = async () => {
      let user = JSON.parse(localStorage.getItem("user"));
      const cliente = await userService.getClientebyUser(user.id);
      //console.log(cliente);
      const request = await pedidoService.getPedidosByClient(cliente.id);
      //console.log(request);
      const recordsX = transformarPedidos(request);
      setRecords(recordsX);
      setPedidosCargados(true);
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
            <Controls.Button variant="text+icon" text="Agregar Nuevo Pedido" />
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
                        Fecha de pedido: {item.orderDate.substring(0, 10)}
                      </Typography>
                      <div>Nro. Paquetes: {item.numPackages}</div>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {`${item.depot}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {`${item.office}`}
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
    );
  }
  