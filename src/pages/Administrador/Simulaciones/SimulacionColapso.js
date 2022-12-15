import { Grid } from "@mui/material";
import CloudUploadOutlinedIcon from "@mui/icons-material/CloudUploadOutlined";
import React, { useState, useEffect, useRef } from "react";
import { Controls } from "../../../components/controls/Controls";
import Popup from "../../../components/utils/PopUp";
import ContentHeader from "../../../components/AppMain/ContentHeader";
import MapaColapso from "../../../components/PageComponents/MapaColapso";
import BotonPause from "../../../components/PageComponents/BotonPause";
import BotonPlay from "../../../components/PageComponents/BotonPlay";
import verticeService from "../../../services/verticeService";
import BotonFast from "../../../components/PageComponents/BotonFast";
import "../../../assets/estilos/Sim7Dias.css";
import UtilsFunction from "../../../components/utils/UtilsFunction";
import "../../../assets/estilos/BotonPause.css";
import "../../../assets/estilos/BotonPlay.css";
import CheckBox from "../../../components/PageComponents/CheckBox";
import { set } from "date-fns";

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
    props.begin && !props.pause && props.isAnimRun? 1000 : null
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

const SimulacionColapso = () => {
  const [openPopupOrder, setOpenPopupOrder] = useState(false);
  const [openPopupVertex, setOpenPopupVertex] = useState(false);
  const [recordsOrder, setRecordsOrder] = useState([]);
  const [recordsVertex, setRecordsVertex] = useState([]);
  const [pedidos, setPedidos] = useState([]);
  const [isAnimRun,setIsAnimRun] = useState(false);
  const [vertices, setVertices] = useState([]);
  const [pause, setPause] = useState(false);
  const [touchable, setTouchable] = useState(false); //useState(11.8137811912+1); //Multiplica la velocidad de las animaciones
  const [accell, setAccell] = useState(9); //useState(11.8137811912+1); //Multiplica la velocidad de las animaciones
  const [begin, setBegin] = useState(false);
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

    pausarAnimacion();
  });

  const nombrarProvincia = (val) => {
    alert("Provincia de " + val);
  };

  const handleCheckbox = () => {
    setChecked(!checked);
  };

  const pausarAnimacion = () => {
    setPause(true);
    const elems = document.getElementsByClassName("svgContainer");
    for (let elem of elems) {
      elem.pauseAnimations();
    }
  };

  const empezarAnimacion = () => {
    setPause(false);
    if (begin == false) setBegin(true);
    const elems = document.getElementsByClassName("svgContainer");
    for (let elem of elems) {
      elem.unpauseAnimations();
    }
  };

  const changeAnimState=(state)=>{
    state==0?setIsAnimRun(false):setIsAnimRun(true);
  }

  const acelerar = () => {
    setAccell((accell) => accell + 1);

    const svgs = document.getElementsByClassName("svgContainer");
    for (let svg of svgs) {
      let anim = svg.children[1].children[0];
      let oldDur = anim.getAttribute("dur");
      anim.setAttribute("dur", oldDur / 2);
      const currTime = svg.getCurrentTime();
      //console.log(currTime);
      anim.beginElement();
      svg.setCurrentTime(currTime / 2);
    }
  };

  const habilitarPrimerPlay = () => setTouchable(true);

  return (
    <>
      <ContentHeader text="Simulación Colapso" cbo={false} />
      <Grid container spacing={2} maxWidth={1}></Grid>
      <div>
        <MapaColapso
          array={vertices}
          dict={dictVertex}
          manejarClick={nombrarProvincia}
          accell={accell}
          begin={begin}
          pause={pause}
          checked={checked}
          habilitar={habilitarPrimerPlay}
          changeAnimState={changeAnimState}
        />
      </div>
      <div>
        {begin ? (
          <div
            className="loader"
            style={{ animationPlayState: `${pause ? "paused" : "running"}` }}
          ></div>
        ) : (
          <></>
        )}
        {pause ? (
          <BotonPlay handleClick={empezarAnimacion} touchable={touchable} />
        ) : (
          <BotonPause handleClick={pausarAnimacion} />
        )}
        <BotonFast acelerar={acelerar} touchable={touchable} />
        <Timer accell={accell} pause={pause} begin={begin} isAnimRun={isAnimRun}/>
        <Timer accell={1} pause={pause} begin={begin} isAnimRun={isAnimRun}/>
        <CheckBox handleClick={handleCheckbox} value={checked} />
        <div>Factor de aceleracion: {accell}</div>
      </div>
    </>
  );
};

export default SimulacionColapso;
