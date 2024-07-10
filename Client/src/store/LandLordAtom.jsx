import { atom, selector, selectorFamily } from "recoil";
import axios from "axios";
import { useEffect } from "react";

export const LandLordAtom = atom({
  key: "LandLordAtom",
  default: null,
});

export const LandLordSelector = selector({
  key: "LandLordSelector",
  get: async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/auth/landlord/me`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  },
});

const FetchLandLord = async () => {
  const setLandLord = useSetRecoilState(LandLordAtom);

  useEffect(() => {
    const fetchLandLord = async () => {
      const landlord = await LandLordSelector.get();
      setLandLord(landlord);
    };
    fetchLandLord();
  }, []);
  return null;
};

export default FetchLandLord;

export const fetchApplications = selectorFamily({
  key: "fetchApplications",
  get:
    () =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      return response.data;
    },
});
