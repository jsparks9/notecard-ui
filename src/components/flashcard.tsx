import { SyntheticEvent, useEffect, useState } from "react";
import { Cards } from "../models/cards";
import ErrorMessage from "./ErrorMessage";

interface IFlashcardProps {
    currentSelection: string | undefined | null,
    setCurrentSelection: (nextSelection: string) => void
}

function Flashcard(props: IFlashcardProps) {
    
    const [errorMsg, setErrorMsg] = useState<string>();
    const [memory, setMemory] = useState<number[]>([]);
    const [currentCards, setCurrentCards] = useState<Cards[]>([]);
    const [displayCard, setDisplayCard] = useState<Cards>();
    const [showAns, setShowAns] = useState<boolean>();
    const [showQ, setShowQ] = useState<boolean>();

    // const deckOptions = [
    //     {label: 'Add selected to deck: ', value: "Deck Name"}
    // ]
    function getNextCard() {
        let max = currentCards.length - memory.length;
        let rnum = Math.floor(Math.random() * max);
        let i = 0;
        let final_rnum = rnum + 0;
        while (i <= final_rnum) { 
            memory.includes(i) && final_rnum++; // offset index 
            i++;
        } 
        console.log("There are "+currentCards.length+" cards in the deck");
        console.log("memory");
        console.log(memory);
        console.log("Selected: "+final_rnum);
        console.log(memory.includes(final_rnum));
        memory.push(final_rnum);
        (memory.length * 2 > currentCards.length) && memory.shift(); // memory is up to half of deck
        setShowAns(false);
        setDisplayCard(currentCards[final_rnum]);
    }

    function show() { setShowAns(true) }

    useEffect(() => {
        const fetchCards =async () => {
            setDisplayCard(undefined);
            getNextCard();
        function processData(data: any) {
            setErrorMsg('');
            setDisplayCard(undefined);
            setCurrentCards([]);
            setShowAns(false);
            setShowQ(false);
            setMemory([]);
            setCurrentCards(data as unknown as Cards[]);
            getNextCard();
            setShowQ(true);
        }
        let resp = await fetch('http://notecardapi-env.eba-psis3xqw.us-east-1.elasticbeanstalk.com/notecard/deck/id/'+props.currentSelection);
            if (Math.floor(resp.status/100) !== 2) { // if that code is not a 200, 204, 2-whatever
                setErrorMsg("Could not validate provided credentials!"); 
                let data = await resp.json();
                setErrorMsg(data.message);

            } else { // this is ran if the response code is a 200, 204, 2-anything
                let data = await resp.json();
                processData(await data);
            }}
        try { 
            fetchCards();
        } catch(err) { // This will run in situations like the API was not running
            setErrorMsg("There was an error communicating with the API");
        }
        }, []);

    return ( 
        <>
            <div className="card">
                { errorMsg ? // ternary op
                    // <div>
                    //     <p className="alert">{errorMsg}</p>
                    // </div>
                    <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                    : // if falsey
                    <></>
                }
                <br/>
                <div id="q_control" className="qControl" onClick={getNextCard}>
                    { (displayCard && showQ) ? <div  dangerouslySetInnerHTML={{__html: displayCard.html_q}}></div>
                            : <p id="question">Click me to display a question.</p>
                    }
                </div>
                <hr/>
                <div id="a_control" onClick={show}> 
                    { (displayCard && showAns) ? <div dangerouslySetInnerHTML={{__html: displayCard.html_a}}></div>
                    // displayCard.html_a
                            : <p id="question">Click me to display the answer</p>
                    }
                </div>
            </div>
        </> 
    )

}
export default Flashcard;