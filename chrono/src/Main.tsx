//HOOKS
import React, { useState, useEffect, useContext } from 'react';

//COMPONENTS
import { CircleGrow, Container, Tab, BgImage, Modal } from '../../components';

//SVG COOMPONENTS
import { PlaySvg, PauseSvg, SoundOnSvg, InfoSvg } from '../../components/svg';

//TYPES
import chronoType from './type/chronoType';

//STYLE
import './styles/index.scss';
import '../../styles/index.scss';

//LOGICS
import useScoreTimer from './logics/useScoreTimer';

//UseContext
import { TimerContext } from './context/TimerContext';

const Main = () => {

    const [timeActive, setTimeActive] = useState<boolean>(false);
    const [isModlaHide, setIsModlaHide] = useState<boolean>(true);

    const chronoStep:chronoType = {
        stepSeconds : [4, 7, 8], 
        stepName : ["Inspirez" , "Retenez", "Expirez"], 
        stepColor : ["primary", "warning", "golden"]
    }
    
    let [step, setStep] = useState<number>(0)

    const { seconds } = useScoreTimer(timeActive);
    const { setSeconds } = useContext(TimerContext);

    // CHRONO
    const [activeTab, setActiveTab] = useState<boolean>(true);
    const [pannelLeft, setPannelLeft] = useState<boolean>(true);
    const [activeSubTab, setActiveSubTab] = useState<boolean>(true);
    const [subPannelLeft, setSubPannelLeft] = useState<boolean>(true);
    
    const [play, setPlay] = useState<boolean>(null)

    useEffect(() => {
        if(timeActive === true){
            if(seconds > chronoStep.stepSeconds[step]){
                setStep(step+1)
                setSeconds(1)
            }
            if(step === 2 && seconds > chronoStep.stepSeconds[step]){
                setStep(0)
                setSeconds(1)
            }
        } 
        else {
            setSeconds(1)
        }
        // console.log("seconds : ",seconds)
    }, [seconds] )

    
    useEffect(() => {
        // console.log("step : ",step)
    }, [step])

    function reset() {
        setPlay(null)
        setStep(0)
        setSeconds(1)
        setTimeActive(false)

    }

    return (
        <BgImage imageUrl={"./assets/img/lake.jpg"}>

        
        {/* <div className="memory-bg"> */}
            <div className="_rounded-small _border _border-solid _border-primary _mt-md _mx-sm _justify-around _hidden lg:_flex _cursor-pointer">
                <Tab
                    isActive={activeTab}
                    toogleTab={() => {
                        setPannelLeft(true);
                        return !activeTab ? setActiveTab(!activeTab) : null;
                    }}>
                    <span>Options</span>
                </Tab>
                <Tab
                    isActive={!activeTab}
                    toogleTab={() => {
                        setPannelLeft(false);
                        return activeTab ? setActiveTab(!activeTab) : null;
                    }}>
                    <span>Jouer</span>
                </Tab>
            </div>
            <Container maxWidth="991px" isCenteredX>
                <div className="_flex _px-sm">
                    {/* Options Panel */}
                    <section className={`_p-sm _bg-white _mr-md lg:_mr-none _my-xl _w-full ${pannelLeft ? '_block' : 'lg:_hidden '}`}>
                        <div className="_rounded-small _border _border-solid _border-primary _mt-md _mx-sm _justify-around _flex _cursor-pointer">
                            <Tab
                                isActive={activeSubTab}
                                toogleTab={() => {
                                    setSubPannelLeft(true);
                                    return !activeSubTab ? setActiveSubTab(!activeSubTab) : null;
                                }}>
                                <span>Options</span>
                            </Tab>
                            <Tab
                                isActive={!activeSubTab}
                                toogleTab={() => {
                                    setSubPannelLeft(false);
                                    return activeSubTab ? setActiveSubTab(!activeSubTab) : null;
                                }}>
                                <span>Jouer</span>
                            </Tab>
                        </div>
                        <section className={`_flex _flex-col _w-full ${subPannelLeft ? '_block' : '_hidden '} _items-center _relative _my-xl`}>
                            <ol>
                                <li>Fermez la bouche et inspirez tranquillement par le nez en comptant jusqu'à 4.</li>
                                <li>Retenez votre souffle en comptant jusqu'à 7.</li>
                                <li>Expirez bruyamment par la bouche en comptant jusqu'à 8 et en faisant le son "whoosh".</li>
                            </ol>
                            <h2>AVANT DE COMMENCER :</h2>
                            <p>Fermez les yeux et expirez tout l'air de vos poumons.<br></br>
                            Touchez votre palais du bout de la langue, juste derrière les incisives, et conservez cette position pendant l'exercice.</p>
                        </section>
                        <section className={`_flex _flex-col _w-full ${subPannelLeft === false ? '_block' : '_hidden'} _items-center _relative _my-xl`}>
                            <p>Cet exercice permet de diminuer le stress, et peut également vous aider à vous endormir. Idéalement, mettez-vous assis le dos bien droit, les pieds à plat au sol. Vous pouvez également pratiquer cet exercice debout, ou couché dans votre lit.</p>
                        </section>
                    </section>

                    {/* Game Panel */}
                    <section className={`_flex _flex-col _w-full ${
                            pannelLeft === false ? '_block' : 'lg:_hidden'
                        } _items-center _relative _my-xl`}>
                        {/* <div className="_flex _items-center _justify-center"> */}
                            {/* Popup Panel */}
                            <Modal title="Partie terminée" hideModal={false} isOverlay={true}>                               
                                <span className="_text-white">Début dans :</span>
                                <span className="_text-xxl _text-white _py-sm">timer</span>
                                <div className="_w-4/5 _bg-white _rounded-small _border-solid _border-2 _p-sm _border-white _flex" style={{backgroundColor:"rgba(255,255,255,.3)"}}>
                                    <div className="_mr-xs">
                                        <InfoSvg fillColor="#fff" svgWidth="20px" svgHeight="20px"></InfoSvg>
                                    </div>
                                    <span className="_text-white">Essayez de respirer par le ventre pendant cet exercice</span>

                                </div>
                            </Modal>
                            {/* Cards */}
                            <section className="_w-full _flex _justify-center _items-center">
                                <div className="_flex _flex-col">
                                    {play !== null && (
                                        <span className="_text-center _text-xl _text-white _w-full" role="status" aria-live="polite">{chronoStep.stepName[step]}</span>
                                    )}
                                    <div className="c-chrono-player _relative _flex _justify-center _items-center">
                                        <CircleGrow isPlaying={play} playingState={step} borderColor={chronoStep.stepColor[step]}></CircleGrow>
                                        {play !== null && (
                                            <span className="_text-center _text-xxl _text-primary _z-10">{seconds}</span>
                                        )}
                                        {play === null && (
                                            <span className="_text-lg _text-primary _p-xs _text-center _z-10" role="status" aria-live="polite">Cliquez sur lecture pour commencer</span>
                                        )}
                                    </div>
                                </div>
                            </section>
                            
                            <div className="_mt-sm _mb-lg _w-full _flex _justify-center _items-center">
                                <button className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none _flex _items-center _justify-center" onClick={() => {
                                        reset()
                                        }
                                    }>
                                    <div className="_w-sm _h-sm _bg-warning"></div>
                                </button>
                                <button className="_bg-white _rounded-rounded _w-xxxl _h-xxxl _border-none _cursor-pointer _outline-none _mx-sm _p-none" onClick={() => {
                                        // setPlay(!play)
                                        // setTimeActive(!timeActive)
                                        }
                                    }>
                                    {play === null &&(
                                        <div className="_ml-xxs _flex _items-center _justify-center">
                                            <PlaySvg svgWidth="25px"></PlaySvg>
                                        </div>
                                    )}
                                    {play === false &&(
                                        <div className="_ml-xxs _flex _items-center _justify-center">
                                            <PlaySvg svgWidth="25px"></PlaySvg>
                                        </div>
                                    )}
                                    {play === true &&(
                                        <div className="_flex _items-center _justify-center">
                                            <PauseSvg svgWidth="25px"></PauseSvg>
                                        </div>
                                    )}
                                </button>
                                <button className="_bg-white _rounded-rounded _w-xxl _h-xxl _border-none _p-xs _cursor-pointer _outline-none" onClick={() => reset()}>
                                    <SoundOnSvg svgWidth="40"></SoundOnSvg>
                                </button>
                            </div>
                    </section>
                </div>
            </Container>
        {/* </div> */}
        </BgImage>
    );
};

export default Main;
