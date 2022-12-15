import React, { useState, useEffect } from 'react';
import { Controls } from '../../../components/controls/Controls';
import {
    Grid,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    Button
} from "@mui/material";
import './RegistrarPedido.css';
import pedidoService from '../../../services/pedidoService.js'
import provinceService from "../../../services/provinceService.js"
import regionService from "../../../services/regionService.js"
import verticeService from "../../../services/verticeService.js"
import userService from "../../../services/userService"
import Notification from '../../../components/utils/Notification';
import { useHistory } from 'react-router-dom';

function isValid(field) {
    console.log("field", field)
    if(field !== null && field !== undefined && field !== 0 && field !== "") return true;
    return false;
}

export default function RegistrarPedido() {
    async function registerOrder () {
        let packages = document.querySelector('input[name=packages-number]').value;
        
        let id_cliente = JSON.parse(localStorage.getItem("user")).id;
        let client = await userService.getClientebyUser(id_cliente);
        
        console.log("cliente", client);

        let order = {
            "office": oficinaSeleccionada,
            "client": client,
            "numPackages": packages
        }
        console.log("order", order)
        if(isValid(order.numPackages))
            await pedidoService.registerPedido(order).then(order => {
                document.querySelector('input[name=packages-number]').value = null;
                setRegionSeleccionada(null);
                setProvinciaSeleccionada(null);
                setOficinaSeleccionada(null);
                setNotify({
                    isOpen: true,
                    message: "Registro exitoso",
                    type: "success",
                });
                console.log("order rr", order);
                pedidoService.runAlgorithm(order.id).then(() => {
                    console.log("CORRIENDO ALGORITMO");
                })
            });
        else console.log("CAMPOS INVÁLIDOS DE REGISTRO");
        console.log(provinceService.getProvincias())
    };

	const history = useHistory();
    const [notify, setNotify] = React.useState({
        isOpen: false,
        message: "",
        type: "",
      });
    const [ provincias, setProvincias ] = useState([]);
    const [ provinciaSeleccionada, setProvinciaSeleccionada ] = useState([]);
    const [ regiones, setRegiones ] = useState([]);
    const [ regionSeleccionada, setRegionSeleccionada ] = useState([]);
    const [ oficinaSeleccionada, setOficinaSeleccionada ] = useState([]);
    
    
    useEffect(() => {
        obtenerRegiones();
    }, []);

    const obtenerProvincias = async (id_region) => {
        const response = await provinceService.getProvinciasByRegion(id_region);
        console.log("provincias response", response);
        
        if(response) {
            setProvincias(response);
        }  
    };

    const handleProvinciaChange = async (e) => {
        console.log("e.target.value", e.target.value);
        setProvinciaSeleccionada(e.target.value);
        let response = await verticeService.getVerticeByProvince(e.target.value);
        if(response) {
            console.log("OFICINA", response);
            setOficinaSeleccionada(response);
        }
    }

    const obtenerRegiones = async () => {
        const response = await regionService.getRegiones();
        console.log("regiones response", response);
        setRegiones(response);
    }

    const handleRegionChange = async (e) => {
        console.log("e.target.value", e.target.value);
        setRegionSeleccionada(e.target.value);
        await obtenerProvincias(e.target.value);
    }

    const goHome = async (e) => {
        history.push('/');
    }

    return (
        <div className='RegistrarPedido'>            
            <h2 className="title">REGISTRAR PEDIDO</h2>
            <Grid 
                container 
                rowSpacing={4} 
                columnSpacing={{ md: 4 }}
                direction="row"
            >
                <Grid item xs={6}>
                    <Controls.Input
                        label="Cantidad de paquetes"
                        name="packages-number"
                        sx={{ width: 0.5 }}
                        type="number"
                        required
                    />
                </Grid>
                <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="delivery-department">Departamento de entrega</InputLabel>
                        <Select
                            labelId="delivery-department"
                            id="delivery-department-select"
                            value={regionSeleccionada}
                            onChange={handleRegionChange}
                            label="Departamento de entrega"
                            sx={{ width: 0.5 }}
                        >
                        {
                            regiones.map(region => {
                                return (
                                    <MenuItem value={region.id}>{region.name}</MenuItem>
                                );
                            })
                        }
                        </Select>
                        </FormControl>
                </Grid>
                <Grid item xs={6}>
                        <FormControl fullWidth>
                        <InputLabel id="delivery-province">Provincia de entrega</InputLabel>
                        <Select
                            labelId="delivery-province"
                            id="delivery-province-select"
                            value={provinciaSeleccionada}
                            label="Provincia de entrega"
                            onChange={handleProvinciaChange}
                            sx={{ width: 0.5 }}
                        >
                        {
                            provincias.map(provincia => {
                                return (
                                    <MenuItem value={provincia.id}>{provincia.name}</MenuItem>
                                );
                            })
                        }
                        </Select>
                        </FormControl>
                </Grid>

                <Grid item xs={10}
                style={{
                    textAlign: 'center',
                    padding: '50px',
                }}>
                        <Button 
                            variant="contained" 
                            className="save"
                            onClick={() => {registerOrder()}}
                        >
                            Guardar
                        </Button>
                        <Button 
                            variant="outlined"
                            className="cancel"
                            onClick={() => {goHome()}}
                        >
                            Cancelar
                        </Button>
                </Grid>

            </Grid>
            <Notification notify={notify} setNotify={setNotify} />
        </div>
    );
}