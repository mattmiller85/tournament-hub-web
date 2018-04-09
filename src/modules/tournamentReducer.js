//@ts-check
const initialTournamentState = { tournamentList: [], searchResults: [] };

export default (previousState, action) => {
    switch(action.type) {
        case 'USER_TOURNAMENT_LIST_ACTION':
            return { ...previousState, tournamentList: action.tournamentList };
        case 'TOURNAMENT_SEARCH_RESULTS':
            return { ...previousState, searchResults: action.searchResults };
        default:
            return previousState || initialTournamentState;
    }
}
