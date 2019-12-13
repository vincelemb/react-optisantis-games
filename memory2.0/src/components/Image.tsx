import React, {useState} from 'react'

import memoryImages from '../assets/images.json'

type ImageProps = {
    imageCategorie: number;
    imageNumber: number;
}

const Image: React.FC<ImageProps>  = (props: ImageProps) =>{
console.log(memoryImages.fruits_legumes[0].url)

        const fruitsLegumes = require.context('', true, /\.png$/);
        const medical = require.context('', true, /\.png$/);
        const meteo = require.context('', true, /\.png$/);
        const sommeil = require.context('', true, /\.png$/);
        const sport = require.context('', true, /\.png$/);
    
        const paths = [fruitsLegumes.keys(), medical.keys(), meteo.keys(), sommeil.keys(), sport.keys()];
    
        const fruitsLegumesImages = paths[0].map((path) => fruitsLegumes(path));
        const medicalImages = paths[1].map((path) => medical(path));
        const meteoImages = paths[2].map((path) => meteo(path));
        const sommeilImages = paths[3].map((path) => sommeil(path));
        const sportImages = paths[4].map((path) => sport(path));

        const [imageCat, setImageCat] = useState<any[]>([fruitsLegumesImages, medicalImages, meteoImages, sommeilImages, sportImages]); 

        void setImageCat;

        // const fruitsLegume = ["avocado", "banana"]

        // fruitsLegume.map(fruit => `http://localhost:3000/path/${fruit}.png`)

        function renderImg(categorie: number, number: number){
            const Img: JSX.Element[] = [];
            imageCat[categorie].forEach((image: any, index: number) => {
                
                Img.push(<img className="_h-full" src={image} key={"image"+index} alt="ok"></img>)

                // console.log(Img.slice(0, number));
            })
            return (Img.slice(0, number))
        }

        return(
            <React.Fragment>
                {renderImg(props.imageCategorie, props.imageNumber)} 
            </React.Fragment>
        );
    }

export default Image ;