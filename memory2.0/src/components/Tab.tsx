import React from 'react'

type TabProps = {
    isActive?:boolean
    toogleTab?: (event: any) => void;
    // maxWidth:string;
    // isCentered?:boolean;
    // isCenteredX?:boolean;

}

const Tab:React.FC<TabProps> = (props: React.PropsWithChildren<TabProps>) => {

    // const numberTabCount = () => {
    //     const sections: JSX.Element[] = [];
    //     for (let index = 0; index < props.numberTab; index++) {
    //         sections.push(
    //             <section className="c-tab  _w-full _flex _justify-center">
    //                 {/* <span>Options</span> */}
    //             </section>
    //             // <section>{props.children}</section>
    //         )
    //     }
    //     return sections
    // }

    return(
        <nav className={`${props.isActive && props.isActive ? "_text-white _bg-primary" : ''} _text-primary _flex _justify-center _w-full _p-xxs`} onClick={props.toogleTab && props.toogleTab}>
            {props.children}
        </nav>
    )

}

export default Tab; 

{/* <!-- Navigation entre les panels sur mobile uniquement  --> */}
                {/* <nav className="c-tabs _hidden lg:_block  _w-full  _pb-sm">
                    <section className="c-tab  _w-full _flex _justify-center" data-tab-target="tab-1">
                        <span>Options</span>
                    </section>

                    <section className="c-tab  _w-full _flex _justify-center is-active" data-tab-target="tab-2">
                        <span>Jouer</span>
                    </section>
                </nav> */}