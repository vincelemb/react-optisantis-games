import { useEffect, useState } from 'react';

export default function useAudioPlayer() {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [resetAudio, setResetAudio] = useState(false);

    useEffect(() => {
        const audio:HTMLMediaElement & any  = document.getElementById("audio");
        audioPlaying ? audio.play() : audio.pause();

        if(resetAudio === true){
            audio.currentTime = 0 
        }
    });
    
    return { audioPlaying, setAudioPlaying, resetAudio, setResetAudio};
}