export default class Utils {
  // 时间截取年月日
  static timeStr(date: string) {
    return date?.substring(0, 10);
  }
}
