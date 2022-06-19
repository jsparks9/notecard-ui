export class User {
    id: number;
    role_id: number;
    username: string;
    fname: string;
    lname: string;
    password: string;

    constructor(id: number, rid: number, un: string, fn: string, ln: string, pw: string) {
        this.id = id;
        this.role_id = rid;
        this.username = un;
        this.fname = fn;
        this.lname = ln;
        this.password = pw;
    }
}