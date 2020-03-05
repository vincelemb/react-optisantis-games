import React from 'react';

type ButtonProps = {
    activeClass?: string;
    onClick: (event) => void;
};

const Button: React.FC<ButtonProps> = ({ children, activeClass, onClick }: React.PropsWithChildren<ButtonProps>) => (
    <button
        className={
            activeClass &&
            activeClass +
                ' _cursor-pointer _outline-none _leading-normal _border-solid _border _bg-transparent _m-xxs _rounded-md _shadow-none _p-sm'
        }
        onClick={onClick}>
        {children}
    </button>
);

export default Button;
