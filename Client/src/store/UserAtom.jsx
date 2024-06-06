import { atom, selector } from "recoil";
import axios from "axios";

export const UserAtom = atom({
  key: "UserAtom",
  default: selector({
    key: "UserAtomDefault",
    get: async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/auth/user/me`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
        return null;
      }
    },
  }),
});

export const UserSelector = selector({
  key: "UserSelector",
  get: ({ get }) => get(UserAtom),
});
