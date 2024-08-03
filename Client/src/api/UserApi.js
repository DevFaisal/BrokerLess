import axios from "axios";

// API URLs for User Authentication
const API = import.meta.env.VITE_LOCALHOST;
// const registerAPI = import.meta.env.VITE_LOCALHOST + "/auth/user/register";
// const loginAPI = import.meta.env.VITE_LOCALHOST + "/auth/user/login";
// const resendEmailAPI =
//   import.meta.env.VITE_LOCALHOST + "/auth/user/resend-verification-email";
// const forgotPasswordAPI =
//   import.meta.env.VITE_LOCALHOST + "/auth/user/forgot-password";
// const resetPasswordAPI =
//   import.meta.env.VITE_LOCALHOST + "/auth/user/reset-password";
// const checkVerificationTokenAPI =
//   import.meta.env.VITE_LOCALHOST +
//   "/auth/user/reset-password/:verificationToken";
// const refreshTokenAPI =
//   import.meta.env.VITE_LOCALHOST + "/auth/user/refresh-token";
// const userProfileAPI = import.meta.env.VITE_LOCALHOST + "/auth/user/me";
// const updateUserProfileAPI =
//   import.meta.env.VITE_LOCALHOST + "/auth/user/profile";
// const logoutAPI = import.meta.env.VITE_LOCALHOST + "/auth/user/logout";

export const registerUser = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/register`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    withCredentials: true,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    console.error("Error Details:", error);
    return error;
  }
};

export const loginUser = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/login`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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

export const resendVerificationEmail = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/resend-verification-email`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    withCredentials: true,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const forgotPassword = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/forgot-password`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
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

export const resetUserPassword = async (data) => {
  let config = {
    method: "post",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/reset-password`,
    headers: {
      "Content-Type": "application/json",
      "Access-Control-Allow-Origin": "*",
    },
    data: data,
    withCredentials: true,
  };
  try {
    const response = await axios.request(config);
    return response;
  } catch (error) {
    return error;
  }
};

export const checkUserVerificationToken = async (verificationToken) => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/reset-password/${verificationToken}`,
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

export const me = async () => {
  let config = {
    method: "get",
    maxBodyLength: Infinity,
    url: `${API}/auth/user/me`,
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
