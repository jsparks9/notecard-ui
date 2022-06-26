import { Card } from "./card";

export class Deck {

    deck_id: number;
    deckname: string;
    cards: Card[];


    constructor(deckId: number, deckName: string, cards: Card[]) {
        this.deck_id = deckId;
        this.deckname = deckName;
        this.cards = cards;
    }


}