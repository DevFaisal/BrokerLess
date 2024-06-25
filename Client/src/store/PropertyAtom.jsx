import { selectorFamily, atomFamily } from "recoil";
import {
  getAgreementDates,
  getAllPropertiesOfLandlord,
  getAllPropertiesOfUser,
  getDetailedInfoOfProperty,
  getPropertyByID,
} from "../api/PropertyApi";

export const PropertyAtomFamily = atomFamily({
  key: "PropertyAtomFamily",
  default: selectorFamily({
    key: "PropertySelectorFamily",
    get:
      (id) =>
      async ({ get }) => {
        const response = await getPropertyByID(id);
        return response.data;
      },
  }),
});

export const GetAllProperties = selectorFamily({
  key: "GetAllProperties",
  get:
    () =>
    async ({ get }) => {
      const response = await getAllPropertiesOfLandlord();
      return response.data;
    },
});

export const GetAllPropertiesForUser = selectorFamily({
  key: "GetAllPropertiesForUser",
  get:
    () =>
    async ({ get }) => {
      const response = await getAllPropertiesOfUser();
      return response.data;
    },
});

export const GetPropertyInfo = selectorFamily({
  key: "GetPropertyInfo",
  get:
    (id) =>
    async ({ get }) => {
      const response = await getDetailedInfoOfProperty(id);
      return response.data;
    },
});

export const GetAgreementDate = selectorFamily({
  key: "GetAgreementDate",
  get:
    (id) =>
    async ({ get }) => {
      const response = await getAgreementDates(id);
      return response;
    },
});
