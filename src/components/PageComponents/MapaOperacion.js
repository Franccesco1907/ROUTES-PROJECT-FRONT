import { set } from "date-fns";
import React, { useState, useRef, useEffect } from "react";

import "../../assets/estilos/Mapa.css";
import truckPlanService from "../../services/truckPlanService";
import UtilsFunction from "../utils/UtilsFunction.js";
import PlanCamionOperacion from "./PlanCamionOperacion";
import AveriasCamiones from "../../pages/Administrador/Simulaciones/AveriasCamiones";
import BloquearTramos from "../../pages/Administrador/Simulaciones/BloquearTramos";
import PrismaZoom from "react-prismazoom";
import getZoom from "react-prismazoom";
import Bloqueo from "./Bloqueo";
import provinceService from "../../services/provinceService";
import BloqueoOperacion from "./BloqueoOperacion";

const totDistTime = (travels, currDate) => {
  let sumTime = 0;
  let sumDist = 0;
  let lastArrival = currDate;
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
      sumTime +=
        (dateArrival.getTime() - dateDeparture.getTime()) * 2.77778e-7 +
        (dateDeparture.getTime() - lastArrival.getTime()) * 2.77778e-7;
      sumDist += travels[i].edgeDistance;
    } //Si esta a mitad de camino
    else {
      let porcRecorrido =
        (((lastArrival.getTime() - dateDeparture.getTime()) * 2.77778e-7) /
          (dateArrival.getTime() - dateDeparture.getTime())) *
        2.77778e-7;
      sumTime +=
        (1 - porcRecorrido) *
        (dateArrival.getTime() - dateDeparture.getTime()) *
        2.77778e-7;
      sumDist += (1 - porcRecorrido) * travels[i].edgeDistance;
    }
    lastArrival = dateArrival;
  }
  const tot = { dist: sumDist, time: sumTime };
  return tot;
};

function datePlusMin(dateForm, minPassed) {
  let curr = dateForm.getTime();
  return new Date(curr + minPassed * 60 * 1000);
}

function dateToStringParam(dateForm) {
  let year, month, day, hour, min;
  year = `${dateForm.getFullYear()}`;
  month = `${dateForm.getMonth()+1}`;
  day = `${dateForm.getDate()}`;
  hour = `${dateForm.getHours()}`;
  min = `${dateForm.getMinutes()}`;
  return day + "-" + month + "-" + year + "-" + hour + ":" + min;
}

function stringToDate(stringForm) {
  let year, month, day, hour, min;
  year = stringForm.split("-")[2];
  month = stringForm.split("-")[1]-1;
  day = stringForm.split("-")[0];
  hour = stringForm.split("-")[3].split(":")[0];
  min = stringForm.split("-")[3].split(":")[1];
  return new Date(year, month, day, hour, min);
}

//Factores
const taFactor = 1; //cuanto se demora en ejecutar la API (min)
const saFactor = 60; //cada cuanto se llama a la API (min)
const kFactor = 8; //factor de espacio adicional en pedidos que se toma
const scFactor = kFactor * saFactor; //espacio adicional de tiempo en pedidos que se toma (min)

let temporizador, fechaTypeDate; //maneja el intervalo de llamadas
let currClock, nextClock;

const maxZoom = 80,
  minZoom = 1;
  const scrollChangeZoom = 0.005 * maxZoom;

