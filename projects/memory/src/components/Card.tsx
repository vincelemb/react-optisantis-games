import React from 'react';

type CardProps = {
    flipped?: boolean;
    found?: boolean;
    onClick?: (event: any) => void;
};

const Card: React.FC<CardProps> = ({ flipped, found, onClick, children }) => {
    return (
        <button
            className={`card _bg-white ${flipped ? '-isFlipped' : ''} ${found ? '-isWin' : ''}`}
            draggable={false}
            onClick={onClick && onClick}>
            {children}
        </button>
    );
};

export default Card;
