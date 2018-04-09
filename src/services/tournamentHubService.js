
import store from '../store'

export default class TournamentHubService {
    getToken() {
        return localStorage.getItem("tournament-hub-token");
    }

    logout() {
        localStorage.removeItem("tournament-hub-token");
        store.dispatch({ type: 'LOGIN_UPDATE', isLoggedIn: false, user: null });
    }

    returnJSONFromResponseIfAuth(fetchResponse) {
        return fetchResponse.json().then(info => {
            if (info.auth === false) {
                this.logout();
                return Promise.resolve({});
            }
            return Promise.resolve(info);
        });
    }
}