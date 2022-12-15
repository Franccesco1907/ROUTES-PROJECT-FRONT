import { set } from "date-fns";
import React, { useState, useRef } from "react";
import { saveAs } from "file-saver";

import "../../assets/estilos/Mapa.css";
import truckPlanService from "../../services/truckPlanService";
import UtilsFunction from "../utils/UtilsFunction.js";
import TruckPlanController from "./TruckPlanController";
import PrismaZoom from "react-prismazoom";
import Bloqueo from "./Bloqueo";

function datePlusMin(dateForm, minPassed) {
  let curr = dateForm.getTime();
  return new Date(curr + minPassed * 60 * 1000);
}

function dateToStringParam(dateForm) {
  let year, month, day, hour, min;
  year = `${dateForm.getFullYear()}`;
  month = `${dateForm.getMonth() + 1}`;
  day = `${dateForm.getDate()}`;
  hour = `${dateForm.getHours()}`;
  min = `${dateForm.getMinutes()}`;
  return day + "-" + month + "-" + year + "-" + hour + ":" + min;
}

function stringToDate(stringForm) {
  let year, month, day, hour, min;
  year = stringForm.split("-")[2];
  month = stringForm.split("-")[1] - 1;
  day = stringForm.split("-")[0];
  hour = stringForm.split("-")[3].split(":")[0];
  min = stringForm.split("-")[3].split(":")[1];
  return new Date(year, month, day, hour, min);
}

let temporizador, fechaTypeDate; //maneja el intervalo de llamadas
let currClock, nextClock;

const maxZoom = 80,
  minZoom = 1;
  const scrollChangeZoom = 0.005 * maxZoom;

//Factores
const taFactor = 1; //cuanto se demora en ejecutar la API (min)
const saFactor = 60; //cada cuanto se llama a la API (min)
const kFactor = 8; //factor de espacio adicional en pedidos que se toma
const scFactor = kFactor * saFactor; //espacio adicional de tiempo en pedidos que se toma (min)

const iniClock = new Date(); //mAYO
const iniNextClock = datePlusMin(iniClock, scFactor);
const endClock = datePlusMin(iniClock, 10080); //Le suma 7 días en minutos
const limit = iniNextClock.getTime() - iniClock.getTime();

