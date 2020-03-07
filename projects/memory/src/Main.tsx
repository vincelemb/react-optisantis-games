import React, { useState, useContext } from 'react';

import { Container, Tab, BgImage } from '@optisantis/outil-global/components';
import PanelOptions from './components/PanelOptions';
import PanelGame from './components/PanelGame';
import Confetti from './components/Confetti';

import memoryType from './type/memoryType';
import { GameContext } from './contexts/GameContext';

const Main = () => {
    const { level } = useContext(GameContext);

    // Confetti logics ------------------------------------
    const [saveScore, setSaveScore] = useState<memoryType[] | any>([]);

    const [isConfetti, setIsConfetti] = useState<boolean>(true);
    const [indexLevel, setIndexLevel] = useState<number>(
        saveScore.findIndex((index) => index.level === level)
    );
    // ----------------------------------------------------
    
    // @TODO : Change with new component TabsGroup
    const [activeTab, setActiveTab] = useState<boolean>(true);

    function renderConfetti() {
        const Confettis: JSX.Element[] = [];
        let i = 300;

        if (saveScore[indexLevel] && isConfetti) {
            while (i > -1) {
                Confettis.push(
                    <Confetti
                        confettiClass={'confetti-' + i}
                        key={i}></Confetti>
                );
                i--;
            }
        }

        return <React.Fragment>{Confettis}</React.Fragment>;
    }

    return (
        <BgImage imageUrl={'./assets/img/lake.jpg'}>
            {renderConfetti()}
            <div className="_rounded-small _border _border-solid _border-primary _mt-md _mx-sm _justify-around _hidden lg:_flex _cursor-pointer">
                <Tab
                    isActive={activeTab}
                    toogleTab={() => setActiveTab(true)}>
                    <span>Options</span>
                </Tab>
                <Tab
                    isActive={!activeTab}
                    toogleTab={() => setActiveTab(false)}>
                    <span>Jouer</span>
                </Tab>
            </div>

            <Container maxWidth="991px" isCenteredX>
                <div className="_flex _px-sm">
                    <PanelOptions hidden={activeTab} />
                    <PanelGame hidden={!activeTab} />
                </div>
            </Container>
        </BgImage>
    );

    // useEffect(() => {
    //     if (isFlipped.length > 2) {
    //         setIsFlipped([]);
    //     }

    //     if (currentPair.length === 2 && isFlipped[0] !== isFlipped[1]) {
    //         setClick(click + 1);
    //         if (currentPair[0] === currentPair[1]) {
    //             setWinPairs(winPairs.concat(currentPair));
    //             setCurrentPair([]);
    //             setIsFlipped([]);
    //         } else {
    //             setCurrentPair([]);
    //             setTimeout(() => {
    //                 setIsFlipped([]);
    //             }, 500);
    //         }
    //     } else if (currentPair.length > 2) {
    //         setCurrentPair([]);
    //     } else if (isFlipped[0] === isFlipped[1]) {
    //         setCurrentPair([]);
    //     }
    // }, [isFlipped]);

    // useEffect(() => {Ê
    //     if (winPairs.length === Number(level)) {
    //         setIsModlaHide(false);
    //         timerStatus(false); // Arrete le Timer

    //         if (indexLevel !== -1) {
    //             setIsConfetti(false);
    //             setWinClickSentence(false);
    //             setWinTimeSentence(false);
    //             // La, on créer un "saveScore" temporaire en lui passant les nouvelle valeurs qui viennent d'être joué. Pour ensuite comparer saveScore et tempSaveScore
    //             const tempSaveScore: any[] = [...saveScore];

    //             if (click < saveScore[indexLevel].click) {
    //                 /*Ici, on dit a tempSaveScore -> à l'élement de indexLevel (ici 12) tu vas suprimer 1 element, et le remplacer par
    //                 l'objet tempSaveScore à l'indexLevel dont la valeur click cahnge pour le nouveau click (il changer automatiquement pour la nouvel clé "click").
    //                 */
    //                 tempSaveScore.splice(indexLevel, 1, { ...tempSaveScore[indexLevel], click: click });
    //                 setWinClickSentence(true);
    //             }
    //             if (seconds < saveScore[indexLevel].seconds) {
    //                 tempSaveScore.splice(indexLevel, 1, { ...tempSaveScore[indexLevel], seconds: seconds });
    //                 setWinTimeSentence(true);
    //             }
    //             if (click < saveScore[indexLevel].click || seconds < saveScore[indexLevel].seconds) {
    //                 setIsConfetti(true);
    //                 setSaveScore(tempSaveScore);
    //             }
    //         } else {
    //             setIsConfetti(true);
    //             setSaveScore([...saveScore, { level, click: click, seconds: seconds }]);
    //         }
    //     }
    // }, [winPairs]);

    // useEffect(() => {
    //     setIndexLevel(saveScore.findIndex((index) => index.level === level));
    // }, [reset]);
};

export default Main;
