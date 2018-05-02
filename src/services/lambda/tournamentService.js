//@ts-check

import cfg from '../../config'
import store from '../../store'
import TournamentHubService from '../tournamentHubService'

export default class TournamentService  extends TournamentHubService {

    async getTournamentsForUser() {
        const tournamentResponse = await fetch(`${cfg.apiUrl}tournament`, {
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'Authorization': this.getToken()
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
        //         'Authorization': this.getToken()
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
                'Authorization': this.getToken()
            }
        });
        return this.returnJSONFromResponseIfAuth(tournamentResponse);
    }

    async getTemplate(templateId) {
        const tournamentResponse = await fetch(`${cfg.apiUrl}tournament/template/${templateId}`, {
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'Authorization': this.getToken()
            }
        });
        return this.returnJSONFromResponseIfAuth(tournamentResponse);
    }

    async createTournament(tournament) {
        const response = await fetch(`${cfg.apiUrl}tournament`, {
            method: 'POST',
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify(tournament)
          });

        store.dispatch({ type: `TOURNAMENT_ADDED`, tournament  });
        return this.returnJSONFromResponseIfAuth(response);
    }

    async saveTournament(tournament) {
        const response = await fetch(`${cfg.apiUrl}tournament/${tournament.id}`, {
            method: 'PUT',
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify(tournament)
          });

        store.dispatch({ type: `TOURNAMENT_UPDATED`, tournament })
        return this.returnJSONFromResponseIfAuth(response);
    }

    async createGame(tournamentId, game) {
        const response = await fetch(`${cfg.apiUrl}tournament/${tournamentId}/game/add`, {
            method: 'POST',
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify(game)
          });
        game = await this.returnJSONFromResponseIfAuth(response);
        store.dispatch({ type: `GAME_ADDED`, tournamentId: tournamentId, game })
        return Promise.resolve(game);
    }

    async saveGame(tournamentId, game) {
        const response = await fetch(`${cfg.apiUrl}tournament/${tournamentId}/game/save`, {
            method: 'PUT',
            headers: {
                'user-agent': 'TournamentHub Web',
                'content-type': 'application/json',
                'Authorization': this.getToken()
            },
            body: JSON.stringify(game)
          });

        store.dispatch({ type: `GAME_UPDATED`, tournamentId: tournamentId, game })
        return this.returnJSONFromResponseIfAuth(response);
    }
}