function MapaColapso(props) {
  //Intervalos
  const clockRef = useRef(iniClock); //(año,mes,dia,hora,min)
  const currClockRef = useRef(new Date(iniClock.getTime() - limit));
  const reportRef = useRef("");
  const runRef = useRef(1);
  const idSimRef = useRef();
  const legendRef = useRef(undefined);
  const [legend, setLegend] = useState();
  const isInAlgorithmRef = useRef(false);
  const [params, setParams] = useState({
    truckPlans: [],
    blocks: [],
  });
  const truckPlanRef = useRef(params.truckPlans);
  const blockRef = useRef(params.blocks);

  UtilsFunction.useEffectOnce(() => {
    truckPlanService
      .initSimulation("collapse", dateToStringParam(clockRef.current))
      .then((id) => {
        idSimRef.current = id;
        currClock = dateToStringParam(clockRef.current);
        fechaTypeDate = datePlusMin(clockRef.current, scFactor);
        nextClock = dateToStringParam(fechaTypeDate);
        console.log(`Algoritmo run ${runRef.current} inicia`);
        truckPlanService
          .runAlgorithm(idSimRef.current, runRef.current, currClock, nextClock)
          .then((res) => {
            console.log("Algoritmo terminado");
            console.log(`Inicia GET truckPlans ${runRef.current}`);
            runRef.current++;
            //LLama los truckPlans
            truckPlanService
              .getFilteredTruckPlans(idSimRef.current, runRef.current, true)
              .then((res) => {
                //res.truckPlans=res.truckPlans.filter(truckPlan=>truckPlan.status=="OPERATIONAL");
                truckPlanRef.current.push([...res.truckPlans]);
                console.log(truckPlanRef.current);
                console.log("Termina GET truckPlans");
                //LLama los bloqueos
                truckPlanService
                  .getFilteredBlocks(currClock, nextClock)
                  .then((res) => {
                    console.log("bloqueos");
                    console.log(res);
                    blockRef.current.push([...res]);
                    props.habilitar();
                    prepararData();
                    clockRef.current = stringToDate(nextClock);
                    llamarData();
                  });
              });
          });
      });
  });

  const llamarBloqueos = (currClock, nextClock) => {
    //LLama los bloqueos
    truckPlanService.getFilteredBlocks(currClock, nextClock).then((res) => {
      console.log("bloqueos");
      console.log(res);
      blockRef.current.push([...res]);
      clockRef.current = stringToDate(nextClock);
      llamarData();
    });
  };

  const llamarData = () => {
    currClock = dateToStringParam(clockRef.current);
    fechaTypeDate = datePlusMin(clockRef.current, scFactor);
    nextClock = dateToStringParam(fechaTypeDate);
    console.log(`Algoritmo run ${runRef.current} inicia`);
    truckPlanService
      .runAlgorithm(idSimRef.current, runRef.current, currClock, nextClock)
      .then(() => {
        console.log("Algoritmo terminado");
        console.log(`Inicia GET truckPlans ${runRef.current}`);
        runRef.current++;
        //LLama los truckPlans
        truckPlanService
          .getFilteredTruckPlans(idSimRef.current, runRef.current, true)
          .then((res) => {
            //res.truckPlans=res.truckPlans.filter(truckPlan=>truckPlan.status=="OPERATIONAL");
            reportRef.current = res.report;
            if (res.collapsed) {
              for (let re of res.truckPlans) {
                for (let travel of re.travels) {
                  if (
                    travel.idStartVertex == 193 ||
                    travel.idEndVertex == 193
                  ) {
                    truckPlanRef.current.push(1);
                    blockRef.current.push(1);
                    return; //Para que no ejecute la opcion si no fue PURUS
                  }
                }
              }
              truckPlanRef.current.push(0);
              blockRef.current.push(0);
              //Ya no llama a los bloqueos: es decir no llama data otra vez
            } else {
              truckPlanRef.current.push([...res.truckPlans]);
              llamarBloqueos(currClock, nextClock);
            }
          });
      });
  };

  const prepararData = () => {
    currClockRef.current = new Date(currClockRef.current.getTime() + limit);
    let data = truckPlanRef.current.shift();
    let block = blockRef.current.shift();
    if (data == 1) {
      alert(`fin simulacion colapso PURUS`);
      var blob = new Blob([reportRef.current], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "Reporte.txt");
      return;
    } else if (data == 0) {
      alert(`fin simulacion colapso`);
      var blob = new Blob([reportRef.current], {
        type: "text/plain;charset=utf-8",
      });
      saveAs(blob, "Reporte.txt");
      return;
    } else setParams({ truckPlans: data, blocks: block });
    console.log("data preparada");
  };

  const handlePointer = (e) => {
    setLegend(e);
  };

  return (
    <>
      <div className="mapContainer">
        {legend != undefined ? (
          <div
            className="legend"
            style={{ position: "absolute", bottom: 0, left: 0, zIndex: 1 }}
          >
            {legend}
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

          {props.begin && Array.isArray(params.truckPlans)? ( // && Math.floor(props.timer / 86400) < 7
            <TruckPlanController
              truckPlans={params.truckPlans.filter((truckPlan)=>truckPlan.status=="OPERATIONAL" && truckPlan.travelling)}
              array={props.array}
              dictVertex={props.dict}
              checked={props.checked}
              currDate={currClockRef.current}
              accell={props.accell}
              pause={props.pause}
              isInAlgorithm={isInAlgorithmRef}
              truckPlanRef={truckPlanRef}
              limit={Math.round(limit / (1000 * Math.pow(2, props.accell - 1)))} //segundos
              prepararData={prepararData}
              changeAnimState={props.changeAnimState}
            />
          ) : (
            <></>
          )}
          {props.begin && Array.isArray(params.blocks)? ( // && Math.floor(props.timer / 86400) < 7
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
                  <Bloqueo
                    checked={props.checked}
                    pause={props.pause}
                    accell={props.accell}
                    bloqueo={bloqueo}
                    dictVertex={props.dict}
                    currDate={currClockRef.current}
                  />
                ) : (
                  <></>
                )
              )}
            </svg>
          ) : (
            <></>
          )}
        </PrismaZoom>
      </div>
    </>
  );
}

export default MapaColapso;
