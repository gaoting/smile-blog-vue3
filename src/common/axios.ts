import { post, get, update, remove } from "./http";
import Articles from "@/views/interface/article";

const imgList = ["bg48.jpg", "a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg"];
// 全部列表(分页)
export const allList = async (data: any) => {
  let arr: any = await get("/article/list", data);
  let array:any = JSON.parse(JSON.stringify(arr));
  array.list = [];

  if (arr && arr.list) {
    arr.list.forEach((v: Articles) => {
      let a = {};

      const randomItem = (items: any) =>
        items[(Math.random() * items.length) | 0];
      a = {
        ...v,
        picture: v.picture
          ? v.picture
          : new URL(`../assets/img/${randomItem(imgList)}`, import.meta.url)
              .href,
      };

      array.list.push(a);
    });
  }
  console.log(array);
  return array;
};

// 查询全部列表(不带分页)
export const searchList = (data: any) => {
  return post("/article/searchList", data);
};

// 查询id
export const findById = (data: any) => {
  console.log(data);
  return get("/article/content", data);
};

export const updateArticle = (data: any) => {
  return update("/article/update", data);
};

// 图片上传
export const uploadImg = (data: any) => {
  return post("/article/upload", data);
};

// 创建文章
export const createArticle = (data: any) => {
  return post("/article/add", data);
};

// 更新阅读量和收藏量
export const updateNum = (data: any) => {
  return update("/article/updateNum", data);
};

// 日志列表 带分页
export const diaryAll = (data: any) => {
  return get("/diary/list", data);
};

// 日志新增
export const diaryAdd = (data: any) => {
  return post("/diary/add", data);
};

// 日志点赞
export const diaryLove = (data: any) => {
  return post("/diary/updateNum", data);
};

// login
export const login = (data: any) => {
  return post("/user/login", data);
};

// 注册
export const register = (data: any) => {
  return post("/user/register", data);
};

// 新增留言
export const messageboardAdd = (data: any) => {
  return post("/messageboard/add", data);
};

// 留言分页
export const messageboardList = (data: any) => {
  return get("/messageboard/list", data);
};

// 留言点赞
export const messageboardLove = (data: any) => {
  return post("/messageboard/updateNum", data);
};