export class cardsForCardView {
    id: number;
    creator_id: number;
    card_q: string;
    card_a: string;

    constructor(id: number, creator_id: number, card_q: string, card_a: string) {
        this.id = id;
        this.creator_id = creator_id;
        this.card_q = card_q;
        this.card_a = card_a;
    }
}