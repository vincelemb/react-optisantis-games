import React, { useState, useEffect } from 'react';


import memoryImages from './assets/images.json'
import { Button, Card, Timer } from './components';
import './styles/tailwind.css';
import './styles/memory.scss';

const Main = () => {
    

    let numbers = [12, 16, 20, 24, 26];

    // On type useState quand il y a deux types possible.
    // const [state, setState] = useState("0");
    const [numberCard, setNumberCard] = useState(numbers[0]);
    const [isFlipped, setIsFlipped] = useState(); 
    const [idCards, setIdCards] = useState<any>([]); 
    // const [arrayPair, setArrayPair] = useState<number[]>([]); 
    
    function toggleClass(index: number) {
        setNumberCard(numbers[index]);
    }
    
    function flipCard(index: number){
        setIsFlipped(index)
        return index;
    }

    // function addCard(index: number) {
    //     setArrayPair([...arrayPair, index])
    // }
    // console.log(arrayPair)

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

    /**
     * Permet de rendre  par categorie la moitié d'un nombre d'image définie.
     * @param categorie 
     * @param number 
     */
    function renderImg(categorie: any, number: number){
        const Img: JSX.Element[] = [];
        for (let index = 0; index < number/2; index++) {
            Img.push(<img className="_h-full" src={categorie[index].url} key={"image-"+categorie[index].id} alt="ok"></img>)
        }
        return (Img.slice(0, number/2))
    }

    /**
     * Permet de randomize la position des valeurs dans le tableau
     * @param {Array} array
     */
    function shuffle(array) {
        let counter = array.length;

        // While there are elements in the array
        while (counter > 0) {
            // Pick a random index
            let index = Math.floor(Math.random() * counter);

            // Decrease counter by 1
            counter--;

            // And swap the last element with it
            let temp = array[counter];
            array[counter] = array[index];
            array[index] = temp;
        }
        return array;
    }

    /**
     * UseEffect sert ici à obsever le changment de idCards, uniquement si il y a eu un changement au niveau de numberCard
     * Array d'ids en fonction du nombre de cards et shuffle 
     */
    useEffect(() => {
        setIdCards(idCards.length = 0);

        for (let i = 0; i < numberCard/2; i++)  {
            setIdCards(idCards.push(i))
        };

        setIdCards(idCards.push(...idCards))
        setIdCards(shuffle(idCards))
        setIdCards(idCards.toString().split(','))

    }, [numberCard])

    /**
     * 
     */
    function renderCards() {
        const Cards: JSX.Element[] = [];
        const Images = renderImg(memoryImages.fruits_legumes, numberCard)
        
        for (let i = 0; i < numberCard; i++)  {
            // Si au moment ou je click sur le bouton (call de flipCard(i) qui change isFlipped) c'est le meme chiffre que i, alors...
            Cards.push(
            <Card flipClass={ isFlipped === i ? "_bg-warning" : "_bg-primary"} key={i} id={idCards[i]} onClick={()=> { flipCard(i)}}> 
            {/* TO DO : ne retroune pas les bon element par rapport a l'ID voir pourquoi  */}
                {Images[idCards[i]]}
            </Card>)
        };

        return (<div>{Cards}</div>)
    }

    // /**
    //  * Verifie la correspondance des valeurs des ids lorsque deux items sont selectionnés
    //  * @param {cards} length - Nombre d'éléments dans le tableau this.pair.
    //  * @param {Number} length - Nombre d'éléments dans le tableau this.pair.
    //  */
    // function checkPairs(length, cards) {
    //     if (length === 2) {
    //         // clickNumber++;
    //         // this.clickDisplay.textContent = this.clickNumber;

    //         if (arrayPair[0] === arrayPair[1]) {
    //             this.pair.forEach((pair) => {
    //                 this._setAttributeCard(pair, 'disabled');
    //                 pair.setAttribute('tabindex', '-1');
    //                 pair.classList.add('_pointer-event-none')

    //             });
    //             this.checkWin.push(this.pair);

    //             if (this.checkWin.length === this.level / 2) {
    //                 this._winGame(this.timeNumber, this.clickNumber);
    //             }
    //             this.pair = [];
    //         } else {
    //             setTimeout(() => {
    //                 cards.forEach((card) => {
    //                     this._setAttributeCard(card, 'hidden')
    //                 });
    //                 this.pair = [];

    //             }, 500);
    //         }
    //     } else if (length > 2) {
    //         //Securité, pour ne pas a avoir plus de 2 cards dans le tableau "this.pair".
    //         cards.forEach((card) => {
    //             this._setAttributeCard(card, 'hidden')
    //         });
    //     }
    // }


    return (
        <div>
            <div>{renderBtns()}</div>
            <div>{renderCards()}</div>
            <div><Timer/></div>
        </div>
    );
};

export default Main;
