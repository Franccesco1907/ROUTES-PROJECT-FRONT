import axios from "axios";
import url from "../config";

const getRegiones = async () => {
  try {
    const request = await axios.get(`${url}/region/getAll`);
    return request.data;
  } catch (except) {
    console.error(except);
  }
};

export default {
    getRegiones   ,
};
  