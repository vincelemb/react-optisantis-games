import React from 'react';

type ConfettiProps = {
    confettiClass?: string | undefined;
    id?: string | undefined;
};

const Confetti: React.FC<ConfettiProps> = (
    props: React.PropsWithChildren<ConfettiProps>
) => {
    return (
        <div
            className={props.confettiClass && props.confettiClass + ' _fixed'}
            id={props.id}>
            {props.children}
        </div>
    );
};

export default Confetti;
