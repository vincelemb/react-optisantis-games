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
    disableTabsGroup?: boolean;
    borderBottomStyle: boolean;
    isCard: boolean;
    contents: TabsGroupContent[];
}

const TabsGroup: React.FC<TabsGroupProps> = ({ disableTabsGroup, borderBottomStyle, isCard, contents }) => {
    const [idActive, setIdActive] = useState<number>(0);

    const setActive = (idx: number): void => setIdActive(idx);

    const navigation = contents.map(({ title }, idx) => (
        <Tab
            key={idx}
            isActive={idActive === idx}
            borderBottomStyle={borderBottomStyle}
            toogleTab={() => setActive(idx)}>
            <span className="_uppercase _text-center">{title}</span>
        </Tab>
    ));

    const content = contents.map(({ subcontent }, idx) => {
        let returnedContent = Array.isArray(subcontent)
            ? subcontent.map(({ title, content }, idx) => (
                  <React.Fragment key={idx}>
                      {title && <h3 className="_mb-none _mt-sm _text-primary _text-lg _font-normal">{title}</h3>}
                      {content}
                  </React.Fragment>
              ))
            : subcontent;

        switch (disableTabsGroup) {
            case true:
                return (
                    <div key={idx} className={'_block lg:_hidden'}>
                        {subcontent}
                    </div>
                );
            case false:
                return (
                    <div key={idx} className={`${idActive === idx ? '_block' : '_hidden'}`}>
                        {returnedContent}
                    </div>
                );
            default:
                return (
                    <div key={idx} className={`${idActive === idx ? '_block' : '_hidden'}`}>
                        {returnedContent}
                    </div>
                );
        }
    });

    const background = isCard ? '_bg-white _rounded-small' : '_bg-transparent';

    const tabStyle = () => {
        switch (isCard) {
            case true:
                return <ul className="_justify-around _flex _cursor-pointer _p-sm _m-none">{navigation}</ul>;
            case false:
                return (
                    <div className="_rounded-small _border _border-solid _border-primary _mt-md _mx-sm _justify-around _hidden lg:_flex _cursor-pointer">
                        {navigation}
                    </div>
                );
            default:
                return <ul className="_justify-around _flex _cursor-pointer _p-sm _m-none">{navigation}</ul>;
        }
    };

    return (
        <section className={`${background} _my-xl _w-full `}>
            <nav className={`${disableTabsGroup ? 'lg:_block _hidden' : '_block'} `}>{tabStyle()}</nav>
            <div className="_p-sm">
                <section className="_flex _w-full _justify-center ">{content}</section>
            </div>
        </section>
    );
};

export default TabsGroup;
