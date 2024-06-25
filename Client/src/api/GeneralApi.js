import axios from "axios";

const API = import.meta.env.VITE_LOCALHOST;

export const logOutfromInside = async (credentials) => {
  console.log("Logging out", credentials);
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/auth/${credentials}/logout`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};
