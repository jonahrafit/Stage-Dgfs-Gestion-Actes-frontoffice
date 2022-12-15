import axios from "axios";
import { url } from "./apiService";

export default class AuthService {

  login(username, password) {
    alert(url+"login");
    return axios
      .post(url + "login", {
        username,
        password
      })
      .then(response => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('user'));;
  }

}
