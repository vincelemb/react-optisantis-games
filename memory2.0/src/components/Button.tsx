import React from 'react'

type ButtonProps = {
    label?: string;
    number?: number;
    activeClass?:string;
    onClick: (event) => void;
}


const Button: React.FC<ButtonProps> = (props: React.PropsWithChildren<ButtonProps>) =>{

    return(
        <button className={props.activeClass && props.activeClass +' _border-white _leading-normal _border-solid _border _bg-transparent _mx-xxs _rounded-md _shadow-none _p-xs'} onClick={props.onClick}>
            <span className="_block">{props.number && props.number }</span>    
            <span className="_block">{props.label && props.label}</span>    
            {props.children}
        </button>
    )
}

// _border-primary _text-primary _leading-normal _border-solid _border _bg-transparent _mx-xxs _rounded-small _shadow-none _py-xxs
export default Button