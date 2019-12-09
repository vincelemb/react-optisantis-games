import React, { useState } from 'react';

import { Button, Card } from './components';
import './styles/tailwind.css';
import './styles/memory.scss';

const Main = () => {
    let numbers = [12, 16, 20, 24, 26];

    // On type useState quand il y a deux types possible.
    // const [state, setState] = useState("0");
    const [numberCard, setNumberCard] = useState(numbers[0]);

    function toggleClass(index: number) {
        setNumberCard(numbers[index]);
    }

    function renderBtns() {
        const Buttons: JSX.Element[] = [];
        numbers &&
            numbers.map((number, index) => {
                Buttons.push(
                    <Button
                        key={index}
                        label={'cartes'}
                        number={number}
                        activeClass={numberCard === numbers[index] ? '_bg-primary _text-nearwhite' : ''}
                        onClick={() => {
                            toggleClass(index);
                        }}
                    />
                );
            });
        return <div>{Buttons}</div>;
    }

    function renderCards() {
        const Cards: JSX.Element[] = [];
        for (let i = 0; i < numberCard; i++) Cards.push(<Card key={i} />);

        return <div>{Cards}</div>;
    }

    return (
        <div>
            <div>{renderBtns()}</div>
            <div>{renderCards()}</div>
        </div>
    );
};

export default Main;
