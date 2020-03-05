import React, { createContext, useState } from 'react';

export const LEVELS = ['12', '16', '20', '24', '28'];

export type LevelContext = {
    level: string;
    setLevel: React.Dispatch<React.SetStateAction<string>> | any;
};

export const LevelContext = createContext<LevelContext>({ level: LEVELS[0], setLevel: undefined });

export const LevelProvider = ({ children }) => {
    const [level, setLevel] = useState<string>(LEVELS[0]);

    return (
        <LevelContext.Provider value={{ level, setLevel: () => (level: string) => setLevel(level) }}>
            {children}
        </LevelContext.Provider>
    );
};
