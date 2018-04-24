//@ts-check

import cfg from '../../config'
import store from '../../store'
import TournamentHubService from '../tournamentHubService'

export default class AuthService extends TournamentHubService {

    constructor() {
        super();
        this.isAuthenticated = false;
        this.getUserInfo().then(info => { 
            this.isAuthenticated = info != null; 
            store.dispatch({ type: 'LOGIN_UPDATE', isLoggedIn: this.isAuthenticated, user: info });
        });
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
                'Authorization': this.getToken()
            }
        });
        return this.returnJSONFromResponseIfAuth(userInfoResponse);
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
            store.dispatch({ type: 'LOGIN_UPDATE', isLoggedIn: this.isAuthenticated, user: loginInfo.user });
        }
        return Promise.resolve(loginInfo);
    }

    async confirm(userid) {
        const confirmResponse = await fetch(`${cfg.apiUrl}auth/confirm/${userid}`);
        return confirmResponse.json();
    }
}
