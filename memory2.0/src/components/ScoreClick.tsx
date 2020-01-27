import React, { useState, useEffect } from 'react';
import memoryStar from '../assets/memory/star.svg'

type ScoreClickProps = {
    onClick?: (event: any) => void;
    count: number | string;
    isIcon?: boolean;
    iconPosition?: string;
};


const ScoreClick: React.FC<ScoreClickProps> = (props: React.PropsWithChildren<ScoreClickProps>) => {
    
    // console.log(memoryStar)
    const [positionIcon, setPositionIcon] = useState<string>()

    useEffect(() => {
        switch (props.iconPosition) {
            case "right":
                setPositionIcon('_flex-row-reverse')
                break;
            default:
                break;
        }
    }, [positionIcon])
    
    return (
        <div className={`${positionIcon} _flex _px-xs _py-xxs _bg-golden _rounded-rounded`} onClick={props.onClick && props.onClick}>
            {props.isIcon && (
            <div className="_items-center _flex">
                <img src={memoryStar} className="_h-full _w-sm _mr-xs" alt=""/>
            </div>
            )}
            <div className="_text-center _text-darkengolden">
                {props.count}
            </div>
        </div>
    );
};

export default ScoreClick;
