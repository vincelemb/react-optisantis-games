import React, { useState } from 'react';
import { Tab } from '.';

type SubContentType = {
    title?: string;
    content: string | React.ReactElement;
};

type TabsGroupContent = {
    title: string;
    subcontent: string | SubContentType[] | React.ReactElement;
};

interface TabsGroupProps {
    contents: TabsGroupContent[];
}

const TabsGroup: React.FC<TabsGroupProps> = ({ contents }) => {
    const [idActive, setIdActive] = useState<number>(0);

    const setActive = (idx: number): void => setIdActive(idx);

    const navigation = contents.map(({ title }, idx) => (
        <Tab key={idx} isActive={idActive === idx} borderBottomStyle={true} toogleTab={() => setActive(idx)}>
            <span className="_uppercase _text-center">{title}</span>
        </Tab>
    ));

    const content = contents.map(({ subcontent }, idx) => {
        let returnedContent = Array.isArray(subcontent)
            ? subcontent.map(({ title, content }, idx) => (
                  <React.Fragment key={idx}>
                      {title && <h3 className="_mb-none _mt-lg _text-primary _text-lg _font-normal">{title}</h3>}
                      {content}
                  </React.Fragment>
              ))
            : subcontent;

        return (
            <div key={idx} className={idActive === idx ? '_block' : '_hidden'}>
                {returnedContent}
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
                </section>
            </div>
        </aside>
    );
};

export default TabsGroup;
