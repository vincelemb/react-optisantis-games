import React from 'react';

type PopupProps = {
    title: string;
    hidden: boolean;
};

const Popup: React.FC<PopupProps> = ({ hidden, title, children }) => {
    return (
        <div
            hidden={hidden}
            className={`${
                hidden ? '_none' : '_flex'
            } _flex-col _justify-center _items-center _absolute _w-3/5 _h-auto _z-10 _px-xs _py-xxs _rounded-small _bg-primary`}>
            <h2 className="_text-white _text-lg _mb-xxs">{title}</h2>
            {children}
        </div>
    );
};

export default Popup;
