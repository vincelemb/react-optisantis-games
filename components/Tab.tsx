import React from 'react'

type TabProps = {
    isActive?:boolean
    toogleTab?: (event: any) => void;
}

const Tab:React.FC<TabProps> = (props: React.PropsWithChildren<TabProps>) => {

    return(
        <nav className={`${props.isActive && props.isActive ? "_text-white _bg-primary" : ''} _text-primary _flex _justify-center _w-full _p-xxs`} onClick={props.toogleTab && props.toogleTab}>
            {props.children}
        </nav>
    )

}

export default Tab; 