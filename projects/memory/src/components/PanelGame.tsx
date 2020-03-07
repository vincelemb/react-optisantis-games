import React, { useContext, useState, useEffect } from 'react';
import { snakeCase, isEqual, sortBy, shuffle, flatten } from 'lodash';

import { Path } from '@optisantis/outil-global/config';
import TimeFormat from '../utils/TimeFormat';
import { GameContext } from '../contexts/GameContext';
import useScoreTimer from '../logics/useScoreTimer';
import memoryType from '../type/memoryType';

import memoryImages from '../assets/images.json';

import { ScoreClick, Layout } from '@optisantis/outil-global/components';
import {
    ReloadSvg,
    TimeSvg,
    ClickSvg,
} from '@optisantis/outil-global/components/svg';
import Card from '../components/Card';
import Popup from '../components/Popup';

interface PanelGameProps {
    hidden: boolean;
}

const PanelGame: React.FC<PanelGameProps> = ({ hidden }) => {
    const {
        theme,
        level,
        pairs,
        setPairs,
        cardsFlipped,
        setCardsFlipped,
        foundPairs,
        setFoundPairs,
        clicks,
        setClicks,
        setIsWon,
        isWon,
        reset,
    } = useContext(GameContext);

    const [cards, setCards] = useState<JSX.Element[]>([]);
    const themeNameParsed = snakeCase(theme);

    // @TODO : Replace this block -------------------------
    const [winClickSentence, setWinClickSentence] = useState<boolean>(true);
    const [winTimeSentence, setWinTimeSentence] = useState<boolean>(true);
    const [timeActive, setTimeActive] = useState<boolean>(false);
    const [saveScore, setSaveScore] = useState<memoryType[] | any>([]);
    const [indexLevel, setIndexLevel] = useState<number>(
        saveScore.findIndex((index) => index.level === level)
    );

    const { seconds } = useScoreTimer(timeActive);
    // ----------------------------------------------------

    useEffect(() => {
        const Cards: JSX.Element[][] = [];
        let urlArray: string[] = Object.values(memoryImages[themeNameParsed]);
        const numberOfPairs = Number(level) / 2;

        for (let i = 0; i < numberOfPairs; i++) {
            const idxPair = i + numberOfPairs;

            Cards.push([
                <Card
                    key={i}
                    flipped={!!cardsFlipped.filter((id) => id === i).length}
                    found={
                        !!foundPairs.filter(
                            (pairIds) => pairIds.filter((id) => id === i).length
                        ).length
                    }
                    onClick={() => {
                        setCardsFlipped([...cardsFlipped, i]);
                    }}>
                    <img
                        className="_h-full"
                        src={Path.imgPath + themeNameParsed + '/' + urlArray[i]}
                        key={'image-' + i}
                    />
                </Card>,
                <Card
                    key={idxPair}
                    flipped={
                        !!cardsFlipped.filter((id) => id === idxPair).length
                    }
                    found={
                        !!foundPairs.filter(
                            (pairIds) =>
                                pairIds.filter((id) => id === idxPair).length
                        ).length
                    }
                    onClick={() => {
                        setCardsFlipped([...cardsFlipped, idxPair]);
                        setTimeActive(true);
                    }}>
                    <img
                        className="_h-full"
                        src={Path.imgPath + themeNameParsed + '/' + urlArray[i]}
                        key={'image-' + i}
                    />
                </Card>,
            ]);
        }

        if (!pairs.length) {
            setPairs(
                Cards.map((pairs) => pairs.map((pair) => Number(pair.key)))
            );
        }

        // Refaire rendu avec le même shuffle, changer uniquement les cartes qui on leur props modifier
        if (!cards.length) {
            setCards(shuffle(flatten(Cards)));
        } else {
            console.log('coucou')
            setCards(cards);
        }
    }, [cardsFlipped, theme, level, foundPairs]);

    // useEffect(() => {
    //     console.log(isWon);
    //     console.log(pairs);
    //     console.log(cards);
    //     console.log(foundPairs);

    //     if (
    //         !isWon &&
    //         pairs.length &&
    //         cards.length &&
    //         !foundPairs.length &&
    //         !cardsFlipped.length
    //     ) {
    //         setCards(shuffle(flatten(cards)));
    //     }
    // }, [pairs]);

    useEffect(() => {
        if (cardsFlipped.length && cardsFlipped.length === 2) {
            const sortedCardsFlipped = sortBy(cardsFlipped, (cardId) => cardId);
            const hasFlippedPairs = pairs.filter((pairIds) =>
                isEqual(pairIds, sortedCardsFlipped)
            );

            // Found pairs
            if (hasFlippedPairs.length) {
                setFoundPairs([...foundPairs, cardsFlipped]);
                setPairs(
                    pairs.filter(
                        (pairIds) => !isEqual(pairIds, sortedCardsFlipped)
                    )
                );
            }

            setClicks(clicks + 1);
            // @TODO: Refacto this 💩 code
            // Wait for all change to setCardsFlipped to none
            setTimeout(() => setCardsFlipped([]), 500);
        }
    }, [cardsFlipped]);

    useEffect(() => {
        if (!pairs.length && foundPairs.length) {
            setIsWon(true);

            setTimeActive(false);
        }
    }, [foundPairs]);

    return (
        <section
            hidden={hidden}
            className={`${
                hidden ? '_flex' : 'lg:_hidden '
            } _flex-col _w-full _items-center _relative _my-xl`}>
            <div className="_mx-xxs _flex _justify-between _w-full _items-center _text-white _pb-xs">
                <div className="_flex _items-center ">
                    <span>Temps : </span>
                    <span className="_text-xl"> {TimeFormat(seconds)}</span>
                </div>
                <div className="_flex _items-center">
                    <span className="_mr-xxs">Clics :</span>
                    <span className="_text-xl">{clicks}</span>
                </div>
            </div>

            <div className="_flex _items-center _justify-center">
                <Popup title="Partie terminée" hidden={!isWon}>
                    {winClickSentence === true && (
                        <span className="_text-golden">
                            Nouveaux record de clics
                        </span>
                    )}
                    {winTimeSentence === true && (
                        <span className="_text-golden">
                            Nouveaux record de temps
                        </span>
                    )}
                    <div className="_bg-darkenprimary _rounded-small _w-3/4 _mt-xs">
                        <div className="_flex _flex-wrap _justify-around">
                            <div className="_m-xs">
                                <div className="_flex _items-center ">
                                    <TimeSvg svgWidth="25px"></TimeSvg>
                                    <span className="_ml-xs _text-white">
                                        Temps
                                    </span>
                                </div>
                                <span className="_text-xl _text-white">
                                    {' '}
                                    {TimeFormat(seconds)}
                                </span>
                                <div className="_flex _justify-start">
                                    <ScoreClick
                                        isIcon
                                        iconPosition="left"
                                        count={
                                            saveScore[indexLevel]
                                                ? TimeFormat(
                                                      saveScore[indexLevel]
                                                          .seconds
                                                  )
                                                : '00:00'
                                        }></ScoreClick>
                                </div>
                            </div>

                            <div className="_m-xs">
                                <div className="_flex _items-center">
                                    <ClickSvg svgWidth="25px"></ClickSvg>
                                    <span className="_ml-xs _text-white">
                                        Clics
                                    </span>
                                </div>
                                <span className="_text-xl _text-white">
                                    {clicks}
                                </span>
                                <div className="_flex _justify-start">
                                    <ScoreClick
                                        isIcon
                                        iconPosition="left"
                                        count={
                                            saveScore[indexLevel]
                                                ? saveScore[indexLevel].click
                                                : '00'
                                        }></ScoreClick>
                                </div>
                            </div>
                        </div>
                    </div>
                    <section className="_mt-xs _w-full _flex _justify-end _relative _b-none">
                        <button
                            className="_text-primary _bg-white _m-xs _rounded-md _py-xs _px-sm _border-none _cursor-pointer"
                            onClick={() => reset()}>
                            <span>Rejouer</span>
                        </button>
                    </section>
                </Popup>

                <Layout col={4} spacing="_p-xxs" desktopLayout>
                    {cards}
                </Layout>
            </div>

            <div className="_mt-sm _mb-lg _w-full _text-right">
                <button
                    className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none"
                    onClick={reset}>
                    <ReloadSvg></ReloadSvg>
                </button>
            </div>
        </section>
    );
};

export default PanelGame;
