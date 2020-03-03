//HOOKS
import React, { useState, useEffect, useContext } from 'react';

//GLOBAL CONST
import Path from '../../consts'

//COMPONENTS
import { AudioButton, CircleGrow, Container, Tab, BgImage, Modal } from '../../components';

//SVG COOMPONENTS
import { PlaySvg, PauseSvg, InfoSvg } from '../../components/svg';

//TYPES
import chronoType from './type/chronoType';

//STYLE
import './styles/index.scss';
import '../../styles/index.scss';

//LOGICS
import useScoreTimer from './logics/useScoreTimer';
import useCountdownOverlay from '../../logics/useCountdownOverlay';

//UseContext
import { TimerContext } from '../../context/TimerContext';
import { CountdownContext } from '../../context/CountdownContext';

import useAudioPlayer from '../../logics/useAudioPlayer';

const Main = () => {
    const [timeActive, setTimeActive] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);

    const chronoStep: chronoType = {
        stepSeconds: [40, 70, 80],
        stepName: ['Inspirez', 'Retenez', 'Expirez'],
        stepColor: ['primary', 'warning', 'golden'],
    };

    let [step, setStep] = useState<number | null>(0);

    const { seconds } = useScoreTimer(timeActive);
    const { setSeconds } = useContext(TimerContext);

    const { musicPlaying, setMusicPlaying, setResetMusic } = useAudioPlayer();

    const { countdownOverlaySeconds } = useCountdownOverlay(isModal);
    const { setCountdownOverlaySeconds } = useContext(CountdownContext);

    // CHRONO
    const [activeTab, setActiveTab] = useState<boolean>(true);
    const [pannelLeft, setPannelLeft] = useState<boolean>(true);
    const [activeSubTab, setActiveSubTab] = useState<boolean>(true);
    const [subPannelLeft, setSubPannelLeft] = useState<boolean>(true);
    const [changeDataCountdown, setChangeDataCountdown] = useState<boolean>(false);

    const [play, setPlay] = useState<boolean>(null);
    const [animationState, setAnimationState] = useState<string>('paused');

    useEffect(() => {
        if (timeActive === true) {
            if (seconds > chronoStep.stepSeconds[step]) {
                setStep(step + 1);
                setSeconds(1);
            }
            if (step === 2 && seconds > chronoStep.stepSeconds[step]) {
                setStep(0);
                setSeconds(1);
            }
        } else {
            setSeconds(1);
        }
    }, [seconds]);

    useEffect(() => {
        if (play === true) {
            setIsModal(true);
            if (isModal && countdownOverlaySeconds === 0) {
                setAnimationState('running');
                setIsModal(false);
                setChangeDataCountdown(true);
                setTimeActive(!timeActive);
            }
        }
    }, [play, countdownOverlaySeconds]);

    useEffect(() => {
        if (play === false) {
            setAnimationState('paused');
            setTimeActive(!timeActive);
        }
    }, [play]);

    function displayCount(count){
        let res = count / 10;
        return Math.ceil(res);
    }

    function reset() {
        setPlay(null);
        setStep(0);
        setSeconds(1);
        setTimeActive(false);
        setAnimationState('paused');
        setResetMusic(true);
        setMusicPlaying(false);
        setChangeDataCountdown(false);
    }

    return (
        <BgImage imageUrl={`${Path.imgPath}lake.jpg`}>
            <div className="_rounded-small _border _border-solid _border-primary _mt-md _mx-sm _justify-around _hidden lg:_flex _cursor-pointer">
                <Tab
                    isActive={activeTab}
                    toogleTab={() => {
                        setPannelLeft(true);
                        return !activeTab ? setActiveTab(!activeTab) : null;
                    }}>
                    <span>Options</span>
                </Tab>
                <Tab
                    isActive={!activeTab}
                    toogleTab={() => {
                        setPannelLeft(false);
                        return activeTab ? setActiveTab(!activeTab) : null;
                    }}>
                    <span>Jouer</span>
                </Tab>
            </div>
            <Container maxWidth="991px" isCenteredX>
                <div className="_flex _px-sm">
                    {/* Options Panel */}
                    <aside
                        className={`_bg-white _my-xl _h-full _w-full _rounded-small ${
                            pannelLeft ? '_block' : 'lg:_hidden '
                        }`}>
                        <nav>
                            <ul className="_justify-around _flex _cursor-pointer _p-sm _m-none">
                                <Tab
                                    isActive={activeSubTab}
                                    borderBottomStyle={true}
                                    toogleTab={() => {
                                        setSubPannelLeft(true);
                                        return !activeSubTab ? setActiveSubTab(!activeSubTab) : null;
                                    }}>
                                    <span className="_uppercase _text-center">Étapes</span>
                                </Tab>
                                <Tab
                                    isActive={!activeSubTab}
                                    borderBottomStyle={true}
                                    toogleTab={() => {
                                        setSubPannelLeft(false);
                                        return activeSubTab ? setActiveSubTab(!activeSubTab) : null;
                                    }}>
                                    <span className="_uppercase _text-center">Le Saviez-vous ?</span>
                                </Tab>
                            </ul>       
                        </nav>
                        <div className="_p-sm">
                            { subPannelLeft=== true && (
                                <section    
                                    className="_flex _flex-col _w-full _relative">
                                    <ol className="_m-none _list-none _p-none">
                                        <li className="_flex _p-sm"> 
                                            <span className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${chronoStep.stepColor[0]}`}>1</span>
                                            <p className="_m-none">Fermez la bouche et inspirez tranquillement par le nez en comptant jusqu'à 4.</p> 
                                        </li>
                                        <li className="_flex _p-sm">
                                            <span className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${chronoStep.stepColor[1]}`}>2</span>
                                            <p className="_m-none">Retenez votre souffle en comptant jusqu'à 7.</p> </li>
                                        <li className="_flex _p-sm">
                                            <span className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${chronoStep.stepColor[2]}`}>3</span>
                                            <p className="_m-none">Expirez bruyamment par la bouche en comptant jusqu'à 8 et en faisant le son "whoosh".</p>
                                        </li>
                                    </ol>
                                    <h3 className="_mb-none _mt-lg _text-primary _text-lg _font-normal">AVANT DE COMMENCER :</h3>
                                    <p className="_mt-none">
                                        Fermez les yeux et expirez tout l'air de vos poumons.
                                        Touchez votre palais du bout de la langue, juste derrière les incisives, et conservez
                                        cette position pendant l'exercice.
                                    </p>
                                </section>
                            )}
                            {subPannelLeft === false && (
                                <p className="_m-none">
                                    Cet exercice permet de diminuer le stress, et peut également vous aider à vous endormir.
                                    Idéalement, mettez-vous assis le dos bien droit, les pieds à plat au sol. Vous pouvez
                                    également pratiquer cet exercice debout, ou couché dans votre lit.
                                </p>
                            )}
                        </div>
                    </aside>

                    {/* Game Panel */}
                    <section
                        className={`_flex _flex-col _w-full ${
                            pannelLeft === false ? '_block' : 'lg:_hidden'
                        } _items-center _relative _my-xl`}>
                        {/* Modal Panel */}
                        <Modal
                            title="Partie terminée"
                            isModal={isModal}
                            isOverlay={true}
                            onCloseBtnClick={() => {
                                setCountdownOverlaySeconds(0);
                            }}>
                            <span className="_text-white">{changeDataCountdown === false ? "Début dans :" : "Reprise dans :"}</span>
                            <span className="_text-xxl _text-white _py-sm">{countdownOverlaySeconds}</span>
                            <div
                                className="_w-4/5 _bg-white _rounded-small _border-solid _border-2 _p-sm _border-white _flex"
                                style={{ backgroundColor: 'rgba(255,255,255,.3)' }}>
                                <div className="_mr-xs">
                                    <InfoSvg fillColor="#fff" svgWidth="20px" svgHeight="20px"></InfoSvg>
                                </div>
                                <span className="_text-white">
                                    Essayez de respirer par le ventre pendant cet exercice
                                </span>
                            </div>
                        </Modal>

                        {/* Cards */}
                        <section className="_w-full _flex _justify-center _items-center">
                            <div className="_flex _flex-col">
                                {play !== null && (
                                    <span
                                        className="_text-center _text-xl _text-white _w-full"
                                        role="status"
                                        aria-live="polite">
                                        {chronoStep.stepName[step]}
                                    </span>
                                )}
                                <div className="c-chrono-player _relative _flex _justify-center _items-center">
                                    <CircleGrow
                                        isPlaying={play}
                                        playingStep={step}
                                        borderColor={chronoStep.stepColor[step]}
                                        playingState={animationState}>

                                        </CircleGrow>
                                        {play === null && (
                                            <span
                                                className="_text-lg _text-primary _p-xs _text-center _z-10"
                                                role="status"
                                                aria-live="polite">
                                                Cliquez sur lecture pour commencer
                                            </span>
                                        )}
                                    {play !== null && (
                                        <span className="_text-center _text-xxl _text-primary _z-10">{displayCount(seconds)}</span>
                                    )}
                                    
                                </div>
                            </div>
                        </section>

                        <div className="_mt-sm _mb-lg _w-full _flex _justify-center _items-center">
                            <button
                                className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none _flex _items-center _justify-center"
                                onClick={() => {
                                    reset();
                                }}>
                                <div className="_w-sm _h-sm _bg-warning"></div>
                            </button>
                            <button
                                className="_bg-white _rounded-rounded _w-xxxl _h-xxxl _border-none _cursor-pointer _outline-none _mx-sm _p-none"
                                onClick={() => {
                                    
                                    setCountdownOverlaySeconds(changeDataCountdown ? 3 : 5);
                                    setPlay(!play);
                                    setResetMusic(false);
                                }}>
                                {play === null && (
                                    <div className="_ml-xxs _flex _items-center _justify-center">
                                        <PlaySvg svgWidth="25px"></PlaySvg>
                                    </div>
                                    
                                )}
                                {play === false && (
                                    <div className="_ml-xxs _flex _items-center _justify-center">
                                        <PlaySvg svgWidth="25px"></PlaySvg>
                                    </div>
                                )}
                                {play === true && (
                                    
                                    <div className="_flex _items-center _justify-center">
                                        <PauseSvg svgWidth="25px"></PauseSvg>
                                    </div>
                                )}
                            </button>

                            <AudioButton
                                id="music"
                                audioFile={'Soul-Colors.mp3'}
                                isPlaying={musicPlaying}
                                toggleMusic={() => {
                                    setResetMusic(false);
                                    setMusicPlaying(!musicPlaying);
                                }}></AudioButton>
                        </div>
                    </section>
                </div>
            </Container>
        </BgImage>
    );
};

export default Main;
