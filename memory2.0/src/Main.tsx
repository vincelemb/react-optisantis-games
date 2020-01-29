//HOOKS
import React, { useState, useEffect, useContext } from 'react';

//ASSETS
import memoryImages from './assets/images.json';
import memoryClick from './assets/memory/clics.svg';
import memoryTime from './assets/memory/time.svg';

//COMPONENTS
import { Button, Card, Confetti, ScoreClick, Popup, Container, Layout, Tab } from './components';

//TYPES
import memoryType from './type/memoryType';

//STYLE
import './styles/tailwind.css';
import './styles/memory.scss';
import './styles/confetti.scss';

//LOGICS
import useScoreTimer from './logics/useScoreTimer';

//UTILS
import TimeFormat from './utils/TimeFormat';

//UseContext
import { TimerContext } from './context/TimerContext';

const Main = () => {
    let numbers = [12, 16, 20, 24, 28];
    let themes = {
        fruits_legumes: 'Fruit et Légumes',
        medical: 'Médical',
        meteo: 'Météo',
        sommeil: 'Sommeil',
        sport: 'Sport',
    };

    const [numberCard, setNumberCard] = useState<number>(numbers[0]);
    const [isFlipped, setIsFlipped] = useState<number[]>([]);
    const [winPairs, setWinPairs] = useState<any[]>([]);
    const [idCards, setIdCards] = useState<any>([]);
    const [images, setImages] = useState<any>(themes.fruits_legumes);
    const [imagesArray, setImagesArray] = useState<any>(memoryImages.fruits_legumes);
    const [currentPair, setCurrentPair] = useState<string[]>([]);
    const [count, setCount] = useState<number>(0);
    const [timeActive, setTimeActive] = useState<boolean>(false);
    const [saveScore, setSaveScore] = useState<memoryType[] | any>([]);
    const [isModlaHide, setIsModlaHide] = useState<boolean>(true);
    const [indexLevel, setIndexLevel] = useState<number>(saveScore.findIndex((index) => index.level === numberCard));

    let timerInterval: NodeJS.Timeout | undefined = undefined;
    const { seconds } = useScoreTimer(timeActive, timerInterval);
    const { setSeconds, setMinutes } = useContext(TimerContext);

    const [activeTab, setActiveTab] = useState<boolean>(true);
    const [pannelLeft, setPannelLeft] = useState<boolean>(true);

    const Cards: JSX.Element[] = [];

    /**
     * UseEffect sert ici à obsever le changment de idCards, uniquement si il y a eu un changement au niveau de numberCard
     * Array d'ids en fonction du nombre de cards et shuffle
     */
    useEffect(() => {
        setIdCards((idCards.length = 0));

        for (let i = 0; i < numberCard / 2; i++) {
            setIdCards(idCards.push(i));
        }
        setIdCards(idCards.push(...idCards));
        setIdCards(shuffle(idCards));
        setIdCards(idCards.toString().split(','));
    }, [numberCard, imagesArray]);

    /**
     * Check la concordance des deux cards selectionnées
     */
    useEffect(() => {
        if (isFlipped.length > 2) {
            setIsFlipped([]);
        }

        if (currentPair.length === 2 && isFlipped[0] !== isFlipped[1]) {
            setCount(count + 1);
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
        if (winPairs.length === numberCard) {
            setIsModlaHide(false);
            timerStatus(false); // Arrete le Timer

            if (indexLevel !== -1) {
                // La, on créer un "saveScore" temporaire en lui passant les nouvelle valeurs qui viennent d'être joué. Pour ensuite comparer saveScore et tempSaveScore
                const tempSaveScore: any[] = [...saveScore];

                if (count < saveScore[indexLevel].click) {
                    /*Ici, on dit a tempSaveScore -> à l'élement de indexLevel (ici 12) tu vas suprimer 1 element, et le remplacer par 
                    l'objet tempSaveScore à l'indexLevel dont la valeur click cahnge pour le nouveau count (il changer automatiquement pour la nouvel clé "click").
                    */
                    tempSaveScore.splice(indexLevel, 1, { ...tempSaveScore[indexLevel], click: count });
                }
                if (seconds < saveScore[indexLevel].time) {
                    tempSaveScore.splice(indexLevel, 1, { ...tempSaveScore[indexLevel], time: seconds });
                }
                if (count < saveScore[indexLevel].click || seconds < saveScore[indexLevel].time)
                    setSaveScore(tempSaveScore);
            } else {
                setSaveScore([...saveScore, { level: numberCard, click: count, time: seconds }]);
            }
        }
    }, [winPairs]);

    // useEffect(() => {
    //     console.log(saveScore)
    // }, [saveScore]);

    useEffect(() => {
        setIndexLevel(saveScore.findIndex((index) => index.level === numberCard));
    }, [reset]);

    function toggleClass(index: number) {
        setNumberCard(numbers[index]);
        renderImg(imagesArray, numbers[index]);
    }

    function changetheme(value: string) {
        setImagesArray(memoryImages[value]);
        renderImg(imagesArray, numberCard);
    }

    function reset() {
        setWinPairs([]);
        setIsFlipped([]);
        setCurrentPair([]);
        setCount(0);
        setSeconds(0);
        setMinutes(0);
        setIsModlaHide(true);
    }

    function renderLevelBtns() {
        const Buttons: JSX.Element[] = [];
        numbers &&
            numbers.map((number, index) => {
                Buttons.push(
                    <Button
                        key={index}
                        label={'cartes'}
                        number={number}
                        activeClass={
                            numberCard === numbers[index] ? '_bg-primary _text-white' : '_text-primary _border-primary'
                        }
                        onClick={() => {
                            toggleClass(index);
                            reset();
                        }}
                    />
                );
            });
        return <div className="_flex _flex-wrap _justify-center _px-md _py-sm _rounded-small">{Buttons}</div>;
    }

    function renderThemeBtns() {
        const ButtonsTheme: JSX.Element[] = [];
        Object.keys(themes).map((key, value) => {
            ButtonsTheme.push(
                <Button
                    key={key}
                    label={themes[key]}
                    activeClass={images === themes[key] ? '_bg-white _text-primary' : '_text-white _border-white'}
                    onClick={() => {
                        setImages(themes[key]);
                        changetheme(Object.keys(themes)[value]);
                        reset();
                    }}
                />
            );
        });
        return <div className="_flex _justify-center _px-md _py-sm _rounded-small _flex-wrap">{ButtonsTheme}</div>;
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
            Img.push(<img className="_h-full" src={urlArray[index]} key={'image-' + index} alt="ok"></img>);
        }
        return Img.slice(0, number / 2);
    }

    /**
     * Permet de randomize la position des valeurs dans le tableau
     * @param {Array} array
     */
    function shuffle(array) {
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
        return array;
    }

    /**
     * Animation confetti lors du remplissage de la victoire de l'utilisateur
     */
    function renderConfetti() {
        const Confettis: JSX.Element[] = [];
        let i = 300;

        if (winPairs.length === numberCard) {
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
        const Images: any = renderImg(imagesArray, numberCard);

        for (let i = 0; i < numberCard; i++) {
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

    // const displayWinSentence = (type:any) =>{
    //     return saveScore[indexLevel] ? saveScore[indexLevel].type === count ? '_block ' : '_hidden' : "_hidden"
    // }

    return (
        <div className="memory-bg">
            {renderConfetti()}
            <div className="_rounded-small _border _border-solid _border-primary _mt-md _mx-md _justify-around _hidden lg:_flex">
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
                    <section className={`_mr-md lg:_mr-none _my-xl _w-full ${pannelLeft ? '_block' : 'lg:_hidden '}`}>
                        <div className="_bg-darkenprimary _rounded-small ">
                            <h2 className="_text-center _text-white _m-none _pt-sm">Thème</h2>
                            {renderThemeBtns()}
                        </div>
                        <div className="_bg-white _rounded-small _mt-sm">
                            <h2 className="_text-center _text-primary _m-none _pt-sm">Niveau de difficulté</h2>
                            {renderLevelBtns()}
                        </div>
                        <div className="_bg-darkenprimary _mt-sm _rounded-small ">
                            <h2 className="_text-center _text-white _m-none _pt-sm">Score</h2>
                            <span className="_text-center _text-white _block _mt-xxs">
                                {'(' + numberCard + ' cartes)'}
                            </span>
                            <div className="_flex _justify-center _py-xs">
                                <div className="_m-xs">
                                    <div className="_flex _items-center _mb-xs">
                                        <img src={memoryTime} className="_h-full _w-lg _mr-xs" alt="" />
                                        <span className="_text-white">Temps</span>
                                    </div>
                                    <div className="_flex _justify-start">
                                        <ScoreClick
                                            isIcon
                                            iconPosition="left"
                                            count={
                                                saveScore[indexLevel] ? TimeFormat(saveScore[indexLevel].time) : '00:00'
                                            }></ScoreClick>
                                    </div>
                                </div>

                                <div className="_m-xs">
                                    <div className="_flex _items-center _mb-xs">
                                        <img src={memoryClick} className="_h-full _w-lg _mr-xs" alt="" />
                                        <span className="_text-white">Clics</span>
                                    </div>
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
                    </section>

                    <section className={`_flex _flex-col _w-full ${pannelLeft === false ? '_block' : 'lg:_hidden'} _items-center _relative _my-xl`}>
                        <div className="_mx-xxs _flex _justify-between _w-full _items-center _text-white _pb-xs">
                            <div className="_flex _items-center ">
                                <span>Temps : </span>
                                <span className="_text-xl"> {TimeFormat(seconds)}</span>
                            </div>
                            <div className="_flex _items-center">
                                <span className="_mr-xxs">Clics :</span>
                                <span className="_text-xl">{count}</span>
                            </div>
                        </div>
                        <div className="_flex _items-center _justify-center">
                            <Popup title="Partie terminée" displayPopup={isModlaHide}>
                                <span className={` _text-golden ${saveScore[indexLevel] ? saveScore[indexLevel].click === count ? '_block ' : '_hidden' : "_hidden"}`}>Nouveaux record de clics</span>
                                <span className={` _text-golden ${saveScore[indexLevel] ? saveScore[indexLevel].time === seconds ? '_block ' : '_hidden' : "_hidden"}`}>Nouveaux record de temps</span>
                                <div className="_bg-darkenprimary _rounded-small _w-3/4 _mt-xs">
                                    <div className="_flex _flex-wrap _justify-around">
                                        <div className="_m-xs">
                                            <div className="_flex _items-center ">
                                                <img src={memoryTime} className="_h-full _w-lg _mr-xs"/>
                                                <span className="_text-white">Temps</span>
                                            </div>
                                            <span className="_text-xl _text-white"> {TimeFormat(seconds)}</span>
                                            <div className="_flex _justify-start">
                                                <ScoreClick
                                                    isIcon
                                                    iconPosition="left"
                                                    count={
                                                        saveScore[indexLevel]
                                                            ? TimeFormat(saveScore[indexLevel].time)
                                                            : '00:00'
                                                    }></ScoreClick>
                                            </div>
                                        </div>

                                        <div className="_m-xs">
                                            <div className="_flex _items-center">
                                                <img src={memoryClick} className="_h-full _w-lg _mr-xs" alt="" />
                                                <span className="_text-white">Clics</span>
                                            </div>
                                            <span className="_text-xl _text-white">{count}</span>
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
                    </section>
                </div>
            </Container>
        </div>
    );
};

export default Main;
