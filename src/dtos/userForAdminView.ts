export class UserForAdminView {
    id: number;
    role: string;
    username: string;
    fname: string;
    lname: string;

    constructor(id: number, r: string, un: string, fn: string, ln: string) {
        this.id = id;
        this.role = r;
        this.username = un;
        this.fname = fn;
        this.lname = ln;
    }
}
