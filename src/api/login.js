import axios from "axios";
import { host } from "@/config/config";

export const Login = async function(email, password) {
  const formData = new FormData();
  formData.append("email", email);
  formData.append("password", password);
  formData.append("request", "login");
  try {
    const response = await axios.post(`${host}/php/login.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};

export const GetUserId = async () => {
  const formData = new FormData();
  formData.append("request", "getuserno");
  try {
    const response = await axios.post(`${host}/php/login.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    });
    return response;
  } catch (err) {
    console.log(err);
  }
};
