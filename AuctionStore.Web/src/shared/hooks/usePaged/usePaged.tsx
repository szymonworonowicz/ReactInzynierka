import { useEffect, useCallback, useState } from "react";
import { IUsePagedProps } from "./IUsePAgedProps";

const usePaged = <T,>(
  { apiCall, query }: IUsePagedProps<T>,
  ...params: any[]
) : [Array<T>, boolean, number ] => {
  const [response, setResponse] = useState<Array<T>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [countOfElements, setCountOfElements] = useState<number>(0);

  const fetchData = useCallback(async () => {
    const data = await apiCall(query, ...params);
    setCountOfElements(data.countOfElements);
    setResponse(data.pageElements);
    setIsLoaded(false);

  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ query,apiCall]);

  useEffect(() => {
    setIsLoaded(true);
    (async () => {
      await fetchData();
    })();
  }, [fetchData]);

  return [response, isLoaded, countOfElements];
};

export default usePaged;
