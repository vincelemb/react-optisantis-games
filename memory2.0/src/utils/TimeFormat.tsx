
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
        displayMinutes = setMinutes(1);
    }
    // displayValue = value === 60 ? '0' + value : value;

    return (`${displayMinutes}:${displaySeconds}`)
    // const [formatValue, setFormatValue] = useState<any>();
    // useEffect(() => {
    //     const correctValue = (value) => {
    //     };
    //     setFormatValue(correctValue);
    //     return;
    // }, [value]);
    // return { formatValue };
    // const {minutes, seconds} = useScoreTimer(timeActive, timerInterval)
    // let timerInterval: NodeJS.Timeout | undefined = undefined;
    // useEffect(() => {
    //     console.log(`coucou ca va ? ${seconds}:${minutes}`)
    // }, [seconds])
}
