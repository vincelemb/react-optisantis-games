import React, { useState, useEffect } from 'react';

// type TimerProps = {
    // hours: number;
    // minutes: number;
    // seconds?: number;0.

    // onClick?: (event) => void;
// };


const Timer: React.FC = () => {
    const [seconds, setSeconds] = useState(0);
    const [isActive, setIsActive] = useState(false);
    var interval: any;
    
      function toggle() {
        setIsActive(!isActive);
      }
    
      function reset() {
        setSeconds(0);
        setIsActive(false);
      }
    
      useEffect(() => {
        if (isActive) {
            interval = setInterval(() => {
            setSeconds(seconds => seconds + 1);
        }, 1000);
        } else if (!isActive && seconds !== 0) {
            clearInterval(interval);
        }
        return () => clearInterval(interval);
      }, [isActive, seconds]);
    return (
    // <span>{props.hours+props.minutes+':'+props.seconds}</span>
    <div>
        <span>{seconds}</span>
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>{isActive ? 'Pause' : 'Start'}</button>
        <button className="button" onClick={reset}>Reset</button>

    </div>
    );
};

// _border-primary _text-primary _leading-normal _border-solid _border _bg-transparent _mx-xxs _rounded-small _shadow-none _py-xxs
export default Timer;
