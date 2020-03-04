import React from 'react';
import { AudioButton } from '.';
import { PauseSvg, PlaySvg } from './svg';

type ClickButtonsGroup = {
    reset: () => any;
    pause: () => any;
    audio: () => any;
};

interface ButtonsGroupProps {
    play: boolean | undefined;
    onClick: ClickButtonsGroup;
    isPlaying: boolean | undefined;
    audioFile: string;
}

const ButtonsGroup: React.FC<ButtonsGroupProps> = ({ play, onClick, ...audioProps }) => (
    <div className="_mt-sm _mb-lg _w-full _flex _justify-center _items-center">
        <button
            className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none _flex _items-center _justify-center"
            onClick={onClick.reset}>
            <div className="_w-sm _h-sm _bg-warning"></div>
        </button>
        <button
            className="_bg-white _rounded-rounded _w-xxxl _h-xxxl _border-none _cursor-pointer _outline-none _mx-sm _p-none"
            onClick={onClick.pause}>
            <div className="_flex _items-center _justify-center">
                {play ? <PauseSvg svgWidth="25px"></PauseSvg> : <PlaySvg svgWidth="25px"></PlaySvg>}
            </div>
        </button>
        <AudioButton id={'music'} {...audioProps} toggleMusic={onClick.audio}></AudioButton>
    </div>
);

export default ButtonsGroup;
