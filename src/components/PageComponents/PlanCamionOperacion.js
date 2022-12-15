import React from "react";
import { useState, useEffect, useRef } from "react";

import "../../assets/estilos/PlanCamion.css";
import UtilsFunction from "../utils/UtilsFunction.js";

const crearKeys = (travels, tot, currDate) => {
  //Todo esta en horas
  let points = `0;`,
    distAcum = 0;
  let timePoints = `0;`,
    timeAcum = 0;
  let lastArrival = currDate;
  const factorEspera = 0.0000001;
  //toma solo hasta el penultimo porque el ultimo lo asume con el 1 al final
  for (let i = 0; i < travels.length; i++) {
    let dateDeparture = UtilsFunction.javaStringDateToDate(
      travels[i].dateDeparture
    );
    let dateArrival = UtilsFunction.javaStringDateToDate(
      travels[i].dateArrival
    );
    //Si ya esta o se fue del endVertex
    if (dateArrival <= lastArrival) continue;
    //Si aun no sale del startVertex
    else if (dateDeparture >= lastArrival) {
      timeAcum +=
        (dateDeparture.getTime() - lastArrival.getTime()) * 2.77778e-7;
      timePoints += `${timeAcum / tot.time};`;
      timeAcum += travels[i].edgeTime;
      timePoints += `${timeAcum / tot.time <= 1 ? timeAcum / tot.time : 1};`;
      distAcum += travels[i].edgeDistance * factorEspera;
      points += `${distAcum / tot.dist};`;
      distAcum += travels[i].edgeDistance * (1 - factorEspera);
      points += `${distAcum / tot.dist <= 1 ? distAcum / tot.dist : 1};`;
    } //Si esta a mitad de camino
    else {
      let porcRecorrido =
        ((lastArrival.getTime() - dateDeparture.getTime()) * 2.77778e-7) /
        travels[i].edgeTime;
      timeAcum += (1 - porcRecorrido) * travels[i].edgeTime;
      timePoints += `${timeAcum / tot.time <= 1 ? timeAcum / tot.time : 1};`;
      distAcum += (1 - porcRecorrido) * travels[i].edgeDistance;
      points += `${distAcum / tot.dist <= 1 ? distAcum / tot.dist : 1};`;
    }
    lastArrival = dateArrival;
  }
  const keys = { times: timePoints.slice(0, -1), points: points.slice(0, -1) };
  return keys;
};

const distFromStart2 = (travel, intPoint, currDate, dictVertex) => {
  let startVertex = dictVertex[travel.idStartVertex];
  let endVertex = dictVertex[travel.idEndVertex];
  let dateDeparture = UtilsFunction.javaStringDateToDate(travel.dateDeparture);
  let dateArrival = UtilsFunction.javaStringDateToDate(travel.dateArrival);
  //pixels
  let d = Math.sqrt(
    Math.pow(startVertex.x - endVertex.x, 2) +
      Math.pow(startVertex.y - endVertex.y, 2)
  );
  //porcentaje de distancia recorrido desde el inicio (horas)
  let porc =
    ((currDate.getTime() - dateDeparture.getTime()) * 2.77778e-7) /
    ((dateArrival.getTime() - dateDeparture.getTime()) * 2.77778e-7);
  let dt = d * porc;
  let t = dt / d;

  intPoint.x = (1 - t) * startVertex.x + t * endVertex.x;
  intPoint.y = (1 - t) * startVertex.y + t * endVertex.y;
};

const crearPath = (travels, dictVertex, currDate) => {
  let path = "";
  let lastArrival = currDate;
  let startVertex, endVertex;
  let intPoint = { x: null, y: null };
  for (let i = 0; i < travels.length; i++) {
    startVertex = dictVertex[travels[i].idStartVertex];
    endVertex = dictVertex[travels[i].idEndVertex];
    let dateDeparture = UtilsFunction.javaStringDateToDate(
      travels[i].dateDeparture
    );
    let dateArrival = UtilsFunction.javaStringDateToDate(
      travels[i].dateArrival
    );
    //Si ya esta o se fue del endVertex
    if (dateArrival <= lastArrival) continue;
    //Si aun no sale del startVertex
    else if (dateDeparture >= lastArrival) {
      path += path.length == 0 ? "M" : "L";
      path += `${startVertex.x+1},${startVertex.y+1} `;
    } //Si esta a mitad de camino
    else {
      path += path.length == 0 ? "M" : "L";
      //https://math.stackexchange.com/questions/175896/finding-a-point-along-a-line-a-certain-distance-away-from-another-point
      distFromStart2(travels[i], intPoint, lastArrival, dictVertex);
      path += `${intPoint.x+1},${intPoint.y+1} `;
    }
    lastArrival = dateArrival;
  }
  path += path.length == 0 ? "M" : "L";
  path += `${endVertex.x},${endVertex.y} `;

  return path.trimEnd();
};

export default function PlanCamionOperacion(props) {
  const [params, setParams] = useState({
    path: "",
    keyPoints: "0;1",
    keyTimes: "0;1",
  });

  UtilsFunction.useEffectOnce(() => {
    let conf = { ...params };
    conf.path = crearPath(
      props.truckPlan.travels,
      props.dictVertex,
      props.currDate
    );
    //console.log("soy un camion");
    let keys = crearKeys(props.truckPlan.travels, props.tot, props.currDate);
    conf.keyPoints = keys.points;
    conf.keyTimes = keys.times;
    //console.log(conf);
    setParams(conf);
  });

  const addInput = (id) => {
    alert(`Soy un camion con id ${id}`);
  };

  return (
    <>
      <path
        id={`line${props.keys}`}
        key={`path${props.keys}`}
        className="path"
        d={params.path}
        width={626}
        height={909}
        style={{ strokeOpacity: `${props.checked ? 1 : 0}` }}
      />
      <circle
        id={`${props.truckPlan.idTruck}`}
        key={`${props.truckPlan.idTruck}`}
        className="truck"
        r={1.5}
        cx={0}
        cy={0}
        onClick={() => addInput(props.truckPlan.idTruck)}
      >
        <animateMotion
          id={`animation${props.keys}`}
          className="animation"
          key={`anim${props.keys}`}
          dur={`${props.tot.time * 60 * 60}`}
          keyPoints={params.keyPoints}
          keyTimes={params.keyTimes}
          calcMode="linear"
        >
          <mpath xlinkHref={`#line${props.keys}`} />
        </animateMotion>
      </circle>
    </>
  );
}
