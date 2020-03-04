import React from 'react';

type TabProps = {
    isActive?: boolean;
    toogleTab?: (event: any) => void;
    borderBottomStyle?: boolean;
};

const Tab: React.FC<TabProps> = (props: React.PropsWithChildren<TabProps>) => {
    const borderBottomStyle =
        props.borderBottomStyle && props.borderBottomStyle
            ? '_border-0 _text-primary _border-b-2 _border-solid _border-primary'
            : '_text-white _bg-primary';

    return (
        <li
            className={`${
                props.isActive && props.isActive ? borderBottomStyle : ''
            } _text-primary _flex _justify-center _w-full _p-xxs`}
            onClick={props.toogleTab && props.toogleTab}>
            {props.children}
        </li>
    );
};

export default Tab;
