import React, { useState } from 'react'

import { Button } from './components'
import './styles/tailwind.css'

const Main = () =>{

    let numbers = [12, 16, 20, 24, 26];

    const [state, setState] = useState<boolean | undefined>(false);

    function toggleClass(event: any){
        console.log(event.currentTarget);
        setState(!state);
    }

    return(
        <div>
            {numbers && numbers.map((number, index) => {
                return <Button key={index} label={'cartes'} number={number} activeClass={'test'} onClick={(event) => toggleClass(event)} />
            })}
        </div>
    )
}

export default Main