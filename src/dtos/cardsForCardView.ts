export class cardsForCardView {
    id: number;
    
    html_q: string;
    html_a: string;

    constructor(id: number, card_q: string, card_a: string) {
        this.id = id;
        
        this.html_q = card_q;
        this.html_a = card_a;
    }
}