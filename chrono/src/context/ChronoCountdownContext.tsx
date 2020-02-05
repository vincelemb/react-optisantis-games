import React, { createContext, useState } from 'react';
// @ts-ignore

export type ChronoCountdownContextType = {
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>> | any;
    
}

export const ChronoCountdownContext = createContext<ChronoCountdownContextType>({seconds: undefined, setSeconds: undefined});

export const ChronoCountdownProvider = ({ children }) => {
    const [seconds, setSeconds] = useState<number>();

    return <ChronoCountdownContext.Provider value={{seconds, setSeconds}}>{children}</ChronoCountdownContext.Provider>;
};
