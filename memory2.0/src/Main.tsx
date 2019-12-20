import React, { useState, useEffect } from 'react';


import memoryImages from './assets/images.json'
import { Button, Card, Timer } from './components';
import './styles/tailwind.css';
import './styles/memory.scss';

const Main = () => {
    

    let numbers = [12, 16, 20, 24, 26];
    let themes: string[] = ["fruits_legumes", "medical", "meteo", "sommeil", "sport"];

    // On type useState quand il y a deux types possible.
    // const [state, setState] = useState("0");
    const [numberCard, setNumberCard] = useState(numbers[0]);
    const [isFlipped, setIsFlipped] = useState(); 
    // const [isWin, setIsWin] = useState(false); 
    const [idCards, setIdCards] = useState<any>([]); 
    const [images, setImages] = useState<any>(themes[0]); 
    const [imagesArray, setImagesArray] = useState<any>(memoryImages.fruits_legumes); 

    const [currentPair, setCurrentPair] = useState<string[]>([]); 
    const [winPair, setWinPair] = useState<any[]>([]); 

    
    function toggleClass(index: number) {
        setNumberCard(numbers[index]);
        renderImg(imagesArray, numbers[index])
        console.log( )
    }

    function changetheme(index: number) {
        setImages(themes[index]);
        setImagesArray(memoryImages[themes[index]]);
        renderImg(imagesArray, numberCard)
    }
    
    function flipCard(index: number){
        setIsFlipped(index)

        return index;
    }

    function renderLevelBtns() {
        const Buttons: JSX.Element[] = [];
        numbers &&
            numbers.map((number, index) => {
                Buttons.push(
                    <Button
                        key={index}
                        label={'cartes'}
                        number={number}
                        activeClass={numberCard === numbers[index] ? '_bg-white _text-primary' : '_text-white'}
                        onClick={() => {
                            toggleClass(index);
                        }}
                    />
                );
            });
        return <div className="_flex _justify-center _px-md _py-sm _mr-sm _rounded-small">{Buttons}</div>;
    }

    function renderThemeBtns() {
        const ButtonsTheme: JSX.Element[] = [];
        themes &&
            themes.map((theme, index: any) => {
                ButtonsTheme.push(
                    <Button
                        key={index}
                        label={theme}
                        activeClass={images === themes[index] ? '_bg-white _text-primary' : '_text-white'}
                        onClick={() => {
                            changetheme(index);
                        }}
                    />
                );
            });
        return <div className="_flex _justify-center _px-md _py-sm _mr-sm _rounded-small">{ButtonsTheme}</div>;
    }

    /**
     * Permet de rendre  par categorie la moitié d'un nombre d'image définie.
     * @param categorie 
     * @param number 
     */
    function renderImg(categorie: any, number: number){
        const Img: JSX.Element[] = [];
        let urlArray:string[] = Object.values(categorie)
        for (let index = 0; index < number/2; index++) {
            Img.push(<img className="_h-full" src={urlArray[index]} key={"image-"+index} alt="ok"></img>)
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

    }, [numberCard, imagesArray])

    useEffect(() => {
        if(currentPair.length == 2){
            if (currentPair[0] === currentPair[1]) {
                setWinPair([...winPair, ...currentPair])
                setCurrentPair([])
                // setIsWin(true);
                
//             this.pair.forEach((pair) => {
//                 this._setAttributeCard(pair, 'disabled');
//                 pair.setAttribute('tabindex', '-1');
//                 pair.classList.add('_pointer-event-none')

//             });
                } else {
                    setCurrentPair([])
        //             setTimeout(() => {
        //                 cards.forEach((card) => {
        //                     this._setAttributeCard(card, 'hidden')
        //                 });
        //                 this.pair = [];

        //             }, 500);
                }
                
            }
    }, [currentPair])

    useEffect(() => {
        console.log("win! ", winPair)

        if (winPair.length === numberCard) {
            console.log("cest gagné")
            // this._winGame(this.timeNumber, this.clickNumber);
        }
        
    }, [winPair])

    function renderCards() {
        const Cards: JSX.Element[] = [];
        const Images: any = renderImg(imagesArray, numberCard);


        for (let i = 0; i < numberCard; i++)  {

            // Si au moment ou je click sur le bouton (call de flipCard(i) qui change isFlipped) c'est le meme chiffre que i, alors...
            Cards.push(
            <Card flipClass={ isFlipped === i ? "-isFlipped" : "_bg-white"} key={i} data-js-id={idCards[i]} 
            onClick={()=> { 
                flipCard(i)
                setCurrentPair([...currentPair, idCards[i].toString()]);
                checkCard(i)
            }}> 
                {Images[idCards[i]]}
            </Card>)
        };
        // console.log(currentPair)

        return (<div className="grid-card">{Cards}</div>)
    }

    function checkCard(index: number){
        // win
        console.log(isFlipped)
        console.log(index)

    }

    /**
     * Verifie la correspondance des valeurs des ids lorsque deux items sont selectionnés
     * @param {cards} length - Nombre d'éléments dans le tableau this.pair.
     * @param {Number} length - Nombre d'éléments dans le tableau this.pair.
     */
    // function checkPairs(length, cards) {
    //     if (length === 2) {
    //         // clickNumber++;
    //         // this.clickDisplay.textContent = this.clickNumber;

    //         if (currentPair[0] === currentPair[1]) {
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
        <div className="memory-bg">

            <div className="panel-container">
                <div className="_bg-darkenprimary _mr-md _rounded-small">
                    <h2 className="_text-center _text-white _m-none _pt-sm">Niveau de difficulté</h2>
                    {renderLevelBtns()}
                </div>
                <div className="_bg-darkenprimary _mr-md _rounded-small _mt-sm">
                    <h2 className="_text-center _text-white _m-none _pt-sm">Thème</h2>
                    {renderThemeBtns()}
                </div>
            </div>
            <div className="grid-container">{renderCards()}</div>
            <div className="grid-timer _py-md"><Timer/></div>
        </div>
    );
};

export default Main;