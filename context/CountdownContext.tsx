import React, { createContext, useState } from 'react';
// @ts-ignore

export type CountdownContextType = {
    countdownSeconds: number;
    setCountdownSeconds: React.Dispatch<React.SetStateAction<number>> | any;
    
}

export const CountdownContext = createContext<CountdownContextType>({countdownSeconds: 0, setCountdownSeconds: undefined});

export const CountdownProvider = ({ children }) => {
    const [countdownSeconds, setCountdownSeconds] = useState<number>(0);

    return <CountdownContext.Provider value={{countdownSeconds, setCountdownSeconds}}>{children}</CountdownContext.Provider>;
};
