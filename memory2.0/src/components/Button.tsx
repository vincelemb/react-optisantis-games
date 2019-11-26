import React, {useState} from 'react'

type ButtonProps = {
    label?: string;
    number?: number;
    state?:boolean;
}


const Button: React.FC<ButtonProps> = (props: React.PropsWithChildren<ButtonProps>) =>{

    const [active, setActive] = useState<string>('-primary');

    function toggleElement() {
        active === '-primary' ? setActive(" ") : setActive('-primary');
    }

    return(
        <button className={'c-btn ' + active } onClick={ toogleElement() }>
            <span className="_d-block">{props.number}</span>    
            <span className="_d-block">{props.label}</span>    
            {props.children}
        </button>
    )
}

export default Button