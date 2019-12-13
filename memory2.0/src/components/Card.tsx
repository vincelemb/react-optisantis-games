import React from 'react';

type CardProps = {
    // label?: string;
    cardNumber?: number;
    flipClass?: string;
    id?: string | undefined;
    onClick?: (event) => void;
    // activeClass:string;
};

const Card: React.FC<CardProps> = (props: React.PropsWithChildren<CardProps>) => {

    return (
        <button  className={props.flipClass && props.flipClass+" card"} id={props.id} onClick={props.onClick && props.onClick}>
            {/* <img className="_block"></img>     */}
            {props.children}
        </button>
    );
};

// _border-primary _text-primary _leading-normal _border-solid _border _bg-transparent _mx-xxs _rounded-small _shadow-none _py-xxs
export default Card;
