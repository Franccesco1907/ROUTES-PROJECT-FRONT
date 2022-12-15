import axios from "axios";
import url from "../config";

let config = {
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
};

const getVertices = async () => {
  try {
    const request = await axios.get(`${url}/vertex/`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getVertice = async (id) => {
  try {
    const request = await axios.get(`${url}/vertex/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const registerVertice = async (newObject) => {
  try {
    const request = await axios.post(`${url}/vertex/`, newObject, config);
    return request.data;
  } catch (except) {
    console.error("No funca");
  }
};

const borrarVertice = async (id) => {
  try {
    const request = await axios.delete(`${url}/vertex/${id}`, id);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const updateVertice = async (newObject, id) => {
  try {
    const request = await axios.put(`${url}/vertex/${id}`, newObject);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const getVerticeByProvince = async (id) => {
  try {
    const request = await axios.get(`${url}/vertex/getByProvince/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

export default {
  getVertices,
  getVertice,
  registerVertice,
  borrarVertice,
  updateVertice,
  getVerticeByProvince,
};
