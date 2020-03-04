import React from 'react';

import { SoundOnSvg, SoundOffSvg } from './svg';
import Audio from './Audio';

type AudioButtonProps = {
    id: string;
    audioFile: string;
    isPlaying?: boolean | undefined;
    toggleMusic?: (event: any) => void;
};

const AudioButton: React.FC<AudioButtonProps> = (props: React.PropsWithChildren<AudioButtonProps>) => {
    return (
        <button
            className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none"
            onClick={props.toggleMusic && props.toggleMusic}>
            {props.isPlaying === false && <SoundOffSvg svgWidth="40"></SoundOffSvg>}
            {props.isPlaying === true && <SoundOnSvg svgWidth="40"></SoundOnSvg>}
            <Audio id={props.id} audioFile={props.audioFile}></Audio>
        </button>
    );
};

export default AudioButton;
