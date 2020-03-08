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
    const [activeTab, setActiveTab] = useState<boolean>(false);

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
                <Tab isActive={activeTab} toogleTab={() => setActiveTab(true)}>
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
};

export default Main;
