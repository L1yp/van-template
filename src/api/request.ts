import axios, { AxiosRequestConfig } from "axios";

export function request<T>(config: AxiosRequestConfig) {
  return new Promise<T>((resolve, reject) => {
    axios.request(config).then(response => {
      if (response.data.code === 200) {
        resolve(response.data.data);
      } else {
        reject(new Error(response.data.message));
      }
    }).catch(err => {
      const data = err?.response?.data
      if (data?.message) {
        reject(new Error(data.message))
      } else {
        reject(err)
      }
    });
  })
}