import React from "react";
import { IUsePagedProps } from "./IUsePAgedProps";
import  {LottieContext} from '../../../Context/LottieContext';

const usePaged = <T,>(
  { apiCall, query }: IUsePagedProps<T>,
  ...params: any[]
) : [Array<T>, boolean, number] => {
  const [response, setResponse] = React.useState<Array<T>>([]);
  const [countOfElements, setCountOfElements] = React.useState<number>(0);
  const {isOpen, setLottieOpen} = React.useContext(LottieContext)
  
  React.useEffect(() => {
    setLottieOpen(true);
    apiCall(query, ...params)
    .then(data => {
      setCountOfElements(data.countOfElements);
      setResponse(data.pageElements);
    })
    .finally(() => {
      setLottieOpen(false);
    })
    
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [apiCall,  query]);

  return [response, !isOpen, countOfElements];
};

export default usePaged;
