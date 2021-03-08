import axios from "axios";

export const Getmyproduct = async () => {
  const formData = new FormData();
  formData.append("request", "getmyproduct");
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const OffGame = async gameId => {
  const formData = new FormData();
  formData.append("request", "offgame");
  formData.append("GameNo", gameId);
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};

export const LaunchGame = async gameId => {
  const formData = new FormData();
  formData.append("request", "launchgame");
  formData.append("GameNo", gameId);
  try {
    const response = await axios.post("/php/myproduct.php", formData);
    return response.data;
  } catch (err) {
    console.log(err);
  }
};
