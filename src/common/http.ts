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
    console.log('[ config ] >', config)
    console.log(localStorage.getItem("token"));

    if (localStorage.getItem("token")) {
      config.headers["Authorization"] =
        "Bearer " + localStorage.getItem("token");
    }

    if (config.url === "/upload" || config.url === "/api/article/upload") {
      config.headers["Accept"] = "multipart/form-data";
    } else if (config.method === "post") {
      config.headers["Content-Type"] = "application/json";
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
    if (error.response) {
      switch (error.response.code) {
        case 401:
          localStorage.clear();
          invalid = setTimeout(() => {
            message.error("验证过期或失败，请重新登录");
          }, 600);
          router.replace({
            path: "/login",
          });
          break;
        case 404:
          message.error("网络请求不存在");
          break;
        case 502:
          message.error("网络出故障了，稍后再试吧~");
          break;
        default:
          message.error(error.response.message);
      }
    } else {
      // 请求超时或者网络有问题
      if (error.message.includes("timeout")) {
        message.error("请求超时！请检查网络是否正常");
      } else {
        message.error("请求失败，请检查网络是否已连接");
      }
    }
    return Promise.reject(error);
  }
);

export const get = (url: string, params?: any) => {
  return http.get(url, { params });
};

export const post = (url: string, data?: any) => {
  return data ? http.post(url, data) : http.post(url);
};

export const update = (url: string, data: any) => {
  return http.put(url, data);
};

export const remove = (url: string) => {
  return http.delete(url);
};
