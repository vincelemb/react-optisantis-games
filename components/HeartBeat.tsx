import React from 'react'

import { HeartSvg, HeartShapeSvg } from './svg';

type HeartBeatProps = {
    isPlaying?: boolean;
    playingStep?: number;
    borderColor?: string;
    activeClass?:string;
    playingState?:string;
}


const HeartBeat: React.FC<HeartBeatProps> = (props: React.PropsWithChildren<HeartBeatProps>) =>{

    const animatedClass = props.isPlaying === true || props.isPlaying === false ?  'is-animated' : '';
    
    return(
        <React.Fragment>
                <HeartShapeSvg customSvgClass="_absolute" svgHeight="100%" svgWidth="100%" ></HeartShapeSvg>
                <HeartSvg svgAnimationState={props.playingState && props.playingState} customSvgClass={`_absolute ${animatedClass}`} svgHeight="100%" svgWidth="100%"></HeartSvg>
            {/* <div className={`box-circle _absolute _bg-white _rounded-circle _flex _items-center _justify-center ${animatedClass}${animatedStep}`}
            style={{animationPlayState : `${props.playingState}`}}></div>
            <div className={`circle-overlay _absolute _rounded-circle _border-${props.borderColor && props.borderColor} _border-3 _border-solid`}></div> */}
        </React.Fragment>
    )
}

export default HeartBeat;