import { useEffect, useState } from "react";
import { IQuestion } from "../types";
import { API_HOST } from "./config";

// const APIHOST = "http://10.0.2.2:4000/api/v1";

export function useLoadExam() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<Error | undefined>();
  const [data, setData] = useState<IQuestion[] | undefined>();
  const [refresh, setRefresh] = useState(true);

  const execFetch = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_HOST}/api/v1/questions/random`);

      if (!res.ok) {
        const error = await res.json();
        setLoading(false);
        setError(error);
        return;
      }

      const resData = await res.json();
      const questions = resData.questions as IQuestion[];
      setLoading(false);
      setError(undefined);

      setData(questions);
    } catch (error) {
      setLoading(false);
      setError(new Error("Oops! Failed to load exam, try again later."));
    }
  };

  useEffect(() => {
    if (!refresh) {
      return;
    }

    execFetch();
    setRefresh(false);
  }, [refresh]);

  return { loading, data, error, refresh };
}
