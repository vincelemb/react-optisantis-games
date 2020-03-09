import React, { useState, useContext, useEffect } from 'react';
import { GameContext, FLIPPED_RESET } from '../contexts/GameContext';
import { TimerContext } from '@optisantis/outil-global/context/TimerContext';
import useRecords from './useRecords';
import { Cards } from '../types/cards';
import generateCards from '../utils/generateCards';
import Card from '../components/Card';

const useGame = () => {
    const {
        theme,
        level,
        flipped,
        setFlipped,
        clicks,
        setClicks,
        found,
        setFound,
        isPlaying,
        setIsPlaying,
    } = useContext(GameContext);
    const { records } = useRecords();
    const { setSeconds } = useContext(TimerContext);
    const [deck, setDeck] = useState<Cards[]>(generateCards(theme, level));
    const [isDone, setIsDone] = useState<boolean>(false);

    const clickCard = (id: number, img: string): void => {
        const { ids, imgs } = flipped;

        if (clicks === 0) setIsPlaying(true);

        if (ids.length <= 2) {
            setFlipped({ ids: [...ids, id], imgs: [...imgs, img] });
        }
    };

    const checkPairs = (): void => {
        const { imgs } = flipped;

        if (imgs[0] === imgs[1]) {
            setFound([...found, imgs[0]]);
            setFlipped(FLIPPED_RESET);
        } else {
            setTimeout(() => {
                setFlipped(FLIPPED_RESET);
            }, 1000);
        }

        setClicks(clicks + 1);
    };

    const reset = (): void => {
        setFlipped(FLIPPED_RESET);
        setFound([]);
        setClicks(0);
        setIsDone(false);
        setIsPlaying(false);
        setSeconds(0);
        setTimeout(() => setDeck(generateCards(theme, level)), 600);
    };

    useEffect((): void => {
        setIsPlaying(false);
    }, [isDone]);

    useEffect((): void => {
        if (flipped.ids.length === 2) {
            checkPairs();
        }

        if (found.length === deck.length / 2) {
            setIsDone(true);
        }
    }, [flipped]);

    useEffect(reset, [theme, level]);

    const cards: JSX.Element[] = deck.map(
        ({ id, img }): JSX.Element => (
            <Card
                key={id}
                clicked={flipped.ids.includes(id)}
                found={found.includes(img)}
                onClick={clickCard.bind(null, id, img)}
                img={img}
            />
        )
    );

    return {
        cards,
        clicks,
        reset,
        isDone,
        records,
        isPlaying,
    };
};

export default useGame;
