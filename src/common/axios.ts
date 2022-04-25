import { post, get, update, remove } from "./http";

// 全部列表(分页)
export const allList = (data: any) => {
  return get("/api/article/list", data);
};

// 查询全部列表(不带分页)
export const searchList = (data: any) => {
  return get("/api/article/searchList", data);
};

// 查询id
export const findById = (data: any) => {
  console.log(data);
  return get("/api/article/content", data);
};

// 图片上传
export const uploadImg = (data: any) => {
  return post("/api/article/upload", data);
};

// 创建文章
export const createArticle = (data: any) => {
  return post("/api/article/add", data);
};

// 更新阅读量和收藏量
export const updateNum = (data: any) => {
  return update("/api/article/updateNum", data);
};
