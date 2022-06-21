export class Cards {
    id: number;
    html_q: string;
    html_a: string;



    constructor(id: number, question: string, answer: string) {
        this.id = id;
        this.html_q = question;
        this.html_a = answer;
    }
}
