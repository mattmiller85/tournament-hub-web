import config from '../config';
import AwsTournamentService from './lambda/tournamentService';
import ExpressTournamentService from './express/tournamentService';

let tournamentService = null;

if (config.aws) {
    tournamentService = new AwsTournamentService();
} else {
    tournamentService = new ExpressTournamentService();
}

export default tournamentService;