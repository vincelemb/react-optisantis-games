import React from 'react';

type ScoreProps = {
    cardNumber?: number;
    flipClass?: string | undefined;
    id?: string | undefined;
    onClick?: (event: any) => void;
};

const Score: React.FC<ScoreProps> = (props: React.PropsWithChildren<ScoreProps>) => {

    return (
        <button  className={props.flipClass && props.flipClass + " card"} draggable={false} id={props.id} onClick={props.onClick && props.onClick}>
            {props.children}
        </button>
    );
};

export default Score;
