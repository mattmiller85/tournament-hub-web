//@ts-check

import cfg from '../config'
import store from '../store';

class AuthService {

    constructor() {
        this.isAuthenticated = false;
        this.getUserInfo().then(info => { 
            this.isAuthenticated = info != null; 
            store.dispatch({ type: 'LOGIN_UPDATE', isLoggedIn: this.isAuthenticated, user: info });
        });
    }

    getToken() {
        return localStorage.getItem("tournament-hub-token");
    }

    async getUserInfo() {
        const token = this.getToken();
        if (!token || token === '') {
            return Promise.resolve(null);
        }
        const userInfoResponse = await fetch(`${cfg.apiUrl}auth/me`, {
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'x-access-token': this.getToken()
            }
        });
        return userInfoResponse.json();
    }

    async register(user) {
        const registerResponse = await fetch(`${cfg.apiUrl}auth/register`, {
            method: 'POST',
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json'
            },
            body: JSON.stringify(user)
          });
        return registerResponse.json();
    }

    async logout() {
        localStorage.removeItem("tournament-hub-token");
        store.dispatch({ type: 'LOGIN_UPDATE', isLoggedIn: false, user: null });
    }

    /**
     * 
     * @param {{ username: string, password: string }} credentials
     */
    async login(credentials) {
        const loginResponse = await fetch(`${cfg.apiUrl}auth/login`, {
            method: 'POST',
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json'
            },
            body: JSON.stringify(credentials)
          });
        /** @type { {auth: boolean, token: string, user: any}} }  */
        const loginInfo = await loginResponse.json();        
        if (loginInfo.auth) {
            localStorage.setItem("tournament-hub-token", loginInfo.token);
            this.isAuthenticated = true;
            debugger;
            store.dispatch({ type: 'LOGIN_UPDATE', loggedIn: this.isAuthenticated, user: loginInfo.user });
        }
        return Promise.resolve(loginInfo);
    }

    async confirm(userid) {
        const confirmResponse = await fetch(`${cfg.apiUrl}auth/confirm/${userid}`);
        return confirmResponse.json();
    }
}
const authService = new AuthService();
export default authService;