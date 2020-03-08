import React, { createContext, useState, useContext } from 'react';
import { TimerContext } from '@optisantis/outil-global/context/TimerContext';
import useScoreTimer from '../logics/useScoreTimer';

export const LEVELS = ['12', '16', '20', '24', '28'];
export const THEMES = [
    'Fruits et Légumes',
    'Médical',
    'Météo',
    'Sommeil',
    'Sport',
];

type CardsProps = {
    id: number;
    image: string;
    flipped: boolean;
    found: boolean;
};

export type GameContext = {
    isPlaying: boolean;
    setIsPlaying: React.Dispatch<React.SetStateAction<boolean>> | any;
    level: string;
    setLevel: React.Dispatch<React.SetStateAction<string>> | any;
    theme: string;
    setTheme: React.Dispatch<React.SetStateAction<string>> | any;
    cardsProps: CardsProps[];
    setCardsProps: React.Dispatch<React.SetStateAction<CardsProps[][]>> | any;
    updateCard: (arrOfIds: number[], prop: string) => void;
    cardsFlipped: number[];
    setCardsFlipped: React.Dispatch<React.SetStateAction<[]>> | any;
    pairs: number[][];
    setPairs: React.Dispatch<React.SetStateAction<[]>> | any;
    clicks: number;
    setClicks: React.Dispatch<React.SetStateAction<number>> | any;
    isWon: boolean;
    setIsWon: React.Dispatch<React.SetStateAction<number>> | any;
    reset: () => void;
    seconds: number;
    setSeconds: React.Dispatch<React.SetStateAction<number>> | any;
};

export const GameContext = createContext<GameContext>({
    isPlaying: false,
    setIsPlaying: undefined,
    level: LEVELS[0],
    setLevel: undefined,
    theme: THEMES[0],
    setTheme: undefined,
    cardsProps: [],
    setCardsProps: undefined,
    updateCard: undefined,
    cardsFlipped: [],
    setCardsFlipped: undefined,
    pairs: [],
    setPairs: undefined,
    clicks: 0,
    setClicks: undefined,
    isWon: false,
    setIsWon: undefined,
    reset: undefined,
    seconds: 0,
    setSeconds: undefined,
});

export const GameProvider = ({ children }) => {
    const [isPlaying, setIsPlaying] = useState<boolean>(false);
    const [level, setLevel] = useState<string>(LEVELS[0]);
    const [theme, setTheme] = useState<string>(THEMES[0]);
    const [cardsProps, setCardsProps] = useState<CardsProps[]>([]);
    const [cardsFlipped, setCardsFlipped] = useState<number[]>([]);
    const [pairs, setPairs] = useState<number[][]>([]);
    const [clicks, setClicks] = useState<number>(0);
    const [isWon, setIsWon] = useState<boolean>(false);

    const { setSeconds } = useContext(TimerContext);
    const { seconds } = useScoreTimer(isPlaying);

    const reset = () => {
        setIsPlaying(false);
        setClicks(0);
        setIsWon(false);
        setCardsFlipped([]);
        setTheme(theme);
        setSeconds(0);
    };

    const updateCard = (arrOfIds: number[], prop: string): void => {
        const updatedCards = cardsProps.map((card) => {
            if (!arrOfIds.length) {
                card[prop] = false;
            } else {
                arrOfIds.forEach((id) => {
                    if (id === card.id) card[prop] = true;
                });
            }

            return card;
        });

        setCardsProps(updatedCards);
    };

    return (
        <GameContext.Provider
            value={{
                isPlaying,
                setIsPlaying,
                level,
                setLevel: () => (level: string) => setLevel(level),
                theme,
                setTheme: () => (theme: string) => setTheme(theme),
                cardsProps,
                setCardsProps,
                updateCard,
                cardsFlipped,
                setCardsFlipped,
                pairs,
                setPairs,
                clicks,
                setClicks,
                isWon,
                setIsWon,
                reset,
                seconds,
                setSeconds,
            }}>
            {children}
        </GameContext.Provider>
    );
};
