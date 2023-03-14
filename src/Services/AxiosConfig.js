import axios from "axios";
const axiosApiInstance = axios.create({
  baseURL: process.env.REACT_APP_RESOURSE_SERVER,
});

axiosApiInstance.interceptors.request.use(
  async (config) => {
    const value = await localStorage.getItem("rT");
    if (value) {
      config.headers = {
        Authorization: `Bearer ${value}`,
      };
    }

    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

export default axiosApiInstance;
// export  {crud: {
//     add(method, payload) {
//       return axiosApiInstance.post(method, payload);
//     },
//     view(method, cancel) {
//       return axiosApiInstance.get(method, {
//         cancelToken: new axios.CancelToken((c) => (cancel = c)),
//       });
//     },
//   }};
export function add(method, payload) {
  return axiosApiInstance.post(method, payload);
}
export function view(method, cancel) {
  return axiosApiInstance.get(method, {
    cancelToken: new axios.CancelToken((c) => (cancel = c)),
  });
}
export function remove(method) {
  return axiosApiInstance.delete(method);
}
