import React, { useState, useEffect } from "react";
import axiosApiInstance from "src/Services/AxiosConfig";
export default function useData(endpoint, options) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const refreshFn = () => {
    setRefresh(!refresh);
  };
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        setError(false);

        const { data } = await axiosApiInstance(endpoint, options);
        setData(data);
        setLoading(false);
      } catch (e) {
        setError(true);
        setLoading(false);
      }
    })();
  }, [endpoint, refresh]);
  return [loading, data, error, refreshFn];
}
