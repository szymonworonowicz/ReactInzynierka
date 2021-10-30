import { useEffect,  useState } from "react";
import { IUsePagedProps } from "./IUsePAgedProps";

const usePaged = <T,>(
  { apiCall, query }: IUsePagedProps<T>,
  ...params: any[]
) : [Array<T>, boolean, number ] => {
  const [response, setResponse] = useState<Array<T>>([]);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [countOfElements, setCountOfElements] = useState<number>(0);

  
  useEffect(() => {
    setIsLoaded(true);
    apiCall(query, ...params)
    .then(data => {
      setCountOfElements(data.countOfElements);
      setResponse(data.pageElements);
    })
    .finally(() => {
      setIsLoaded(false);
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall,  query]);

  return [response, isLoaded, countOfElements];
};

export default usePaged;
