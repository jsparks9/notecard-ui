import { SyntheticEvent, useState } from "react";
import { Card } from "../dtos/card";
import ErrorMessage from "./ErrorMessage";

function PublicCard() {

    const [errorMsg, setErrorMsg] = useState<string>();
    const [memory, setMemory] = useState<number[]>([]);
    const [currentCards, setCurrentCards] = useState<Card[]>([]);
    const [displayCard, setDisplayCard] = useState<Card>();
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


    // function route1 (e: SyntheticEvent) { getDeck("1", e) }
    function route2 (e: SyntheticEvent) { getDeck("2", e) }
    function route3 (e: SyntheticEvent) { getDeck("3", e) }
    function route4 (e: SyntheticEvent) { getDeck("4", e) }
    function route5 (e: SyntheticEvent) { getDeck("5", e) }
    // function route6 (e: SyntheticEvent) { getDeck("6", e) }
    // function route7 (e: SyntheticEvent) { getDeck("7", e) }
    // function route8 (e: SyntheticEvent) { getDeck("8", e) }

    let getDeck = async (s: string, e: SyntheticEvent) => {
        try {
            let resp = await fetch('http://localhost:5000/notecard/deck/id/'+s);
            if (Math.floor(resp.status/100) !== 2) { // if that code is not a 200, 204, 2-whatever
                setErrorMsg("Could not validate provided credentials!"); 
                let data = await resp.json();
                setErrorMsg(data.message);

            } else { // this is ran if the response code is a 200, 204, 2-anything
                let data = await resp.json();
                processData(await data);
            }
        } catch(err) { // This will run in situations like the API was not running
            setErrorMsg("There was an error communicating with the API");
        } 
    } 

    function processData(data: any) {
        setErrorMsg('');
        setDisplayCard(undefined);
        setCurrentCards([]);
        setShowAns(false);
        setShowQ(false);
        setMemory([]);
        setCurrentCards(data as unknown as Card[]);
        getNextCard();
        setShowQ(true);
    }


    return ( 
        <>
            <div>
                {/* <button id="get1" onClick={route1}>Deck1</button> */}
                <button id="get2" onClick={route2}>Java</button>
                <button id="get3" onClick={route3}>SQL</button>
                <button id="get4" onClick={route4}>React</button>
                <button id="get5" onClick={route5}>HTML</button>
            </div>  
            { errorMsg ? // ternary op
                // <div>
                //     <p className="alert">{errorMsg}</p>
                // </div>
                <ErrorMessage errorMessage = {errorMsg}></ErrorMessage>
                : // if falsey
                <></>
            }
            <br/>
             <div id="q_control" onClick={getNextCard}>
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
        </> 
    )
}

export default PublicCard;
