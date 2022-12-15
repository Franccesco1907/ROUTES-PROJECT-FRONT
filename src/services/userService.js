import axios from "axios";
import url from "../config";

const getUsuarios = async () => {
  try {
    const request = await axios.get(`${url}/user/`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getUsuario = async (id) => {
  try {
    const request = await axios.get(`${url}/user/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const registerUsuario = async (newObject) => {
  try {
    const request = await axios.post(`${url}/user/`, newObject);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const registerClient = async (newObject) => {
  try {
    const request = await axios.post(`${url}/client/`, newObject);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const registerAdmin = async (newObject) => {
  try {
    const request = await axios.post(`${url}/supervisor/`, newObject);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const borrarUsuario = async (id) => {
  try {
    const request = await axios.delete(`${url}/user/${id}`, id);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const updateUsuario = async (newObject, id) => {
  try {
    const request = await axios.put(`${url}/user/${id}`, newObject);
    return request.data;
  } catch (exception) {
    console.error(exception);
  }
};

const getLogin = async (newObject) => {
  try {
    const request = await axios.post(`${url}/user/login/`, newObject);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

const getClientebyUser = async (id) => {
  try {
    const request = await axios.get(`${url}/client/getByUser/${id}`, id);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

export default {
  getUsuarios,
  getUsuario,
  registerUsuario,
  borrarUsuario,
  updateUsuario,
  getLogin,
  registerClient,
  registerAdmin,
  getClientebyUser,
};
