import { Cards } from "./cards";

export class Decks {

    deck_id: number;
    owner_id: number;
    deckname: string;
    cards: Cards[];


    constructor(deckId: number, ownerId: number, deckName: string, cards: Cards[]) {
        this.deck_id = deckId;
        this.owner_id = ownerId;
        this.deckname = deckName;
        this.cards = cards;
    }


}