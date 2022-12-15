import axios from "axios";
import url from "../config";

const getProvincias = async () => {
  try {
    const request = await axios.get(`${url}/province/`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getProvinciasByRegion = async (id) => {
  try {
    console.log("parametro gerProvincias", id);
    const request = await axios.get(`${url}/province/getByRegion/${id}`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getProvince = async (id) => {
  try {
    const request = await axios.get(`${url}/province/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getProvinceByName = async (name) => {
  try {
    const request = await axios.get(`${url}/province/get/${name}`, name);
    return request.data;
  } catch (except) {
    console.error("No funca");
  }
};

const registerProvince = async (newObject) => {
  try {
    const request = await axios.post(`${url}/province/`, newObject);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const borrarProvince = async (id) => {
  try {
    const request = await axios.delete(`${url}/province/${id}`, id);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const updateProvince = async (newObject, id) => {
  try {
    const request = await axios.put(`${url}/province/${id}`, newObject);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const getTramos = async (id) => {
  try {
    const request = await axios.get(`${url}/edge/?vertex=${id}`);
    return request.data;
  } catch (except) {
    console.error("No funca");
  }
};

const bloquearTramo = async (id) => {
  try {
    const request = await axios.get(`${url}/edge/block?id=${id}`);
    return request.data;
  } catch (except) {
    console.error("No funca");
  }
};

const mostrarTramos = async (date) => {
  try {
    const request = await axios.get(`${url}/block/blocked?date=${date}`);
    return request.data;
  } catch (except) {
    console.error("No funca");
  }
};

export default {
  getProvincias,
  getProvince,
  getProvinceByName,
  registerProvince,
  borrarProvince,
  updateProvince,
  getProvinciasByRegion,
  getTramos,
  mostrarTramos,
  bloquearTramo
};
