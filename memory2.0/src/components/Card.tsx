import React from 'react';

type CardProps = {
    flipClass?: string | undefined;
    id?: string | undefined;
    onClick?: (event: any) => void;
};



const Card: React.FC<CardProps> = (props: React.PropsWithChildren<CardProps>) => {

    return (
        <button className={props.flipClass && props.flipClass + " card"}  draggable={false} id={props.id && props.id} onClick={props.onClick && props.onClick}>
            {props.children}
        </button>
    );
};

export default Card;
