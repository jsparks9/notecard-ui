import { Cards } from "./cards";

export class Decks {

    deckId: number;
    ownerId: number;
    deckName: string;
    cards: Cards[];


    constructor(deckId: number, ownerId: number, deckName: string, cards: Cards[]) {
        this.deckId = deckId;
        this.ownerId = ownerId;
        this.deckName = deckName;
        this.cards = cards;
    }


}