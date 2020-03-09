import React, { useContext } from 'react';
import { snakeCase } from 'lodash';
import { GameContext } from '../contexts/GameContext';
import TimeFormat from '../utils/TimeFormat';
import useGame from '../logics/useGame';
import { ScoreClick } from '@optisantis/outil-global/components';
import { TimeSvg, ClickSvg } from '@optisantis/outil-global/components/svg';

const ModalWon: React.FC = () => {
    const { reset, clicks, isDone, records, seconds } = useGame();
    const { level, theme } = useContext(GameContext);
    const themeParsed = snakeCase(theme);

    return (
        <div
            hidden={!isDone}
            className={`${
                !isDone ? '_none' : '_flex'
            } _flex-col _justify-center _items-center _absolute _w-3/5 _h-auto _z-10 _px-xs _py-xxs _rounded-small _bg-primary`}>
            <h2 className="_text-white _text-lg _mb-xxs">Partie terminée</h2>
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
                        <span className="_text-xl _text-white">{seconds}</span>
                        <div className="_flex _justify-start">
                            <ScoreClick
                                isIcon
                                iconPosition="left"
                                count={
                                    records[level] &&
                                    records[level][themeParsed] &&
                                    TimeFormat(records[level][themeParsed].time)
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
                                    records[level] &&
                                    records[level][themeParsed] &&
                                    records[level][themeParsed].clicks
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
        </div>
    );
};

export default ModalWon;
