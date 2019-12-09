import React from 'react';

type CardProps = {
    // label?: string;
    cardNumber?: number;
    // activeClass:string;
    // onClick: (event) => void;
};

const Card: React.FC<CardProps> = (props: React.PropsWithChildren<CardProps>) => {
    return (
        <button className="card _bg-primary">
            {/* <img className="_block"></img>     */}
            {props.children}
        </button>
    );
};

// _border-primary _text-primary _leading-normal _border-solid _border _bg-transparent _mx-xxs _rounded-small _shadow-none _py-xxs
export default Card;
