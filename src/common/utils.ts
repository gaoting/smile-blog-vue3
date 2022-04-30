export default class Utils {
  // 时间截取年月日
  static timeStr(date: string) {
    return date?.substring(0, 10);
  }

  static myTimeToLocal(date: string | number) {
    let time = new Date(date).toJSON();
    return new Date(+new Date(time) + 8 * 3600 * 1000)
      .toISOString()
      .replace(/T/g, " ")
      .replace(/\.[\d]{3}Z/, "");
  }
}
