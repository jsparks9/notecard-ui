export class deckForDeckView {
    id: number;
    owner_id: number;
    deck_name: string;
    numOfCards: number;

    constructor(id: number, owner_id: number, deck_name: string, numOfCards: number) {
        this.id = id;
        this.owner_id = owner_id;
        this.deck_name = deck_name;
        this.numOfCards = numOfCards;
    }
}
