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
    withCredentials: true,
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

// API URLs for Landlord Authentication
const landlordRegisterAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/register";
const landlordLoginAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/login";
const landlordResendEmailAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/resend-verification-email";
const landlordForgotPasswordAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/forgot-password";
const landlordResetPasswordAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/reset-password";
const landlordRefreshTokenAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/refresh-token";
const landlordUserProfileAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/me";
const landlordUpdateUserProfileAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/profile";
const landlordLogoutAPI =
  import.meta.env.VITE_LOCALHOST + "/auth/landlord/logout";

// API URLs for Property
const propertyAPI = import.meta.env.VITE_LOCALHOST + "/api/property";
const propertyDetailsByID =
  import.meta.env.VITE_LOCALHOST + "/api/property/details";
const propertySearch = import.meta.env.VITE_LOCALHOST + "/api/property/search";

const landlordPropertyAPI =
  import.meta.env.VITE_LOCALHOST + "/api/property/landlord";
const createPropertyAPI = import.meta.env.VITE_LOCALHOST + "/api/property";
const updatePropertyAPI =
  import.meta.env.VITE_LOCALHOST + "/api/property/update";
const deletePropertyAPI = import.meta.env.VITE_LOCALHOST + "/api/property";
const getTenantsOfSpecificPropertyAPI =
  import.meta.env.VITE_LOCALHOST + "/api/property/tenants/propertyId";
const getLandlordPropertiesAPI =
  import.meta.env.VITE_LOCALHOST + "/api/property/landlord";
const getAllTenantsAPI =
  import.meta.env.VITE_LOCALHOST + "/api/property/tenants";
const getPropertyByIdToTenantAPI =
  import.meta.env.VITE_LOCALHOST + "/api/property/info";
