import React, { useState } from 'react';

import { Button, Card } from './components';
import './styles/tailwind.css';
import './styles/memory.scss';

const Main = () => {
    const fruitsLegumes = require.context('./assets/fruits_legumes', true, /\.png$/);
    const medical = require.context('./assets/medical', true, /\.png$/);
    const meteo = require.context('./assets/meteo', true, /\.png$/);
    const sommeil = require.context('./assets/sommeil', true, /\.png$/);
    const sport = require.context('./assets/sport', true, /\.png$/);

    const paths = [fruitsLegumes.keys(), medical.keys(), meteo.keys(), sommeil.keys(), sport.keys()];

    const fruitsLegumesImages = paths[0].map((path) => fruitsLegumes(path));
    const medicalImages = paths[1].map((path) => medical(path));
    const meteoImages = paths[2].map((path) => meteo(path));
    const sommeilImages = paths[3].map((path) => sommeil(path));
    const sportImages = paths[4].map((path) => sport(path));

    console.log(fruitsLegumesImages);

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
            <div>
                <img src={fruitsLegumesImages[2]} alt="pl" />;
                <img src={medicalImages[2]} alt="pl" />;
                <img src={meteoImages[2]} alt="pl" />;
                <img src={sommeilImages[2]} alt="pl" />;
                <img src={sportImages[2]} alt="pl" />;
            </div>
        </div>
    );
};

export default Main;
