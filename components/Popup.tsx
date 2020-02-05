import React from 'react';

type PopupProps = {
    onClick?: (event: any) => void;
    count?: number | string;
    isIcon?: boolean;
    iconPosition?: string;
    title?: string;
    bgColor?: string;
    displayPopup: boolean;
};

const Popup: React.FC<PopupProps> = (props: React.PropsWithChildren<PopupProps>) => {
    return (
        <div
            hidden={props.displayPopup}
            className={`${
                props.displayPopup ? '_none' : '_flex'
            } _flex-col _justify-center _items-center _absolute _w-3/5 _h-auto _z-10 _px-xs _py-xxs _rounded-small ${
                props.bgColor && props.bgColor ? props.bgColor : '_bg-primary'
            }`}
            onClick={props.onClick && props.onClick}>
            {props.title && <h2 className="_text-white _text-lg _mb-xxs">{props.title}</h2>}
            {props.children}
        </div>
    );
};

export default Popup;
