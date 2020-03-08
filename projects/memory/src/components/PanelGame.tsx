import React, { useContext, useState, useEffect } from 'react';
import { snakeCase, isEqual, sortBy, shuffle, flatten } from 'lodash';

import { Path } from '@optisantis/outil-global/config';
import TimeFormat from '../utils/TimeFormat';
import { GameContext } from '../contexts/GameContext';
import memoryImages from '../assets/images.json';

import { Layout } from '@optisantis/outil-global/components';
import { ReloadSvg } from '@optisantis/outil-global/components/svg';
import Card from './Card';
import ModalWon from './ModalWon';

interface PanelGameProps {
    hidden: boolean;
}

const PanelGame: React.FC<PanelGameProps> = ({ hidden }) => {
    const {
        seconds,
        isPlaying,
        setIsPlaying,
        theme,
        level,
        pairs,
        setPairs,
        cardsFlipped,
        setCardsFlipped,
        clicks,
        setClicks,
        setIsWon,
        reset,
        cardsProps,
        setCardsProps,
        updateCard,
    } = useContext(GameContext);

    const [cards, setCards] = useState<JSX.Element[]>([]);
    const themeNameParsed = snakeCase(theme);

    useEffect(() => {
        const imagesName: string[] = Object.values(
            memoryImages[themeNameParsed]
        );

        const images = imagesName
            .filter((image, idx) => {
                return idx < Number(level) / 2;
            })
            .map(
                (imageName) => `${Path.imgPath}${themeNameParsed}/${imageName}`
            )
            .map((image, id) => {
                return [
                    { id, image, found: false, flipped: false },
                    {
                        id: id + Number(level) / 2,
                        image,
                        found: false,
                        flipped: false,
                    },
                ];
            });

        setPairs(images.map((images) => images.map(({ id }) => id)));
        setCardsProps(shuffle(flatten(images)));
    }, [theme, level]);

    useEffect(() => {
        if (cardsProps.length) {
            const Cards = cardsProps.map((props) => (
                <Card
                    key={props.id}
                    flipped={props.flipped}
                    found={props.found}
                    onClick={setCardsFlipped.bind(null, [
                        ...cardsFlipped,
                        props.id,
                    ])}>
                    <img
                        className="_h-full"
                        src={props.image}
                        key={'image-' + props.id}
                    />
                </Card>
            ));

            setCards(Cards);
        }
    }, [cardsFlipped, cardsProps]);

    // @TODO : Refacto this useEffect
    useEffect(() => {
        if (cardsFlipped.length && clicks === 0) setIsPlaying(true);

        if (cardsFlipped.length && cardsFlipped.length === 2) {
            const sortedCardsFlipped = sortBy(cardsFlipped, (cardId) => cardId);
            const hasFlippedPairs = pairs.filter((pairIds) =>
                isEqual(pairIds, sortedCardsFlipped)
            );

            // Found pairs
            if (hasFlippedPairs.length) {
                updateCard(flatten(hasFlippedPairs), 'found');
                setPairs(
                    pairs.filter(
                        (pairIds) => !isEqual(pairIds, sortedCardsFlipped)
                    )
                );
            }

            setClicks(clicks + 1);

            // @TODO: Refacto this 💩 code
            // Wait for all change to setCardsFlipped to none
            setTimeout(() => setCardsFlipped([]), 700);
        }

        // Retourne met à jour le props flipped
        if (cardsProps.length) {
            updateCard(cardsFlipped, 'flipped');
        }
    }, [cardsFlipped]);

    useEffect(() => {
        if (!pairs.length && clicks) {
            setIsWon(true);
            setIsPlaying(false);
        }
    }, [pairs]);

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
                <ModalWon />

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
