import React, { useState, useEffect, useRef } from "react";
import ContentHeader from "../../../components/AppMain/ContentHeader";
import MapaOperacion from "../../../components/PageComponents/MapaOperacion";
import verticeService from "../../../services/verticeService";
import "../../../assets/estilos/Sim7Dias.css";
import UtilsFunction from "../../../components/utils/UtilsFunction";
import "./Operacion.css";
import CheckBox from "../../../components/PageComponents/CheckBox";

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

const botLeftPoint = { x: -9052.970314, y: -2064.598959 };
const topRightPoint = { x: -7642.538006, y: -4.827231 };
//pixeles
let imgHeight = 909;
let imgWidht = 626;
//Se obtienen las dimensiones de la imagen en km
let distX = Math.abs(botLeftPoint.x) - Math.abs(topRightPoint.x);
let distY = Math.abs(botLeftPoint.y) - Math.abs(topRightPoint.y);
//Crear diccionario
let dictVertex = {};

//Componente Timer
const Timer = (props) => {
  const [timer, setTimer] = useState(0);

  UtilsFunction.useInterval(
    () => {
      setTimer((timer) => timer + 1 * Math.pow(2, props.accell - 1));
    },
    props.begin && !props.pause ? 1000 : null
  );

  const getFormatTimer = () => {
    let seconds = timer;
    let numdays = Math.floor(seconds / 86400);
    let numhours = Math.floor((seconds % 86400) / 3600);
    let numminutes = Math.floor(((seconds % 86400) % 3600) / 60);
    let numseconds = ((seconds % 86400) % 3600) % 60;

    return (
      numdays +
      " dias " +
      numhours +
      " horas " +
      numminutes +
      " minutos " +
      numseconds +
      " segundos"
    );
  };

  return <div>{getFormatTimer(timer)}</div>;
};

const Operacion = () => {
  const [openPopupOrder, setOpenPopupOrder] = useState(false);
  const [openPopupVertex, setOpenPopupVertex] = useState(false);
  const [recordsOrder, setRecordsOrder] = useState([]);
  const [recordsVertex, setRecordsVertex] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [vertices, setVertices] = useState([]);
  const [timer, setTimer] = useState(0);
  const [checked, setChecked] = useState(true);

  UtilsFunction.useEffectOnce(() => {
    verticeService.getVertices().then((res) => {
      for (let vertex of res) {
        let newX = Math.abs(botLeftPoint.x) - Math.abs(vertex.x);
        let newY = Math.abs(vertex.y) - Math.abs(topRightPoint.y);

        vertex.x = Math.trunc((Math.abs(newX + 10) * imgWidht) / distX);
        vertex.y = Math.trunc((Math.abs(newY + 10) * imgHeight) / distY);

        dictVertex[vertex.idVertex] = {
          x: vertex.x,
          y: vertex.y,
          province: vertex.provinceName,
        };
      }
      setVertices(res);
    });
  });

  const nombrarProvincia = (val) => {
    alert("Provincia de " + val);
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  return (
    <div className="operacion-columns">
      <div>
        <ContentHeader text="Operación" cbo={false} />
        <div>
          <MapaOperacion
            array={vertices}
            dict={dictVertex}
            manejarClick={nombrarProvincia}
            checked={checked}
          />
          <Timer accell={1} pause={false} begin={true} />
          <CheckBox handleClick={handleCheckbox} value={checked} />
        </div>
      </div>
    </div>
  );
};

export default Operacion;
