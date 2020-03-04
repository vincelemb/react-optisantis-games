import React, { useState, useEffect } from 'react';
import { Tab } from '.';

type TabsGroupContent = {
    title: string;
    content: string | React.FC;
    active: boolean;
};

interface TabsGroupProps {
    contents: TabsGroupContent[];
}

const TabsGroup: React.FC<TabsGroupProps> = ({ contents }) => {
    // return (
    //     <aside className={`_bg-white _my-xl _h-full _w-full _rounded-small ${pannelLeft ? '_block' : 'lg:_hidden '}`}>
    //         <div className="_p-sm">
    //             {subPannelLeft === true && (
    //                 <section className="_flex _flex-col _w-full _relative">
    //                     <ol className="_m-none _list-none _p-none">
    //                         <li className="_flex _p-sm">
    //                             <span
    //                                 className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${chronoStep.stepColor[0]}`}>
    //                                 1
    //                             </span>
    //                             <p className="_m-none">
    //                                 Fermez la bouche et inspirez tranquillement par le nez en comptant jusqu'à 4.
    //                             </p>
    //                         </li>
    //                         <li className="_flex _p-sm">
    //                             <span
    //                                 className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${chronoStep.stepColor[1]}`}>
    //                                 2
    //                             </span>
    //                             <p className="_m-none">Retenez votre souffle en comptant jusqu'à 7.</p>{' '}
    //                         </li>
    //                         <li className="_flex _p-sm">
    //                             <span
    //                                 className={`_mr-sm _w-lg _rounded-rounded _text-white _leading-loose _text-center _min-w-lg _max-h-lg _bg-${chronoStep.stepColor[2]}`}>
    //                                 3
    //                             </span>
    //                             <p className="_m-none">
    //                                 Expirez bruyamment par la bouche en comptant jusqu'à 8 et en faisant le son
    //                                 "whoosh".
    //                             </p>
    //                         </li>
    //                     </ol>
    //                     <h3 className="_mb-none _mt-lg _text-primary _text-lg _font-normal">AVANT DE COMMENCER :</h3>
    //                     <p className="_mt-none">
    //                         Fermez les yeux et expirez tout l'air de vos poumons. Touchez votre palais du bout de la
    //                         langue, juste derrière les incisives, et conservez cette position pendant l'exercice.
    //                     </p>
    //                 </section>
    //             )}
    //         </div>
    // );

    const [idActive, setIdActive] = useState<number>(0);

    const setActive = (idx: number): void => setIdActive(idx);

    const navigation = contents.map(({ title, active }, idx) => (
        <Tab key={idx} isActive={idActive === idx} borderBottomStyle={true} toogleTab={() => setActive(idx)}>
            <span className="_uppercase _text-center">{title}</span>
        </Tab>
    ));

    const content = contents.map(({ content, active }, idx) => {
        return <div className={idActive === idx ? '_block' : 'lg:_hidden'}>{content}</div>;
    });

    return (
        <aside className={`_bg-white _my-xl _h-full _w-full _rounded-small`}>
            <nav>
                <ul className="_justify-around _flex _cursor-pointer _p-sm _m-none">{navigation}</ul>
            </nav>
            <div className="_p-sm">
                {content}
            </div>
        </aside>
    );
};

export default TabsGroup;
