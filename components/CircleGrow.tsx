import React from 'react'

type CircleGrowProps = {
    isPlaying?: boolean;
    playingState?: number;
    borderColor?: string;
    // {seconds}
    activeClass?:string;
    // onClick: (event) => void;
}


const CircleGrow: React.FC<CircleGrowProps> = (props: React.PropsWithChildren<CircleGrowProps>) =>{

    const animatedClass = props.isPlaying === true || props.isPlaying === false ?  'is-animated' : '';
    const animatedStep = props.playingState && props.playingState === 2 ? props.playingState + ' is-played' : props.playingState 
    // style={!props.isPlaying === "is-animated" ? {animationPlayState : 'running'} : {animationPlayState : 'paused'}}
    return(
        <React.Fragment>
            <div className={`box-circle _absolute _bg-white _rounded-circle _flex _items-center _justify-center ${animatedClass}${animatedStep}`}
            style={props.isPlaying === true ? {animationPlayState : 'running'} : {animationPlayState : 'paused'}}></div>
            <div className={`circle-overlay _absolute _rounded-circle _border-${props.borderColor && props.borderColor} _border-3 _border-solid`}></div>
        </React.Fragment>
    )
}

export default CircleGrow