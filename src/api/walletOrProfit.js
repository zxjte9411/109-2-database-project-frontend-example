import { host } from "@/config/config";
import store from "@/store";
import axios from "axios";

export const GetwalletOrProfit = function() {
  const userRole = store.state.login.user.role;
  let request = "getprofit";
  if (userRole !== "seller") request = "getwallet";
  const formData = new FormData();
  formData.append("request", request);
  return axios
    .post(`${host}/php/login.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      let result = null;
      console.log(response);
      if (userRole === "seller") result = `Profit：${response.data.profit}`;
      else result = `Blance：${response.data.wallet}`;
      return result;
    })
    .catch(err => {
      console.log(err);
    });
};
