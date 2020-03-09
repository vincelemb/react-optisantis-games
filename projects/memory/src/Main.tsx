import React, { useState, useContext } from 'react';
import { Container, Tab, BgImage } from '@optisantis/outil-global/components';
import { GameContext } from './contexts/GameContext';
import Options from './components/Options';
import Game from './components/Game';
import Confettis from './components/Confettis';

const Main = () => {
    const [activeTab, setActiveTab] = useState<boolean>(true);
    const { isDone } = useContext(GameContext);

    return (
        <BgImage imageUrl={'./assets/img/lake.jpg'}>
            {isDone && <Confettis />}

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
                    <Options hidden={activeTab} />
                    <Game hidden={!activeTab} />
                </div>
            </Container>
        </BgImage>
    );
};

export default Main;
