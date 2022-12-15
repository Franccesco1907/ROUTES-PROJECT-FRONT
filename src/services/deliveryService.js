import axios from "axios";
import url from "../config";

const getDeliveries = async () => {
  try {
    const request = await axios.get(`${url}/delivery/`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getDelivery = async (id) => {
  try {
    const request = await axios.get(`${url}/delivery/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getDeliveryByOrder = async (id) => {
  try {
    const request = await axios.get(`${url}/delivery/getByOrder/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const registerDelivery = async (newObject) => {
  try {
    const request = await axios.post(`${url}/delivery/`, newObject);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const borrarDelivery = async (id) => {
  try {
    const request = await axios.delete(`${url}/delivery/${id}`, id);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const updateDelivery = async (newObject, id) => {
  try {
    const request = await axios.put(`${url}/delivery/${id}`, newObject);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const getTruckPlansByOrder = async (id) => {
  try {
    const request = await axios.get(`${url}/delivery/plans?id=${id}`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

export default {
  getDeliveries,
  getDelivery,
  getDeliveryByOrder,
  registerDelivery,
  borrarDelivery,
  updateDelivery,
  getTruckPlansByOrder
};
