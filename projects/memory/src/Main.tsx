import React, { useState } from 'react';

import { Container, Tab, BgImage } from '@optisantis/outil-global/components';
import Options from './components/Options';
import Game from './components/Game';

const Main = () => {
    const [activeTab, setActiveTab] = useState<boolean>(false);

    return (
        <BgImage imageUrl={'./assets/img/lake.jpg'}>
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
