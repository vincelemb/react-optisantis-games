import React, { createContext, useState } from 'react';

export const LEVELS = ['12', '16', '20', '24', '28'];
export const THEMES = [
    'Fruits et Légumes',
    'Médical',
    'Météo',
    'Sommeil',
    'Sport',
];

export type GameContext = {
    level: string;
    setLevel: React.Dispatch<React.SetStateAction<string>> | any;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>> | any;
    cardsFlipped: number[];
    setCardsFlipped: React.Dispatch<React.SetStateAction<[]>> | any;
    pairs: number[][];
    setPairs: React.Dispatch<React.SetStateAction<[]>> | any;
    foundPairs: number[][];
    setFoundPairs: React.Dispatch<React.SetStateAction<[]>> | any;
    clicks: number;
    setClicks: React.Dispatch<React.SetStateAction<number>> | any;
    isWon: boolean;
    setIsWon: React.Dispatch<React.SetStateAction<number>> | any;
    reset: () => void;
};

export const GameContext = createContext<GameContext>({
    level: LEVELS[0],
    setLevel: undefined,
    theme: THEMES[0],
    setTheme: undefined,
    cardsFlipped: [],
    setCardsFlipped: undefined,
    pairs: [],
    setPairs: undefined,
    foundPairs: [],
    setFoundPairs: undefined,
    clicks: 0,
    setClicks: undefined,
    isWon: false,
    setIsWon: undefined,
    reset: undefined,
});

export const GameProvider = ({ children }) => {
    const [level, setLevel] = useState<string>(LEVELS[0]);
    const [theme, setTheme] = useState<string>(THEMES[0]);
    const [cardsFlipped, setCardsFlipped] = useState<[]>([]);
    const [pairs, setPairs] = useState<[]>([]);
    const [foundPairs, setFoundPairs] = useState<[]>([]);
    const [clicks, setClicks] = useState<number>(0);
    const [isWon, setIsWon] = useState<boolean>(false);

    const reset = () => {
        setClicks(0);
        setIsWon(false);
        setFoundPairs([]);
        setPairs([]);
        setCardsFlipped([]);
    }

    return (
        <GameContext.Provider
            value={{
                level,
                setLevel: () => (level: string) => setLevel(level),
                theme,
                setTheme: () => (theme: string) => setTheme(theme),
                cardsFlipped,
                setCardsFlipped,
                pairs,
                setPairs,
                foundPairs,
                setFoundPairs,
                clicks,
                setClicks,
                isWon,
                setIsWon,
                reset,
            }}>
            {children}
        </GameContext.Provider>
    );
};
