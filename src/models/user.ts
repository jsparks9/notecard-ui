export class User {
    authUserId: number;
    authUserRole: string;
    authUsername: string;
    token: string;

    constructor(id: number, r: string, un: string, token: string) {
        this.authUserId = id;
        this.authUserRole = r;
        this.authUsername = un;
        this.token = token
    }
}