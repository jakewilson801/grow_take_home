// Example pulled from https://betterprogramming.pub/learn-to-create-your-own-usefetch-react-hook-9cc31b038e53
import { useState, useEffect } from "react";
const useFetch = (
  url: string,
  transform: (response: any) => any,
  dataDependency?: {},
  additionalDependency?: {},
  options?: {}
) => {
  const [response, setResponse] = useState(null);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    const abortController = new AbortController();
    const signal = abortController.signal;
    const doFetch = async () => {
      setLoading(true);
      try {
        const res = await fetch(url, options);
        const json = await res.json();
        try {
          const data = transform(json);
          setError(null);
          setData(data);
        } catch (e: any) {
          setError(e);
        }

        if (!signal.aborted) {
          setResponse(json);
        }
      } catch (e: any) {
        if (!signal.aborted) {
          setError(e);
        }
      } finally {
        if (!signal.aborted) {
          setLoading(false);
        }
      }
    };
    doFetch();
    return () => {
      abortController.abort();
    };
  }, [url, options, additionalDependency, dataDependency, transform]);

  return { response, error, data, loading };
};
export default useFetch;
