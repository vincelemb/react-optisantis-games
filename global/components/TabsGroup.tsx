import React, { useState, useEffect } from 'react';
import { Tab } from '.';

type TabsGroupContent = {
    title: string;
    content: string | React.Element | array;
    active: boolean;
};

interface TabsGroupProps {
    contents: TabsGroupContent[];
}

const TabsGroup: React.FC<TabsGroupProps> = ({ contents }) => {
    const [idActive, setIdActive] = useState<number>(0);

    const setActive = (idx: number): void => setIdActive(idx);

    const navigation = contents.map(({ title, active }, idx) => (
        <Tab key={idx} isActive={idActive === idx} borderBottomStyle={true} toogleTab={() => setActive(idx)}>
            <span className="_uppercase _text-center">{title}</span>
        </Tab>
    ));

    const content = contents.map(({ content, active }, idx) => {
        return (
            <div key={idx} className={idActive === idx ? '_block' : 'lg:_hidden'}>
                {content}
            </div>
        );
    });

    return (
        <aside className={`_bg-white _my-xl _h-full _w-full _rounded-small`}>
            <nav>
                <ul className="_justify-around _flex _cursor-pointer _p-sm _m-none">{navigation}</ul>
            </nav>
            <div className="_p-sm">
                <section className="_flex _flex-col _w-full _relative">
                    {content}
                    {/* <h3 className="_mb-none _mt-lg _text-primary _text-lg _font-normal">AVANT DE COMMENCER :</h3>
                    <p className="_mt-none">
                        Fermez les yeux et expirez tout l'air de vos poumons. Touchez votre palais du bout de la langue,
                        juste derrière les incisives, et conservez cette position pendant l'exercice.
                    </p> */}
                </section>
            </div>
        </aside>
    );
};

export default TabsGroup;
