import React from "react";

import Path from '../consts'

import { SoundOnSvg, SoundOffSvg } from '../components/svg';

type AudioProps = {
    audioFile:string;
    isPlaying?:boolean;
    toggleMusic?:(event: any) => void;
}

const Audio:React.FC<AudioProps> = (props: React.PropsWithChildren<AudioProps>) => {
  return (
    <button className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none" onClick={props.toggleMusic && props.toggleMusic}>
      {props.isPlaying === false && (
        <SoundOffSvg svgWidth="40"></SoundOffSvg>
      )}
      {props.isPlaying === true && (
        <SoundOnSvg svgWidth="40"></SoundOnSvg>
      )}
      <audio src={`${Path.audioPath}${props.audioFile}`} id="audio"></audio>
    </button>
  );
}

export default Audio;
