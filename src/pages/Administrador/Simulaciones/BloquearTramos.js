import React, { useState, useEffect } from "react";
import {
  Grid,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  TableBody,
  TableCell,
  TableRow,
  Typography,
  Box,
} from "@mui/material";
import { Controls } from "../../../components/controls/Controls";
import provinceService from "../../../services/provinceService.js";
import regionService from "../../../services/regionService.js";
import useTable from "../../../components/useTable";
import "./BloquearTramos.css";
import CloseIcon from '@mui/icons-material/Close';

import { useHistory } from "react-router-dom";
import LinearProgress from "@mui/material/LinearProgress";

function dateToStringParam(dateForm) {
  let year, month, day, hour, min;
  year = `${dateForm.getFullYear()}`;
  month = `${dateForm.getMonth()+1}`;
  day = `${dateForm.getDate()}`;
  hour = `${dateForm.getHours()}`;
  min = `${dateForm.getMinutes()}`;
  return day + "-" + month + "-" + year + "-" + hour + ":" + min;
}

export default function BloquearTramos(props) {
  const handleKillTramo = (idEdge) => {
    console.log("evento handleKillTramo", idEdge);
    provinceService.bloquearTramo(idEdge).then((data) => {
      console.log("bloquearTramo", data);
    })
  };
  const tableHeaders = [
    {
      id: "id",
      label: "ID",
      numeric: false,
      sortable: true,
    },
    {
      id: "origen",
      label: "ORIGEN",
      numeric: false,
      sortable: false,
    },
    {
      id: "destino",
      label: "DESTINO",
      numeric: false,
      sortable: false,
    },
    {
      id: "accion",
      label: "ACCIÓN",
      numeric: false,
      sortable: false,
    },
  ];
  const history = useHistory();
  const [tramos, setTramos] = useState([]);
  const [provincias, setProvincias] = useState([]);
  const [provinciaSeleccionada, setProvinciaSeleccionada] = useState([]);
  const [regiones, setRegiones] = useState([]);
  const [regionSeleccionada, setRegionSeleccionada] = useState([]);
  const [records, setRecords] = useState([]);
  const [clockRef, setclockRef] = useState(props.clockRef);
  const [tramosCargados, setTramosCargados] = useState(false);
  const path = "misPedidos/detalle";

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
    obtenerRegiones();
    console.log("props", props);
    let fecha = dateToStringParam(clockRef.current);
    console.log("CLOCK", fecha);
    provinceService.mostrarTramos(fecha).then((data) => {
      console.log("mostrarTramos", data);
    })
  }, props);

  const obtenerProvincias = async (id_region) => {
    const response = await provinceService.getProvinciasByRegion(id_region);
    console.log("provincias response", response);

    if (response) {
      setProvincias(response);
    }
  };

  const obtenerTramos = async (id_province) => {
    const response = await provinceService.getTramos(id_province);
    console.log("tramos response", response);

    if (response) {
      setTramos(response);
      setRecords(response);
      setTramosCargados(true);
    }
  };

  const handleProvinciaChange = async (e) => {
    console.log("e.target.value", e);
    setProvinciaSeleccionada(e.target.value);
    obtenerTramos(e.target.value);
  };

  const obtenerRegiones = async () => {
    const response = await regionService.getRegiones();
    console.log("regiones response", response);
    setRegiones(response);
  };

  const handleRegionChange = async (e) => {
    console.log("e.target.value", e.target.value);
    setRegionSeleccionada(e.target.value);
    await obtenerProvincias(e.target.value);
  };

  return (
    <div className="contenedor-bloqueos">
      <h1 Style="color: var(--blue);">Bloquear Tramos</h1>
      <div className="box">
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="delivery-department">
              Departamento de entrega
            </InputLabel>
            <Select
              labelId="delivery-department"
              id="delivery-department-select"
              value={regionSeleccionada}
              onChange={handleRegionChange}
              label="Departamento de entrega"
              sx={{ width: 0.5 }}
            >
              {regiones.map((region) => {
                return <MenuItem value={region.id}>{region.name}</MenuItem>;
              })}
            </Select>
          </FormControl>
        </Grid>
      </div>
      <div className="box">
        <Grid item xs={6}>
          <FormControl fullWidth>
            <InputLabel id="delivery-province">Provincia de entrega</InputLabel>
            <Select
              labelId="delivery-province"
              id="delivery-province-select"
              value={provinciaSeleccionada}
              onChange={handleProvinciaChange}
              label="Provincia de entrega"
              sx={{ width: 0.5 }}
            >
              {provincias.map((provincia) => {
                return (
                  <MenuItem value={provincia.id}>{provincia.name}</MenuItem>
                );
              })}
            </Select>
          </FormControl>
        </Grid>
      </div>
      <div>
        <BoxTbl>
          {tramosCargados ? (
            <TblContainer>
              <TblHead />
              <TableBody>
                {recordsAfterPagingAndSorting().map((item, index) => (
                  <TableRow key={item.idEdge}>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        ID del vértice: {item.idEdge}
                      </Typography>
                      <div>{item.blocked == true ? 'Bloqueado' : 'Libre'}</div>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {`${item.vertexes[0].provinceName}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography sx={{ paddingLeft: 2.5 }}>
                        {`${item.vertexes[1].provinceName}`}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Controls.ActionButton
                        color="info"
                        onClick={(event) => {
                          handleKillTramo(item.idEdge);
                        }}
                      >
                        <CloseIcon fontSize="small" color="error"/>
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
      </div>
    </div>
  );
}
