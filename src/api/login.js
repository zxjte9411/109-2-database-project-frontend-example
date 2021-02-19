import axios from "axios";
import { host } from "@/config/config";

export const Login = function(email, password) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("request", "login");
  return axios
    .post(`${host}/php/login.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};
