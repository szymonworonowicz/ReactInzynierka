import React from 'react';

type LottieContextType  = {
    isOpen: boolean;
    setLottieOpen: React.Dispatch<React.SetStateAction<boolean>>
}

export const LottieContext = React.createContext<LottieContextType>({} as LottieContextType);