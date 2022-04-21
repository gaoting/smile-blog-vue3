import { post, get, update, remove } from "./http";

// 全部列表(分页)
export const allList = (data: any) => {
  return get("/api/article/list", data);
};

// 查询全部列表(不带分页)
export const searchList = (data: any) => {
  return get("/api/article/searchList", data);
};

export const findById = (id: number) => {
  return get("/api/article/list", id);
};
