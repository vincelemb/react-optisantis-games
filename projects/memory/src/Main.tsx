import React, { useState, useEffect, useContext } from 'react';
import { Path } from '@optisantis/outil-global/config';
import { snakeCase, shuffle } from 'lodash';
import memoryImages from './assets/images.json';

import {
    Button,
    Card,
    Confetti,
    ScoreClick,
    Popup,
    Container,
    Layout,
    Tab,
    BgImage,
} from '@optisantis/outil-global/components';
import { ReloadSvg, TimeSvg, ClickSvg } from '@optisantis/outil-global/components/svg';
import PanelOptions from './components/PanelOptions';

import memoryType from './type/memoryType';
import useScoreTimer from './logics/useScoreTimer';
import TimeFormat from './utils/TimeFormat';
import { TimerContext } from '@optisantis/outil-global/context/TimerContext';
import { LevelContext } from './contexts/LevelContext';
import { ThemeContext, THEMES } from './contexts/ThemeContext';

const Main = () => {
    const { level, setLevel } = useContext(LevelContext);
    const { theme, setTheme } = useContext(ThemeContext);
    const themeNameParsed = snakeCase(theme);

    const [isFlipped, setIsFlipped] = useState<number[]>([]);
    const [winPairs, setWinPairs] = useState<any[]>([]);
    const [idCards, setIdCards] = useState<any>([]);
    const [images, setImages] = useState<any>(THEMES[0]);
    const [imagesTheme, setImagesTheme] = useState<string>(themeNameParsed);
    const [imagesArray, setImagesArray] = useState<any>(memoryImages[themeNameParsed]);
    const [currentPair, setCurrentPair] = useState<string[]>([]);
    const [click, setClick] = useState<number>(0);
    const [timeActive, setTimeActive] = useState<boolean>(false);
    const [saveScore, setSaveScore] = useState<memoryType[] | any>([]);
    const [isModlaHide, setIsModlaHide] = useState<boolean>(true);
    const [winClickSentence, setWinClickSentence] = useState<boolean>(true);
    const [winTimeSentence, setWinTimeSentence] = useState<boolean>(true);
    const [isConfetti, setIsConfetti] = useState<boolean>(true);
    const [indexLevel, setIndexLevel] = useState<number>(saveScore.findIndex((index) => index.level === level));

    const { seconds } = useScoreTimer(timeActive);
    const { setSeconds, setMinutes } = useContext(TimerContext);

    const [activeTab, setActiveTab] = useState<boolean>(true);
    const [pannelLeft, setPannelLeft] = useState<boolean>(true);

    const Cards: JSX.Element[] = [];

    useEffect(() => {
        setIdCards((idCards.length = 0));

        for (let i = 0; i < Number(level) / 2; i++) {
            setIdCards(idCards.push(i));
        }
        setIdCards(idCards.push(...idCards));
        setIdCards(shuffle(idCards));
        setIdCards(idCards.toString().split(','));
    }, [level, imagesArray]);

    /**
     * Check la concordance des deux cards selectionnées
     */
    useEffect(() => {
        if (isFlipped.length > 2) {
            setIsFlipped([]);
        }

        if (currentPair.length === 2 && isFlipped[0] !== isFlipped[1]) {
            setClick(click + 1);
            if (currentPair[0] === currentPair[1]) {
                setWinPairs(winPairs.concat(currentPair));
                setCurrentPair([]);
                setIsFlipped([]);
            } else {
                setCurrentPair([]);
                setTimeout(() => {
                    setIsFlipped([]);
                }, 500);
            }
        } else if (currentPair.length > 2) {
            setCurrentPair([]);
        } else if (isFlipped[0] === isFlipped[1]) {
            setCurrentPair([]);
        }
    }, [isFlipped]);

    useEffect(() => {
        if (winPairs.length === Number(level)) {
            setIsModlaHide(false);
            timerStatus(false); // Arrete le Timer

            if (indexLevel !== -1) {
                setIsConfetti(false);
                setWinClickSentence(false);
                setWinTimeSentence(false);
                // La, on créer un "saveScore" temporaire en lui passant les nouvelle valeurs qui viennent d'être joué. Pour ensuite comparer saveScore et tempSaveScore
                const tempSaveScore: any[] = [...saveScore];

                if (click < saveScore[indexLevel].click) {
                    /*Ici, on dit a tempSaveScore -> à l'élement de indexLevel (ici 12) tu vas suprimer 1 element, et le remplacer par
                    l'objet tempSaveScore à l'indexLevel dont la valeur click cahnge pour le nouveau click (il changer automatiquement pour la nouvel clé "click").
                    */
                    tempSaveScore.splice(indexLevel, 1, { ...tempSaveScore[indexLevel], click: click });
                    setWinClickSentence(true);
                }
                if (seconds < saveScore[indexLevel].seconds) {
                    tempSaveScore.splice(indexLevel, 1, { ...tempSaveScore[indexLevel], seconds: seconds });
                    setWinTimeSentence(true);
                }
                if (click < saveScore[indexLevel].click || seconds < saveScore[indexLevel].seconds) {
                    setIsConfetti(true);
                    setSaveScore(tempSaveScore);
                }
            } else {
                setIsConfetti(true);
                setSaveScore([...saveScore, { level, click: click, seconds: seconds }]);
            }
        }
    }, [winPairs]);

    useEffect(() => {
        setIndexLevel(saveScore.findIndex((index) => index.level === level));
    }, [reset]);

    useEffect(() => {}, [imagesArray]);

    function reset() {
        setWinPairs([]);
        setIsFlipped([]);
        setCurrentPair([]);
        setClick(0);
        setSeconds(0);
        setMinutes(0);
        setIsModlaHide(true);
        setTimeActive(false);
        setIsConfetti(false);
    }

    /**
     * Permet de rendre  par categorie la moitié d'un nombre d'image définie.
     * @param categorie
     * @param number
     */
    function renderImg(categorie: any, number: number) {
        const Img: JSX.Element[] = [];
        let urlArray: string[] = Object.values(categorie);

        for (let index = 0; index < number / 2; index++) {
            Img.push(
                <img
                    className="_h-full"
                    src={Path.imgPath + themeNameParsed + '/' + urlArray[index]}
                    key={'image-' + index}
                    alt="Memory Images"></img>
            );
        }
        return Img.slice(0, number / 2);
    }

    /**
     * Permet de randomize la position des valeurs dans le tableau
     * @param {Array} array
     */
    // function shuffle(array) {
        // let counter = array.length;

        // // While there are elements in the array
        // while (counter > 0) {
        //     // Pick a random index
        //     let index = Math.floor(Math.random() * counter);

        //     // Decrease counter by 1
        //     counter--;

        //     // And swap the last element with it
        //     let temp = array[counter];
        //     array[counter] = array[index];
        //     array[index] = temp;
        // }
        // return array;
    // }

    /**
     * Animation confetti lors du remplissage de la victoire de l'utilisateur
     */
    function renderConfetti() {
        const Confettis: JSX.Element[] = [];
        let i = 300;

        if (saveScore[indexLevel] && isConfetti) {
            while (i > -1) {
                Confettis.push(<Confetti confettiClass={'confetti-' + i} key={i}></Confetti>);
                i--;
            }
        }

        return <React.Fragment>{Confettis}</React.Fragment>;
    }

    function activeClass(index) {
        let string: string;
        string = isFlipped.includes(index) ? '-isFlipped' : winPairs.includes(idCards[index]) ? '-isWin' : '_bg-white';
        return string;
    }

    function timerStatus(status: boolean) {
        let click = 0;
        if (click === 0) {
            setTimeActive(status);
        }
        click++;
    }

    const renderCards = () => {
        const Images: any = renderImg(imagesArray, Number(level));

        for (let i = 0; i < Number(level); i++) {
            // Si au moment ou je click sur le bouton (call de flipCard(i) qui change isFlipped) c'est le meme chiffre que i, alors...
            Cards.push(
                <Card
                    flipClass={activeClass(i)}
                    key={i}
                    data-js-id={idCards[i]}
                    onClick={() => {
                        setIsFlipped([...isFlipped, i]);
                        setCurrentPair([...currentPair, idCards[i].toString()]);
                        timerStatus(true);
                    }}>
                    {Images[idCards[i]]}
                </Card>
            );
        }
        return (
            <Layout col={4} spacing="_p-xxs" desktopLayout>
                {Cards}
            </Layout>
        );
    };

    return (
        <BgImage imageUrl={'./assets/img/lake.jpg'}>
            {renderConfetti()}
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
                    <PanelOptions />

                    {/* Game Panel */}
                    <section
                        className={`_flex _flex-col _w-full ${
                            pannelLeft === false ? '_block' : 'lg:_hidden'
                        } _items-center _relative _my-xl`}>
                        <div className="_mx-xxs _flex _justify-between _w-full _items-center _text-white _pb-xs">
                            <div className="_flex _items-center ">
                                <span>Temps : </span>
                                <span className="_text-xl"> {TimeFormat(seconds)}</span>
                            </div>
                            <div className="_flex _items-center">
                                <span className="_mr-xxs">Clics :</span>
                                <span className="_text-xl">{click}</span>
                            </div>
                        </div>
                        <div className="_flex _items-center _justify-center">
                            <Popup title="Partie terminée" displayPopup={isModlaHide}>
                                {winClickSentence === true && (
                                    <span className="_text-golden">Nouveaux record de clics</span>
                                )}
                                {winTimeSentence === true && (
                                    <span className="_text-golden">Nouveaux record de temps</span>
                                )}
                                <div className="_bg-darkenprimary _rounded-small _w-3/4 _mt-xs">
                                    <div className="_flex _flex-wrap _justify-around">
                                        <div className="_m-xs">
                                            <div className="_flex _items-center ">
                                                <TimeSvg svgWidth="25px"></TimeSvg>
                                                <span className="_ml-xs _text-white">Temps</span>
                                            </div>
                                            <span className="_text-xl _text-white"> {TimeFormat(seconds)}</span>
                                            <div className="_flex _justify-start">
                                                <ScoreClick
                                                    isIcon
                                                    iconPosition="left"
                                                    count={
                                                        saveScore[indexLevel]
                                                            ? TimeFormat(saveScore[indexLevel].seconds)
                                                            : '00:00'
                                                    }></ScoreClick>
                                            </div>
                                        </div>

                                        <div className="_m-xs">
                                            <div className="_flex _items-center">
                                                <ClickSvg svgWidth="25px"></ClickSvg>
                                                <span className="_ml-xs _text-white">Clics</span>
                                            </div>
                                            <span className="_text-xl _text-white">{click}</span>
                                            <div className="_flex _justify-start">
                                                <ScoreClick
                                                    isIcon
                                                    iconPosition="left"
                                                    count={
                                                        saveScore[indexLevel] ? saveScore[indexLevel].click : '00'
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
                            {renderCards()}
                        </div>
                        <div className="_mt-sm _mb-lg _w-full _text-right">
                            <button
                                className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none"
                                onClick={() => reset()}>
                                <ReloadSvg></ReloadSvg>
                            </button>
                        </div>
                    </section>
                </div>
            </Container>
        </BgImage>
    );
};

export default Main;
