import React from 'react';
import useGame from '../logics/useGame';
import useScoreTimer from '../logics/useScoreTimer';
import useRecords from '../logics/useRecords';
import { Layout } from '@optisantis/outil-global/components';
import { ReloadSvg } from '@optisantis/outil-global/components/svg';
import ModalWon from './ModalWon';

interface GameProps {
    hidden: boolean;
}

const Game: React.FC<GameProps> = ({ hidden }) => {
    const { cards, clicks, reset, isPlaying } = useGame();
    const { seconds } = useScoreTimer(isPlaying);

    return (
        <section
            hidden={hidden}
            className={`${
                hidden ? '_flex' : 'lg:_hidden '
            } _flex-col _w-full _items-center _relative _my-xl`}>
            <div className="_mx-xxs _flex _justify-between _w-full _items-center _text-white _pb-xs">
                <div className="_flex _items-center ">
                    <span>Temps : </span>
                    <span className="_text-xl"> {seconds}</span>
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

export default Game;
