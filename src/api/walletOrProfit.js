import store from "@/store";
import axios from "axios";

export const GetwalletOrProfit = async () => {
  const userRole = store.state.login.user.role;
  let request = "getprofit";
  if (userRole !== "seller") request = "getwallet";
  const formData = new FormData();
  formData.append("request", request);
  try {
    const response = await axios.post("/php/login.php", formData);
    let result = null;
    if (userRole === "seller") result = `Profit：${response.data.profit}`;
    else result = `Blance：${response.data.wallet}`;
    return result;
  } catch (err) {
    console.log(err);
  }
};

export const Deposit = async amount => {
  const formData = new FormData();
  formData.append("request", "deposit");
  formData.append("value", amount);
  const res = await axios.post("/php/login.php", formData);
  return res;
};
