import axios from "axios";

export const UserSignUpPage = async (data) => {
  const response = await axios.post(
    `${import.meta.env.VITE_LOCALHOST}/auth/user/register`,
    data
  );
  return response;
};
