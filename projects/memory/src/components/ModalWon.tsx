import React, { useContext, useState } from 'react';

import { GameContext } from '../contexts/GameContext';
import TimeFormat from '../utils/TimeFormat';
import memoryType from '../types/memoryType';

import { ScoreClick } from '@optisantis/outil-global/components';
import { TimeSvg, ClickSvg } from '@optisantis/outil-global/components/svg';
import Popup from './Popup';

const ModalWon: React.FC = () => {
    const { reset, isWon, level, clicks, seconds } = useContext(GameContext);

    // @TODO : Replace this block -------------------------
    const [saveScore, setSaveScore] = useState<memoryType[] | any>([]);
    const [indexLevel, setIndexLevel] = useState<number>(
        saveScore.findIndex((index) => index.level === level)
    );
    // ----------------------------------------------------

    return (
        <Popup title="Partie terminée" hidden={!isWon}>
            {/* {winClickSentence === true && (
                <span className="_text-golden">Nouveaux record de clics</span>
            )}
            {winTimeSentence === true && (
                <span className="_text-golden">Nouveaux record de temps</span>
            )} */}
            <div className="_bg-darkenprimary _rounded-small _w-3/4 _mt-xs">
                <div className="_flex _flex-wrap _justify-around">
                    <div className="_m-xs">
                        <div className="_flex _items-center ">
                            <TimeSvg svgWidth="25px"></TimeSvg>
                            <span className="_ml-xs _text-white">Temps</span>
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
                                              saveScore[indexLevel].seconds
                                          )
                                        : '00:00'
                                }></ScoreClick>
                        </div>
                    </div>

                    <div className="_m-xs">
                        <div className="_flex _items-center">
                            <ClickSvg svgWidth="25px"></ClickSvg>
                            <span className="_ml-xs _text-white">Clics</span>
                        </div>
                        <span className="_text-xl _text-white">{clicks}</span>
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
                    onClick={reset}>
                    <span>Rejouer</span>
                </button>
            </section>
        </Popup>
    );
};

export default ModalWon;
