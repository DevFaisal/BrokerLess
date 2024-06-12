import axios from "axios";
import { selectorFamily, atomFamily } from "recoil";

export const PropertyAtomFamily = atomFamily({
  key: "PropertyAtomFamily",
  default: selectorFamily({
    key: "PropertySelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const response = await axios.get(
          `${import.meta.env.VITE_LOCALHOST}/api/property/prop/?id=${id}`,
          {
            withCredentials: true,
          }
        );
        return response.data;
      },
  }),
});

export const GetAllProperties = selectorFamily({
  key: "GetAllProperties",
  get:
    () =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/property/landlord`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
});

export const GetAllPropertiesForUser = selectorFamily({
  key: "GetAllPropertiesForUser",
  get:
    () =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/property`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
});

export const GetPropertyInfo = selectorFamily({
  key: "GetPropertyInfo",
  get:
    (id) =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/property/info?id=${id}`,
        {
          withCredentials: true,
        }
      );
      return response.data;
    },
});

export const GetAgreementDate = selectorFamily({
  key: "GetAgreementDate",
  get:
    (id) =>
    async ({ get }) => {
      const response = await axios.get(
        `${import.meta.env.VITE_LOCALHOST}/api/agreement/date`,
        { withCredentials: true, params: { id: id } }
      );
      return response.data;
    },
});
