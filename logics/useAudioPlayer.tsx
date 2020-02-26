import { useEffect, useState } from 'react';

export default function useAudioPlayer() {
    const [audioPlaying, setAudioPlaying] = useState(false);
    const [resetAudio, setResetAudio] = useState(false);

    const [musicPlaying, setMusicPlaying] = useState(false);
    const [resetMusic, setResetMusic] = useState(false);

    useEffect(() => {
        const audio: HTMLMediaElement & any = document.getElementById('audio');

        const music: HTMLMediaElement & any = document.getElementById('music');

        //Music
        if(music){
            musicPlaying ? music.play() : music.pause();
            if (resetMusic) {
                music.pause();
                music.currentTime = 0;
            }
        }

        //Audio
        if(audio){
            if (audioPlaying) audio.play();
            else {
                audio.pause();
                audio.currentTime = 0;
            }
            if (resetAudio) {
                audio.pause();
                audio.currentTime = 0;
            }
        }

    }, [audioPlaying, musicPlaying]);

    return { audioPlaying, setAudioPlaying, setResetAudio, musicPlaying, setMusicPlaying, setResetMusic};
}
