import React from 'react';

type CardProps = {
    flipClass?: string;
    onClick?: (event: any) => void;
};



const Card: React.FC<CardProps> = (props: React.PropsWithChildren<CardProps>) => {

    return (
        <button className={props.flipClass && props.flipClass + " card"}  draggable={false} onClick={props.onClick && props.onClick}>
            {props.children}
        </button>
    );
};

export default Card;
