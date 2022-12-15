import axios from "axios";
import url from "../config";

axios.defaults.headers = {
  "Cache-Control": "no-cache",
  Pragma: "no-cache",
  Expires: "0",
};

const getTruckPlans = async () => {
  try {
    const request = await axios.get(`${url}/truckPlan/`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getTruckPlansWithDates = async (iniDate, endDate) => {
  try {
    console.log(iniDate);
    console.log(endDate);
    const request = await axios.get(
      `${url}/simulation/run?start=${iniDate}&end=${endDate}`
    );
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const initSimulation = async (type, clock) => {
  try {
    //type: 7days, collapse, ""
    console.log(`${url}/simulation/start?type=${type}&clock=${clock}`);
    const request = await axios.get(
      `${url}/simulation/start?type=${type}&clock=${clock}`
    );
    return request.data.id;
  } catch (except) {
    console.log(except);
  }
};

const runAlgorithm = async (idSim, nRun, iniDate, endDate) => {
  try {
    console.log(
      `${url}/simulation/run?simulation=${idSim}&run=${nRun}&start=${iniDate}&end=${endDate}`
    );
    const request = await axios.get(
      `${url}/simulation/run?simulation=${idSim}&run=${nRun}&start=${iniDate}&end=${endDate}`
    );
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const getFilteredTruckPlans = async (idSim, nRun, travelling) => {
  try {
    //travelling: true or false
    console.log(
      `${url}/truckPlan/?simulation=${idSim}&run=${nRun}`
    );
    const request = await axios.get(
      `${url}/truckPlan/?simulation=${idSim}&run=${nRun}`
    );
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const getFilteredBlocks = async (iniDate, endDate) => {
  try {
    //travelling: true or false
    console.log(`${url}/block/?start=${iniDate}&end=${endDate}`);
    const request = await axios.get(
      `${url}/block/?start=${iniDate}&end=${endDate}`
    );
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const getIdSimOperation = async () => {
  try {
    //travelling: true or false
    const request = await axios.get(`${url}/simulation/getLastSimulation`);
    console.log(`${url}/simulation/getLastSimulation`);
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const getTruckPlanOperationRun = async (idSim) => {
  try {
    //travelling: true or false
    const request = await axios.get(
      `${url}/truckPlan/getFirstBySimulation?id=${idSim}`
    );
    console.log(`${url}/truckPlan/getFirstBySimulation?id=${idSim}`);
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const getTruckPlansBySim = async (idSim) => {
  try {
    //travelling: true or false
    const request = await axios.get(
      `${url}/truckPlan/getBySimulation?id=${idSim}`
    );
    console.log(`${url}/truckPlan/getBySimulation?id=${idSim}`);
    return request.data;
  } catch (except) {
    console.log(except);
  }
};

const disableTruckPlan = async (idTruckPlan) => {
  try {
    const request = await axios.get(`${url}/truckPlan/disable?id=${idTruckPlan}`);
    console.log(`${url}/truckPlan/disable?id=${idTruckPlan}`);
    return request.data;
  } catch (except) {
    console.log(except);
  }
};
const crippleTruckPlan = async (idTruckPlan) => {
  try {
    const request = await axios.get(`${url}/truckPlan/cripple?id=${idTruckPlan}`);
    console.log(`${url}/truckPlan/cripple?id=${idTruckPlan}`);
    return request.data;
  } catch (except) {
    console.log(except);
  }
};
const killTruckPlan = async (idTruckPlan) => {
  try {
    const request = await axios.get(`${url}/truckPlan/kill?id=${idTruckPlan}`);
    console.log(`${url}/truckPlan/kill?id=${idTruckPlan}`);
    return request.data;
  } catch (except) {
    console.log(except);
  }
};


export default {
  getFilteredBlocks,
  getTruckPlans,
  getTruckPlansWithDates,
  initSimulation,
  runAlgorithm,
  getFilteredTruckPlans,
  getIdSimOperation,
  getTruckPlanOperationRun,
  disableTruckPlan,
  crippleTruckPlan,
  killTruckPlan,
  getTruckPlansBySim,
};
