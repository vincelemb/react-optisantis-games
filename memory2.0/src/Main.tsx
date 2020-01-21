import React, { useState, useEffect } from 'react';


import memoryImages from './assets/images.json'
import { Button, Card, Timer, Confetti, Score} from './components';
import './styles/tailwind.css';
import './styles/memory.scss';
import './styles/confetti.scss';

const Main = () => {

    //TO DO : FAIRE LA FONCTIONNALITE RECCORD
    void(Score)
    

    let numbers = [12, 16, 20, 24, 28];
    let themes: string[] = ["fruits_legumes", "medical", "meteo", "sommeil", "sport"];

    // On type useState quand il y a deux types possible.
    const [numberCard, setNumberCard] = useState<number>(numbers[0]);
    const [isFlipped, setIsFlipped] = useState<number[]>([]); 
    const [winPairs, setWinPairs] = useState<any[]>([]); 
    const [idCards, setIdCards] = useState<any>([]); 
    const [images, setImages] = useState<any>(themes[0]); 
    const [imagesArray, setImagesArray] = useState<any>(memoryImages.fruits_legumes); 
    const [currentPair, setCurrentPair] = useState<string[]>([]); 

    const Cards: JSX.Element[] = [];

    
    function toggleClass(index: number) {
        setNumberCard(numbers[index]);
        renderImg(imagesArray, numbers[index])
    }

    function changetheme(index: number) {
        setImages(themes[index]);
        setImagesArray(memoryImages[themes[index]]);
        renderImg(imagesArray, numberCard)
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
                        activeClass={numberCard === numbers[index] ? '_bg-primary _text-white' : '_text-primary _border-primary'}
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
                        activeClass={images === themes[index] ? '_bg-white _text-primary' : '_text-white _border-white'}
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

    /**
     * Check la concordance des deux cards selectionnées
     */
    useEffect(() => {
        if(isFlipped.length > 2){
            setIsFlipped([])
        }

        if(currentPair.length === 2 && isFlipped[0] != isFlipped[1]){
            if (currentPair[0] === currentPair[1]) {
                setWinPairs(winPairs.concat(currentPair))
                setCurrentPair([])
                setIsFlipped([])
                
            } else {
                setCurrentPair([])
                setTimeout(() => {
                    setIsFlipped([])
                }, 500);
            }
        }
        else if(currentPair.length > 2 ){
            setCurrentPair([])
        } 
        else if (isFlipped[0] === isFlipped[1]){
            setCurrentPair([])
        }
    }, [isFlipped])

    /**
     * Animation confetti lors du remplissage de la victoire de l'utilisateur
     */
    function renderConfetti() {
        const Confettis: JSX.Element[] = [];
        let i = 300;

        if(winPairs.length === numberCard){
            console.log("oui")
            while (i > -1) {
                Confettis.push(<Confetti confettiClass={"confetti-"+i} key={i}></Confetti>)
                i--;
            }
            
        }
        return (<React.Fragment>{Confettis}</React.Fragment>)
    }

    function activeClass(index){
        let string:string
        string = isFlipped.includes(index) ? "-isFlipped" : winPairs.includes(idCards[index]) ? "-isWin" : "_bg-white"
        return string;
    }

    
    const renderCards = () => {
        const Images: any = renderImg(imagesArray, numberCard);

        for (let i = 0; i < numberCard; i++)  {

            // Si au moment ou je click sur le bouton (call de flipCard(i) qui change isFlipped) c'est le meme chiffre que i, alors...
            Cards.push(
            <Card flipClass={activeClass(i)} key={i} data-js-id={idCards[i]} 
            onClick={()=> {
                setIsFlipped([...isFlipped, i])
                setCurrentPair([...currentPair, idCards[i].toString()]);
            }}> 
                {Images[idCards[i]]}
            </Card>)
        };
        return (<div className="grid-card">{Cards}</div>)
    }

    return (
        <div className="memory-bg">
            {renderConfetti()}
            <div className="memory-panel">
                <div className="panel-container">
                    <div className="_bg-darkenprimary _mr-md _rounded-small ">
                        <h2 className="_text-center _text-white _m-none _pt-sm">Thème</h2>
                        {renderThemeBtns()}
                    </div>
                    <div className="_bg-white _mr-md _rounded-small _mt-sm">
                        <h2 className="_text-center _text-primary _m-none _pt-sm">Niveau de difficulté</h2>
                        {renderLevelBtns()}
                    </div>
                    
                </div>
                <div className="grid-container">{renderCards()}</div>
                <div className="grid-timer _py-md"><Timer/></div>
            </div>
        </div>
    );
};

export default Main;