import { useState, useEffect } from "react";

export const useAsyncHook = (f: Function) => {
  const [result, setResult] = useState([]);
  const [loading, setLoading] = useState("false");

  useEffect(() => {
    async function fetchHook() {
      try {
        setLoading("true");
        let responce = await f();
        setResult(responce);
      } catch (error) {
        setLoading("null");
      }
    }
    if (loading === "true") return;
    fetchHook();
  }, []);

  return [result, loading];
};