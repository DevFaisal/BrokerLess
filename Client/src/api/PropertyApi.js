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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      Authorization: "Bearer " + localStorage.getItem("token"),
    },
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
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
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: data,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const deleteAgreement = async (id) => {
  let config = {
    method: "delete",
    maxBodyLength: Infinity,
    url: `${API}/api/agreement/tenant`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
    },
    data: { id: id },
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const addProperty = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/api/property`,
    headers: {
      "Content-Type": "multipart/form-data",
      "Access-Control-Allow-Origin": "*",
      Authorization: `Bearer ${localStorage.getItem("token")}`,
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
