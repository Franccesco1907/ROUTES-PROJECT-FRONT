import React, { useState, useRef, useEffect } from "react";
import UtilsFunction from "../utils/UtilsFunction.js";
import "../../assets/estilos/Mapa.css";
///////////////////////////////////////////////////////
export default function BloqueoOperacion(props) {
  const [time, setTime] = useState(0);
  const [params, setParams] = useState({
    ini: { x: 0, y: 0 },
    end: { x: 0, y: 0 },
  });

  UtilsFunction.useEffectOnce(() => {
    let aux = props.dictVertex[props.bloqueo.vertexes[0].idVertex];
    let ini = {
      x: aux.x,
      y: aux.y,
    };
    aux = props.dictVertex[props.bloqueo.vertexes[1].idVertex];
    let end = {
      x: aux.x,
      y: aux.y,
    };
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

  return (
    <line
      id={`block${props.bloqueo.idEdge}`}
      key={props.bloqueo.idEdge}
      style={{ strokeOpacity: `${props.checked ? 1 : 0}` }}
      className="block"
      x1={params.ini.x}
      y1={params.ini.y}
      x2={params.end.x}
      y2={params.end.y}
    />
  );
}
///////////////////////////////////////////////////////
