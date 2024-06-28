import axios from "axios";

const API = import.meta.env.VITE_LOCALHOST;

export const getPropertyByID = async (id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/api/property/detail/?id=${id}`,
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

export const getAllPropertiesOfLandlord = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/api/property/landlord`,
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

export const getAllPropertiesOfUser = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/api/property`,
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

export const getDetailedInfoOfProperty = async (id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/api/property/info?id=${id}`,
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

export const getAgreementDates = async (id) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/api/agreement/date`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    params: { id: id },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const generateAgreement = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/api/agreement/generate`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    withCredentials: true,
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};
