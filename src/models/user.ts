export class User {
    authUserId: number;
    authUserRole: string;
    authUsername: string;

    constructor(id: number, r: string, un: string) {
        this.authUserId = id;
        this.authUserRole = r;
        this.authUsername = un;
    }
}