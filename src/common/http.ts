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
  baseURL: process.env.NODE_ENV == 'development'? "http://localhost:3300/api" : "http://81.69.222.61:3300/api",
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    console.log(config, "ccccccccccccccc");
    if (config.url === "/api/article/upload") {
      config.headers = { Accept: "multipart/form-data" };
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
