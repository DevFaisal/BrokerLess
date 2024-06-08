import { atom, selector } from "recoil";
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
          withCredentials: true,
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
