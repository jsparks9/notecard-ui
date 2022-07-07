import { SyntheticEvent, useEffect, useState } from "react";
import { Cards } from "../models/cards";

interface IFlashcardProps {
    currentSelection: string | undefined | null,
    setCurrentSelection: (nextSelection: string) => void
}

function Flashcard(props: IFlashcardProps) {
    
    let cardQ: string[];
    cardQ = [];
    let cardA: string[];
    cardA = []
    const [cards, setCards] = useState([] as Cards[]);
    

    useEffect(() => {
        console.log('the dashboard component was rendered');
        //TODO: Change to post and use IFlashcardProps to receive which deck to render
        fetch('http://localhost:5001/notecard/card/all') // GET by default
            .then(resp => resp.json())  // return keyword is implicit
            .then(data => setCards(data as unknown as Cards[]));

            return () => {
                console.log('the dashboard component was derendered');
            }
        }, []);
   
    for (let index = 0; index <= cards.length -1; index++) {
        cardQ[index] = cards[index].html_q;
        cardA[index] = cards[index].html_a;    
        
    }
    
    function randomNum(max: number) {
        return Math.floor(Math.random() * max) + 1;
    }

    let semiRandom = randomNum(cards.length-1);

    

    return (

        <>
            <div className="img-container">
                <div className="frame">
                    <img src="https://i.imgur.com/rPzLwnI.png" />
                </div>
                <div className="card">
                    <p>{cardQ[semiRandom]}</p>
                    <p>{cardA[semiRandom]}</p>
                </div>
            </div>
            
        </>


    )
}

export default Flashcard;