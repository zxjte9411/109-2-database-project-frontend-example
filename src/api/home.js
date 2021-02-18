import axios from "axios";
import { host } from "@/config/config";
// import store from '@/store';

export const GetGamesByCategory = function(category = "all") {
  if (category === null || category === undefined) category = "all";
  const formData = new FormData();
  formData.append("request", "getgamedata");
  formData.append("category", category);
  return axios
    .post(`${host}/php/home.php`, formData, {
      headers: { "Content-Type": "multipart/form-data" }
    })
    .then(response => {
      return response;
    })
    .catch(err => {
      console.log(err);
    });
};
