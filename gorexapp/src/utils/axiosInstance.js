import axios from "axios";
import { getFirstValidationError } from "./getFirstValidationError";
import { defaultConfig } from "../utils/defaultConfig";

import { getToken, setToken } from "./common";

const axiosInstance = axios.create({
  ...defaultConfig(),

  // baseURL: `https://gorex.softoo-dev.com/api`,
  // baseURL: `https://gorex-qa.softoo-dev.com/api/`,
  // baseURL: `https://api.gorex.ai/api/`,
  //  baseURL: `https://gorex-pre-prod.softoo-dev.com/api/`,
  // baseURL: "http://192.168.50.173:3000/api/",
  baseURL: `https://api2.gorex.ai/api/`,
});
axiosInstance.defaults.timeout = 30000;

axiosInstance.interceptors.response.use(
  function (response) {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (
      error.response.status === 401 &&
      !originalRequest._retry &&
      error?.config?.url != "/auth/login"
    ) {
      originalRequest._retry = true;
      const result = await axiosInstance.post(`/auth/refresh`);
      setToken(result?.data?.data);
      axiosInstance.defaults.headers.common["Authorization"] =
        "Bearer " + result?.accessToken;
      return axiosInstance(originalRequest);
    }
    return Promise.reject(getFirstValidationError(error));
  }
);

axiosInstance.interceptors.request.use(
  async (config) => {
    const tokens = await getToken();

    config.headers = {
      Authorization: `Bearer ${
        config?.url === "/auth/refresh"
          ? tokens?.refreshToken
          : tokens?.accessToken
      }`,
    };
    return config;
  },
  async (error) => {
    return Promise.reject(getFirstValidationError(error));
  }
);
// export const setAxiosAuthToken = token => {
//   axiosInstance.defaults.headers['auth-token'] = `${token}`;
// };
export default axiosInstance;