export default function MapaOperacion(props) {
  //Intervalos
  const clockRef = useRef(new Date()); //(año,mes,dia,hora,min)
  const timerRef = useRef(clockRef.current.getTime());
  const runRef = useRef();
  const idSimRef = useRef();
  const legendRef = useRef(undefined);
  const [legend, setLegend] = useState();
  const [params, setParams] = useState({
    truckPlans: [],
    blocks: [],
  });
  const truckPlanRef = useRef(params.truckPlans);
  const blockRef = useRef(params.blocks);
  //const [zoom, setZoom] = useState(minZoom);

  UtilsFunction.useEffectOnce(() => {
    truckPlanService.getIdSimOperation().then((res) => {
      console.log(res);

      idSimRef.current = res.id;
      updateMap(clockRef.current);
    });
  });

  UtilsFunction.useInterval(() => {
    timerRef.current++;
    let date = new Date(timerRef.current);
    let hour = date.getHours();
    let min = date.getMinutes();
    let seg = date.getSeconds();
    if ((hour % kFactor == 0 || hour == 0) && min == 0 && seg == 0)
      updateMap(date);
  }, 1000);

  const updateMap = (date) => {
    //Calcula la rango de fechas
    clockRef.current = date;
    currClock = dateToStringParam(clockRef.current);
    fechaTypeDate = datePlusMin(clockRef.current, scFactor);
    nextClock = dateToStringParam(fechaTypeDate);
    //llama a las APIs
    truckPlanService.getTruckPlanOperationRun(idSimRef.current).then((res) => {
      runRef.current = res.run;
      truckPlanService
        .getFilteredTruckPlans(idSimRef.current, runRef.current, true)
        .then((res) => {
          console.log("seteando truckPlanRef", res);
          truckPlanRef.current = [...res.truckPlans];
          console.log("Termina GET truckPlans");
          //LLama los bloqueos
          provinceService
            .mostrarTramos(currClock)
            .then((res) => {
              blockRef.current=[...res];
              console.log("bloqueos", res);

              setParams({ truckPlans: truckPlanRef.current, blocks: blockRef.current });
            });
        });
    });
  };

  const handlePointer = (e) => {
    setLegend(e);
  };

  const changeZoom = () => {
    console.log(getZoom());
  };

  return (
    <div className="contenedor-mapa">
      <div className="mapContainer">
        {legend != undefined ? (
          <div
            className="legend"
            style={{ position: "absolute", bottom: 0, left: 0, zIndex: 1 }}
          >
            <b>{legend}</b>
          </div>
        ) : (
          <></>
        )}
        <PrismaZoom
          className="zoomDiv"
          maxZoom={maxZoom}
          scrollVelocity={scrollChangeZoom}
        >
          <img
            className="mapImg"
            src={require("../../assets/images/Peru_location_map.png")}
            alt="imgMap"
          />
          {props.array.map((vertex) => (
            <div
              id={vertex.idVertex}
              className={`vertex`.trimEnd()}
              style={{ left: `${vertex.x}px`, top: `${vertex.y}px` }}
              alt={vertex.provinceName}
              key={vertex.idVertex}
              onClick={() => props.manejarClick(vertex.provinceName)}
              onMouseOver={() => handlePointer(vertex.provinceName)}
            />
          ))}
          <svg
            style={{ position: "absolute" }}
            width="626"
            height="909"
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            xmlnsXlink="http://www.w3.org/1999/xlink"
          >
            {params.blocks.map((bloqueo) =>
                Object.keys(props.dict).length != 0 ? (
                  <BloqueoOperacion
                    checked={props.checked}
                    pause={false}
                    accell={1}
                    bloqueo={bloqueo}
                    dictVertex={props.dict}
                  />
                ) : (
                  <></>
                )
              )}
          </svg>
          {Array.isArray(params.truckPlans) ? (
            params.truckPlans.filter((truckPlan)=>truckPlan.status=="OPERATIONAL" && truckPlan.travelling).map((truckPlan) => (
              <svg
                id={`svg${truckPlan.idTruckPlan}`}
                className="svgContainer"
                key={`svg${truckPlan.idTruckPlan}`}
                width="626"
                height="909"
                xmlns="http://www.w3.org/2000/svg"
                version="1.1"
                xmlnsXlink="http://www.w3.org/1999/xlink"
              >
                <PlanCamionOperacion
                  keys={truckPlan.idTruckPlan}
                  array={props.array}
                  dictVertex={props.dict}
                  checked={props.checked}
                  currDate={clockRef.current}
                  truckPlan={truckPlan}
                  tot={totDistTime(truckPlan.travels, clockRef.current)}
                />
              </svg>
            ))
          ) : (
            <></>
          )}
        </PrismaZoom>
      </div>
      <div>
        <BloquearTramos
        clockRef={clockRef}
        ></BloquearTramos>
        {idSimRef.current != undefined ? (
          <AveriasCamiones
            idSimRef={idSimRef}
            truckPlanRef={truckPlanRef}
          ></AveriasCamiones>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
}
