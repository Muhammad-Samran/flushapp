import axios from "../Services/AxiosConfig";
export default class ServicesApis {
  static getServicesById(id) {
    return axios.get(`/services/${id}`);
  }
  static bookService(data) {
    return axios.post("/book/service", data);
  }
}
