import axios from "axios";
import { TIME_OUT } from "const";
import { HOST } from "const";

const httpClient = axios.create({
  baseURL: HOST,
  timeout: TIME_OUT,
  headers: {
    "X-Requested-With": "XMLHttpRequest",
    Accept: "*/*",
  },
});
export default httpClient;
