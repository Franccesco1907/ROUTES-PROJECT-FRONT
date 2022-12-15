import React, { useRef, useState, useEffect } from "react";
import UtilsFunction from "../utils/UtilsFunction.js";
import PlanCamion from "./PlanCamion.js";
import "../../assets/estilos/TruckPlanController.css";

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
        (lastArrival.getTime() - dateDeparture.getTime()) /
        (dateArrival.getTime() - dateDeparture.getTime());
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

export default function TruckPlanController(props) {
  const timerRef = useRef(0);

  console.log(props.limit);

  useEffect(() => {
    timerRef.current = Math.round(timerRef.current / 2);
  }, [props.accell]);

  UtilsFunction.useInterval(
    () => {
      timerRef.current++;
      if (timerRef.current > props.limit) {
        props.changeAnimState(0);
        console.log("limite alcanzado");
        if (props.truckPlanRef.current.length != 0) {
          //if(!props.isInAlgorithm.current){
          console.log(props.truckPlanRef.current);
          timerRef.current = 0;
          props.prepararData();
        }
      }else props.changeAnimState(1);
      console.log(timerRef.current);
    },
    !props.pause ? 1000 : null
  );

  return true ? ( //timerRef.current <= props.limit
    props.truckPlans.map((truckPlan) => {
      return (
        <svg
          id={`svg${truckPlan.idTruckPlan}`}
          className="svgContainer"
          key={truckPlan.idTruckPlan}
          width="626"
          height="909"
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          xmlnsXlink="http://www.w3.org/1999/xlink"
        >
          <PlanCamion
            keys={truckPlan.idTruckPlan}
            array={props.array}
            dictVertex={props.dictVertex}
            currDate={props.currDate}
            limit={props.limit} //segundos
            truckPlan={truckPlan}
            accell={props.accell}
            timerRef={timerRef}
            pause={props.pause}
            checked={props.checked}
            tot={totDistTime(truckPlan.travels, props.currDate)}
            notify={props.notify}
            setNotify={props.setNotify}
          />
        </svg>
      );
    })
  ) : (
    <></>
  );
}
