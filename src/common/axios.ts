import { post, get, update, remove } from "./http";
import Articles from "@/views/interface/article";

// const randomStr = (arr: Array<string>) => {
//   let newArr: Array<string> = [];
//   while (arr.length > 0) {
//     let randomIndex = Math.random() * arr.length;
//     newArr.push(arr[parseInt(randomIndex + "")]);
//     arr.splice(randomIndex, 1);
//   }
//   return newArr[0];
// };
const imgList = ["bg48.jpg", "a1.jpg", "a2.jpg", "a3.jpg", "a4.jpg", "a5.jpg"];
// 全部列表(分页)
export const allList = async (data: any) => {
  let arr = await get("/api/article/list", data);
  console.log(arr);
  let array = JSON.parse(JSON.stringify(arr));
  array.data.list = [];

  if (arr && arr.data && arr.data.list) {
    arr.data.list.forEach((v: Articles) => {
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

      array.data.list.push(a);
    });
  }
  console.log(array);
  return array;
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
