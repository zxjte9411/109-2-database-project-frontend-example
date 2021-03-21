import axios from "axios";

export const GetProductsByCategory = async function(category = "all") {
  if (category === null || category === undefined) category = "all";
  const formData = new FormData();
  formData.append("request", "getproductdata");
  formData.append("category", category);
  try {
    const response = await axios.post(`/php/home.php`, formData);
    return response;
  } catch (err) {
    console.log(err);
  }
};
