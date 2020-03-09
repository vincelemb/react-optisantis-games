import React from 'react';

type CardProps = {
    clicked?: boolean;
    found?: boolean;
    onClick?: (event: any) => void;
    img: string;
};

const Card: React.FC<CardProps> = ({ clicked, found, onClick, img }) => {
    return (
        <button
            className={`card _bg-white ${clicked ? '-isFlipped' : ''} ${found ? '-isWin' : ''}`}
            draggable={false}
            disabled={clicked || found}
            onClick={onClick}>
            <img src={img}></img>
        </button>
    );
};

export default Card;
