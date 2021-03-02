import store from "@/store";
import axios from "axios";

export const GetCoupon = async () => {
  const userId = store.getters["login/Id"];
  const formData = new FormData();
  formData.append("request", "getcoupon");
  formData.append("userno", userId);
  try {
    const response = await axios.post("/php/shoppingCart.php", formData);
    return response;
  } catch (err) {
    return console.log(err);
  }
};
