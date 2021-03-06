import React, { Component } from 'react';
import tournamentService from '../../services/tournamentService';
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { push } from 'react-router-redux'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import GameInfo from '../../components/game-info'
import TeamInfo from '../../components/team-info'

class TournamentEdit extends Component {
  constructor() {
    super();
    this.state = { tournament: null };
    this.handleInput = (e) => {
      const { tournament } = this.state;
      tournament[`${e.target.name}`] = e.target.value;
      this.setState({ tournament });
    };
    this.updateTournament = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      const result = await tournamentService.saveTournament(this.state.tournament);
      this.props.goToBracket(result.id);
    };
    this.addGame = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.props.goToAddGame(this.state.tournament.id);
    };
    this.addTeam = async (e) => {
      e.preventDefault();
      e.stopPropagation();
      this.props.goToAddTeam(this.state.tournament.id);
    };
    this.removeTeam = async (e, teamId) => {
      e.preventDefault();
      e.stopPropagation();
      const { tournament } = this.state;
      tournament.teams = tournament.teams.filter(t => t.id !== teamId);
      this.setState({ tournament });
    };
  }

  async componentDidMount() {
    const { tournamentId } = this.props.match.params
    if (!tournamentId) {
      return;
    }
    this.setState({ tournament: null })
    this.setState({ tournament: await tournamentService.getTournament(tournamentId) });
  }

  render() {
    const { tournament } = this.state;
    if (!tournament) {
      return <div />
    }
    const games = tournament.games.sort((a, b) => a.number > b.number).map(g => (
      <Link key={g.id} to={`edit/game/${g.id}`} className="list-group-item list-group-item-action" >
        <GameInfo game={g} />
      </Link>
    ));

    const teams = (tournament.teams || []).sort((a, b) => a.name.localeCompare(b.name)).map(t => (
      <Link key={t.id} to={`edit/team/${t.id}`} className="list-group-item list-group-item-action" >
        <TeamInfo team={t} /> | <button onClick={ async (e) => this.removeTeam(e, t.id)} className="btn btn-danger btn-sm">remove</button>
      </Link>
    ));

    return (
      <form onSubmit={async (e) => this.updateTournament(e)}>
        <div className="form-group">
          <label htmlFor="t-name">Name</label>
          <input value={tournament.name} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="name" id="t-name" placeholder="Enter tournament name" />
        </div>
        <div className="form-group">
          <label htmlFor="t-type">Type</label>
          <input value={tournament.type} onChange={(e) => this.handleInput(e)} type="text" className="form-control" name="type" id="t-type" placeholder="Enter type" />
        </div>
        <div className="form-group">
          <label>Games</label>
          <div className="form-group">
            <button type="button" onClick={(e) => this.addGame(e)} className="btn btn-secondary">Add game</button>
          </div>
          <div className="list-group">
            {games}
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="t-teams">Teams</label>
          <div className="form-group">
            <button type="button" onClick={(e) => this.addTeam(e)} className="btn btn-secondary">Add team</button>
          </div>
          <div className="list-group">
            {teams}
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Save!</button>
        <button type="button" onClick={(e) => this.props.goToBracket(tournament.id)} className="btn btn-light">View Bracket</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  goToBracket: (tournamentId) => push(`/tournament/${tournamentId}`),
  goToAddGame: (tournamentId) => push(`/tournament/${tournamentId}/edit/game/add`),
  goToAddTeam: (tournamentId) => push(`/tournament/${tournamentId}/edit/team/add`),
}, dispatch)

// const mapStateToProps = (state) => {
//     return { tournament: state.tournament.searchResults, tournamentList: state.tournament.tournamentList, isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
//   }

export default withRouter(connect(
  null,
  mapDispatchToProps
)(TournamentEdit))