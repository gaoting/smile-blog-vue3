import axios, {
  AxiosPromise,
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
} from "axios";
import { message } from "ant-design-vue";
import Articles from "./../views/interface/index";

const http: AxiosInstance = axios.create({
  baseURL: "http://localhost:3006/",
});

http.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

http.interceptors.response.use(
  (res) => {
    const { data } = res;
    // console.log(data, "resssssssssss");
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
