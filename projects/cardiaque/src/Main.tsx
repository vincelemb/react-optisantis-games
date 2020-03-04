import React, { useState, useEffect, useContext } from 'react';
import { Path } from '@optisantis/outil-global/config';
import { AudioButton, Audio, Container, Tab, BgImage, Modal, HeartBeat } from '@optisantis/outil-global/components';
import { PauseSvg, PlaySvg, InfoSvg } from '@optisantis/outil-global/components/svg';
import './styles/index.scss';
import useCountdownOverlay from '@optisantis/outil-global/logics/useCountdownOverlay';
import useCountdown from '@optisantis/outil-global/logics/useCountdown';
import { CountdownContext } from '@optisantis/outil-global/context/CountdownContext';
import useAudioPlayer from '@optisantis/outil-global/logics/useAudioPlayer';

const Main = () => {
    const [timeActive, setTimeActive] = useState<boolean>(false);
    const [isModal, setIsModal] = useState<boolean>(false);

    const [stepCardio, setStepCardio] = useState<string>('Inspirez');

    const { setAudioPlaying, musicPlaying, setMusicPlaying, setResetMusic } = useAudioPlayer();

    const { countdownOverlaySeconds } = useCountdownOverlay(isModal);
    const { countdownSeconds } = useCountdown(timeActive);

    const { setCountdownSeconds, setCountdownOverlaySeconds } = useContext(CountdownContext);

    const [activeTab, setActiveTab] = useState<boolean>(true);
    const [pannelLeft, setPannelLeft] = useState<boolean>(true);
    const [activeSubTab, setActiveSubTab] = useState<boolean>(true);
    const [subPannelLeft, setSubPannelLeft] = useState<boolean>(true);
    const [changeDataCountdown, setChangeDataCountdown] = useState<boolean>(false);

    const [firstBip, setFirstBip] = useState<number>(0);
    const [stepAnimation, setStepAnimation] = useState<number>(1);
    const [timeNumber, setTimeNumber] = useState<number>(5);
    const [play, setPlay] = useState<boolean>(null);
    const [animationState, setAnimationState] = useState<string>('paused');

    useEffect(() => {
        if (play === null) {
            setCountdownSeconds(timeNumber * 600);
        }
        if (play === true) {
            setIsModal(true);
            if (isModal && countdownOverlaySeconds === 0) {
                setAnimationState('running');
                setChangeDataCountdown(true);
                setIsModal(false);
                setTimeActive(true);
            }
        } else {
            setAnimationState('paused');
            setTimeActive(false);
        }
    }, [play, timeNumber, countdownOverlaySeconds]);

    useEffect(() => {
        setAudioPlaying(false);
        if (play === true) {
            if (firstBip === 0) {
                setAudioPlaying(true);
                setFirstBip(1);
            }
            if ((countdownSeconds / 10) % 10 === 5) {
                setAudioPlaying(true);
                setStepAnimation(2);
                setStepCardio('Expirez');
            } else if ((countdownSeconds / 10) % 10 === 0) {
                setAudioPlaying(true);
                setStepAnimation(1);
                setStepCardio('Inspirez');
            }

            if (countdownSeconds === 0) {
                reset();
            }
        }
    }, [countdownSeconds]);

    function secondsToTime(seconds) {
        return new Date(seconds * 100).toISOString().substr(14, 5);
    }

    function reset() {
        setFirstBip(0);
        setPlay(null);
        setStepAnimation(1);
        setAnimationState('paused');
        setTimeActive(false);
        setResetMusic(true);
        setMusicPlaying(false);
        setAudioPlaying(false);
        setChangeDataCountdown(false);
    }

    return (
        <BgImage imageUrl={`${Path.imgPath}hero.jpg`}>
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
                            {subPannelLeft === true && (
                                <section className="_flex _flex-col _w-full _relative">
                                    <ol className="_m-none _list-none _p-none">
                                        <li className="_flex _p-sm">
                                            <span
                                                className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-primary`}>
                                                1
                                            </span>
                                            <p className="_m-none">
                                                Faites l'exercice <strong className="_text-primary">3</strong> fois par
                                                jour, de préférence assis, les yeux ouverts ou fermés, le dos bien droit
                                                et les pieds posés à plat au sol.
                                            </p>
                                        </li>
                                        <li className="_flex _p-sm">
                                            <span
                                                className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-primary`}>
                                                2
                                            </span>
                                            <p className="_m-none">
                                                Respirez <strong className="_text-primary">6</strong> fois par minute :
                                                inspirez en comptant jusqu'à 5, puis expirez en comptant jusqu'à 5. Le
                                                signal sonore vous aide à vous repérer.
                                            </p>{' '}
                                        </li>
                                        <li className="_flex _p-sm">
                                            <span
                                                className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-primary`}>
                                                3
                                            </span>
                                            <p className="_m-none">
                                                Idéalement, pratiquez cet exercice pendant{' '}
                                                <strong className="_text-primary">5</strong> minutes.
                                            </p>
                                        </li>
                                    </ol>
                                </section>
                            )}
                            {subPannelLeft === false && (
                                <p className="_m-none">
                                    Cette technique de relaxation se base sur des exercices de respiration pour
                                    atteindre un état d'équilibre du système nerveux autonome (notre "pilote
                                    automatique"). En agissant sur la variabilité du rythme cardiaque, il est possible
                                    de gérer son état émotionnel et d’améliorer son bien-être physique et psychique :
                                    moins de stress, meilleur sommeil, meilleure concentration…
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
                            <span className="_text-white">
                                {changeDataCountdown === false ? 'Début dans :' : 'Reprise dans :'}
                            </span>
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
                                        {stepCardio}
                                    </span>
                                )}
                                <div className="c-cardio-player _relative _flex _justify-center _items-center">
                                    <HeartBeat
                                        playingStep={stepAnimation}
                                        isPlaying={play}
                                        playingState={animationState}></HeartBeat>
                                    {play !== null && (
                                        <span className="_text-center _text-xxl _text-white _z-10">{`${secondsToTime(
                                            countdownSeconds
                                        )}`}</span>
                                    )}
                                    {play === null && (
                                        <div className="_w-3/5 _flex _justify-between _items-center">
                                            <div className="_relative">
                                                <button
                                                    className="_relative _z-10 _rounded-rounded _bg-black _min-w-xxl _min-h-xxl _max-h-xxl _opacity-10"
                                                    onClick={() =>
                                                        timeNumber > 1 ? setTimeNumber(timeNumber - 1) : null
                                                    }></button>
                                                <div className="less"></div>
                                            </div>
                                            <div className="_flex _flex-col _items-center">
                                                <span
                                                    className="_text-xxl _text-white  _text-center _z-10"
                                                    role="status"
                                                    aria-live="polite">
                                                    {timeNumber}
                                                </span>
                                                <span className="_text-white _z-10">min</span>
                                            </div>
                                            <div className="_relative">
                                                <button
                                                    className=" _relative _z-10 _rounded-rounded _bg-black _min-w-xxl _min-h-xxl _max-h-xxl _opacity-10"
                                                    onClick={() =>
                                                        timeNumber < 10 ? setTimeNumber(timeNumber + 1) : null
                                                    }></button>
                                                <div className="more"></div>
                                            </div>
                                        </div>
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
                                }}>
                                <div className="_flex _items-center _justify-center">
                                    {play ? <PauseSvg svgWidth="25px"></PauseSvg> : <PlaySvg svgWidth="25px"></PlaySvg>}
                                </div>
                            </button>

                            <AudioButton
                                id="music"
                                audioFile={'Wind.mp3'}
                                isPlaying={musicPlaying}
                                toggleMusic={() => {
                                    setResetMusic(false);
                                    setMusicPlaying(!musicPlaying);
                                }}></AudioButton>

                            <Audio id="audio" audioFile={'bip.mp3'}></Audio>
                        </div>
                    </section>
                </div>
            </Container>
        </BgImage>
    );
};

export default Main;
