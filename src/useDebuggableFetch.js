import React, { useState, useEffect } from "react";
import fetch from "./fetch";

const useDebuggableFetch = options => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        const res = await fetch(options);
        console.log(res);
        setResponse(res);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
        setError(error);
      }
    };
    fetchData();
  }, []);
  return { response, error, isLoading };
};

export default useDebuggableFetch;
