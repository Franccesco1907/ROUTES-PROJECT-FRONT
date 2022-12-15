import axios from "axios";
import url from "../config.js";


// Admin
export const getPedidos = async () => {
  try {
    const request = await axios.get(`${url}/order/`);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

export const getPedidosByClient = async (id) => {
  try {
    const request = await axios.get(`${url}/order/getByClient/${id}`);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const getPedido = async (id) => {
  try {
    const request = await axios.get(`${url}/order/${id}`, id);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const registerPedido = async (newObject) => {
  try {
    const request = await axios.post(`${url}/order/`, newObject);
    return request.data;
  } catch (exception) {
    console.error(exception);
    return false;
  }
};

const updatePedido = async (newObject) => {
  try {
    console.log(newObject);
    const request = await axios.put(`${url}/order/`, newObject);
    return request.data; //Es un valor de true o no
  } catch (exception) {
    console.error(exception);
  }
};

const deletePedido = async (id) => {
  try {
    const request = await axios.delete(`${url}/order/${id}`, id);
    return request.data; //Es un valor de true o no
  } catch (exception) {
    console.error(exception);
    return false;
  }
};

const runAlgorithm = async (id) => {
  try {
    await axios.get(`${url}/order/runAlgorithm/${id}`, id);
  } catch (exception) {
    console.error(exception);
  }
};

export default {
  getPedidos,
  getPedidosByClient,
  getPedido,
  registerPedido,
  updatePedido,
  deletePedido,
  runAlgorithm
};
