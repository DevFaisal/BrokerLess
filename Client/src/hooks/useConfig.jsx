import { useMemo } from "react";

const useConfig = (loginAPI, requestData, method) => {
  const config = useMemo(
    () => ({
      method: method,
      maxBodyLength: Infinity,
      url: loginAPI,
      headers: {
        "Content-Type": "application/json",
      },
      data: requestData,
    }),
    [loginAPI, requestData]
  );

  return config;
};

export default useConfig;
