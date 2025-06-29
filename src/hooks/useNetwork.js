import React, { useEffect, useRef, useState } from "react";
import { axiosInstance } from "../../axios/axiosInstance";
export default function useNetwork({
  method = "get",
  url = "/",
  body = {},
  deps = [],
}) {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const hasFetched = useRef(false);

  const config = {
    headers: {
      "Content-Type": "application/json",
    },
    withCredentials: true,
  };

  async function fetchData() {
    try {
      setIsLoading(true);

      const user = await axiosInstance[method.toLowerCase()](url, body, config);

      if (user.status === 200) {
        setData(user.data);
      }
    } catch (error) {
      console.log(error);
      setError(error);
    } finally {
      setIsLoading(false);
    }
  }

  function fetchingData() {
    if (!hasFetched.current) {
      hasFetched.current = true;
      fetchData();
    }
  }
  useEffect(fetchingData, deps);

  return [data, isLoading, error];
}
