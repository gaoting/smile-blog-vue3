import axios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { message } from "ant-design-vue";
import Articles from "../views/interface/article";

const http: AxiosInstance = axios.create({
  timeout: 60000,
  baseURL:
    process.env.NODE_ENV == "development"
      ? "http://localhost:3300/api"
      : "http://gaoting666.cn:3300/api",
});

http.interceptors.request.use(
  (config: any) => {
    console.log(localStorage.getItem("token"));

    if (localStorage.getItem("token")) {
      config.headers['Authorization'] =
        "Bearer " + localStorage.getItem("token");
    }

    if (config.url === "/api/article/upload") {
      config.headers['Accept'] = "multipart/form-data";
    } else if (config.method === "post") {
      config.headers['Content-Type'] = "application/json";
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    const { data } = res;
    if (data.code !== 200) {
      message.error(data.message);
    }
    return data;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const get = (url: string, params: any) => {
  return http.get(url, { params });
};

export const post = (url: string, data: any) => {
  return http.post(url, data);
};

export const update = (url: string, data: any) => {
  return http.put(url, data);
};

export const remove = (url: string) => {
  return http.delete(url);
};
