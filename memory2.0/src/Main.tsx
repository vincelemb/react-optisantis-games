import React, { useState } from 'react'

import { Button } from './components'
import './styles/tailwind.css'

const Main = () =>{

    let numbers = [12, 16, 20, 24, 26];

    // On type useState quand il y a deux types possible.
    const [state, setState] = useState("0");

    function toggleClass(index: number){
        setState(index.toString());
    }

    return(
        <div>
            {numbers && numbers.map((number, index) => {
                return <Button key={index} label={'cartes'} number={number} activeClass={ state === index.toString() ? "_bg-primary _text-nearwhite" : "" } onClick={() => toggleClass(index)} />
            })}
        </div>
    )
}

export default Main