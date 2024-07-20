import {
  atom,
  selector,
  selectorFamily,
  useRecoilState,
  useSetRecoilState,
} from "recoil";
import axios from "axios";
import { useEffect } from "react";
import { me } from "../api/UserApi";

// Define the UserAtom to store user data
export const UserAtom = atom({
  key: "UserAtom",
  default: null,
});

// Define a selector to fetch user data
export const UserSelector = selector({
  key: "UserSelector",
  get: async () => {
    try {
      const response = await me();
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

// Component to fetch and set the user data
const FetchUser = () => {
  const setUser = useSetRecoilState(UserAtom);

  useEffect(() => {
    const fetchUser = async () => {
      const user = await UserSelector.get();
      setUser(user);
    };
    fetchUser();
  }, [UserAtom]);

  return null;
};

export default FetchUser;

export const fetchAllUserRequests = selectorFamily({
  key: "fetchAllUserRequests",
  get:
    () =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement/tenant`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
});

export const getAllTenants = selectorFamily({
  key: "getAllTenants",
  get:
    () =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/property/tenants`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
});
