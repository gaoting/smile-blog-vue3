
import * as axios from 'axios'

declare module 'axios' {
  // interface AxiosInstance {
  //   (config:AxiosRequestConfig): Promise<any>
   
  // }
  export interface AxiosResponse<T = any> extends Promise<T> {}
}