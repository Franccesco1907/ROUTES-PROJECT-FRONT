import React, { useState, useRef, useEffect } from "react";
import UtilsFunction from "../utils/UtilsFunction.js";
import "../../assets/estilos/Mapa.css";
///////////////////////////////////////////////////////
export default function Bloqueo(props) {
  //const timerRef = useRef(0);
  const limitRef = useRef(0);
  const initialRef = useRef(0);
  const [time, setTime] = useState(0);
  const [params, setParams] = useState({
    ini: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });

  UtilsFunction.useEffectOnce(() => {
    let startDate = UtilsFunction.javaStringDateToDate(props.bloqueo.startDate);
    let endDate = UtilsFunction.javaStringDateToDate(props.bloqueo.endDate);
    let aux = props.dictVertex[props.bloqueo.edge.vertexes[0].idVertex];
    let ini = {
      x: aux.x,
      y: aux.y,
    };
    aux = props.dictVertex[props.bloqueo.edge.vertexes[1].idVertex];
    let end = {
      x: aux.x,
      y: aux.y,
    };
    if(startDate<props.currDate){
      initialRef.current=0;
    }else{
      initialRef.current=(startDate.getTime() - props.currDate.getTime()) / 1000;//segundos
    }
    limitRef.current=(endDate.getTime() - props.currDate.getTime()) / 1000;//segundos
    //console.log("initial")
    //console.log(initialRef.current);
    //console.log("limit")
    //console.log(limitRef.current);
    setParams({ ini: ini, end: end });
  });

  UtilsFunction.useInterval(
    () => {
      //timerRef.current += Math.pow(2, props.accell - 1);
      setTime((time) => time + Math.pow(2, props.accell - 1));
      //console.log(timerRef.current)
      //if(timerRef.current <= limit && timerRef.current >= initial)setVisible(true);
    },
    !props.pause ? 1000 : null
  );

  return time <= limitRef.current && time >= initialRef.current ? ( 
    <line
      id={`block${props.bloqueo.idBlock}`}
      key={props.bloqueo.idBlock}
      style={{ strokeOpacity: `${props.checked ? 1 : 0}` }}
      className="block"
      x1={params.ini.x}
      y1={params.ini.y}
      x2={params.end.x}
      y2={params.end.y}
    />
  ) : (
    <></>
  );
}
///////////////////////////////////////////////////////
