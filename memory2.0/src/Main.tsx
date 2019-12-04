import React from 'react'

import { Button } from './components'
import './styles/tailwind.css'

// type MainType = {
//     name: string;
//     id: number;
// }



const Main = () =>{

    let numbers = [12, 16, 20, 24, 26];

    // const [users, setUsers] = useState<MainType[] | null>(null);

    // fetch('https://jsonplaceholder.typicode.com/users')
    // .then(response => response.json())
    // .then(json => {
    //     setUsers(json)
    // })

    // return(
    //     <div>
    //         {users && users.map((u, index) => {
    //             return <Button label={u.name} number={u.id} key={index}/>
    //         })}
    //     </div>
    // )
    return(
        <div>
            {numbers && numbers.map(number => {
                return <Button label={'cartes'} number={number}/>
            })}
        </div>
    )
}

export default Main