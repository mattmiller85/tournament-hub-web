import React, { Component } from 'react';
import tournamentService from '../../services/tournamentService';
import { goBack } from 'react-router-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TeamEdit from '../../components/team-edit'

class GameEdit extends Component {
    constructor() {
        super();
        this.state = { tournament: null, game: null };

        this.handleInput = (e) => {
            const { game } = this.state;
            game[`${e.target.name}`] = e.target.value;
            this.setState({ game });
        };

        this.updateGame = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            let result = null;
            if (this.state.game.id && this.state.game.id !== '') {
                result = await tournamentService.saveGame(this.state.tournament.id, this.state.game);
            } else {
                result = await tournamentService.createGame(this.state.tournament.id, this.state.game);
            }

            if (result) {
                this.props.back();
            }
        };
    }

    async componentDidMount() {
        const { tournamentId, gameId } = this.props.match.params;
        if (!tournamentId) {
            return;
        }

        this.setState({ tournament: null })
        const tournament = await tournamentService.getTournament(tournamentId);
        if (!gameId || gameId === 'add') {
            const nextNumber = tournament.games.map(g => g.number).reduce((a, b) => Math.max(a, b)) + 1;
            this.setState({
                game: {
                    "gameDate": new Date(),
                    "id": "",
                    "location": "",
                    "number": nextNumber,
                    "progress": "not_started",
                    team1: { name: "", id: "", roster: [], color: "" },
                    team2: { name: "", id: "", roster: [], color: "" },
                    "winnerTeamId": "",
                    "bracketGroup": 1,
                    "round": 1
                },
                tournament
            });
        } else {
            this.setState({ game: tournament.games.find(g => g.id === gameId), tournament });
        }
    }

    render() {
        let { game } = this.state;
        if (!game) {
            return <div />;
        }

        return (
            <form onSubmit={async (e) => this.updateGame(e)}>
                <div className="form-group">
                    <label htmlFor="t-number">Number</label>
                    <input value={game.number} onChange={(e) => this.handleInput(e)} type="number" className="form-control" name="number" id="t-number" placeholder="Enter number" />
                </div>
                <div className="form-group">
                    <label htmlFor="t-location">Location</label>
                    <input value={game.location} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="location" id="t-location" placeholder="Enter location" />
                </div>
                <div className="form-progress">
                    <label htmlFor="t-progress">Progress</label>
                    <input value={game.progress} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="progress" id="t-progress" placeholder="Enter progress" />
                </div>
                <div className="form-group">
                    <label htmlFor="t-round">Round</label>
                    <input value={game.round} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="round" id="t-round" placeholder="Enter round" />
                </div>
                <div className="form-group">
                    <label htmlFor="t-gracketGroup">Bracket Group</label>
                    <input value={game.bracketGroup} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="bracketGroup" id="t-bracketGroup" placeholder="Enter bracket group" />
                </div>
                <div className="form-group">
                    <label>Team 1</label>
                    <TeamEdit team={game.team1} />
                </div>
                <div className="form-group">
                    <label>Team 2</label>
                    <TeamEdit team={game.team2} />
                </div>
                <button type="submit" className="btn btn-primary">Save!</button>
                <button type="button" onClick={(e) => this.props.back()} className="btn btn-light">Cancel</button>
            </form>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    back: () => goBack()
}, dispatch)

// const mapStateToProps = (state) => {
//     return { tournament: state.tournament.searchResults, tournamentList: state.tournament.tournamentList, isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
//   }

export default withRouter(connect(
    null,
    mapDispatchToProps
)(GameEdit))