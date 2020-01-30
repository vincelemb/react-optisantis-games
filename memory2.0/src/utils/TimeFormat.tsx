
import { useContext } from 'react';
import { TimerContext } from '../context/TimerContext';

export default function TimeFormat(seconds) {
    const { setSeconds, minutes, setMinutes } = useContext(TimerContext);
    void(seconds)
    let displaySeconds: any;
    let displayMinutes: any;

    displaySeconds = seconds < 10 ? '0' + seconds : seconds;
    displayMinutes = minutes === undefined ? '00' : minutes;
    displayMinutes = minutes < 10 ? '0' + minutes : minutes;
    if(displaySeconds > 59){
        setSeconds(0)
        displayMinutes = setMinutes(minutes + 1);
    }

    return (`${displayMinutes}:${displaySeconds}`)
}
