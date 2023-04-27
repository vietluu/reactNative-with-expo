import axios from "axios";
import { API_URL } from "@env";

const apiPrefix = "api/v1";

const api = axios.create({
  baseURL: `${API_URL}`,
  validateStatus: (status) => {
    return status >= 200 && status <= 500;
  },
});

export { api };
