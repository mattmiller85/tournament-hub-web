//@ts-check

import cfg from '../config'
import store from '../store'
import TournamentHubService from './tournamentHubService'

class TournamentService  extends TournamentHubService {

    async getTournamentsForUser() {
        const tournamentResponse = await fetch(`${cfg.apiUrl}tournament`, {
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'x-access-token': this.getToken()
            }
        });
        const list = await this.returnJSONFromResponseIfAuth(tournamentResponse);
        store.dispatch({ type: 'USER_TOURNAMENT_LIST_ACTION', tournamentList: list.tournaments });
        return Promise.resolve(list.tournaments); // array of tournaments
    }

    // Searches public tournaments
    async search(searchString) {
        // const tournamentResponse = await fetch(`${cfg.apiUrl}tournament`, {
        //     headers: {
        //         'user-agent': 'TournamentHub Web',
        //         'content-type': 'application/json',
        //         'x-access-token': this.getToken()
        //     }
        // });
        // const list = await tournamentResponse.json();
        const tempList = [{ id: "dfads", name: "testing here for now"}];
        store.dispatch({ type: 'TOURNAMENT_SEARCH_RESULTS', searchResults: tempList });
        return Promise.resolve(tempList); // array of tournaments
    }

    async getTournament(tournamentId) {
        const tournamentResponse = await fetch(`${cfg.apiUrl}tournament/${tournamentId}`, {
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'x-access-token': this.getToken()
            }
        });
        return this.returnJSONFromResponseIfAuth(tournamentResponse);
    }
}

const tournamenService = new TournamentService();
export default tournamenService;