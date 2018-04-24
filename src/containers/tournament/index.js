import React, { Component } from 'react';
import TournamentView from '../../components/tournament'
import tournamentService from '../../services/tournamentService';

export default class Tournament extends Component {
  constructor() {
    super();
    this.state = { loading: true, tournament: null };
  }

  async componentDidMount() {
    const { tournamentId } = this.props.match.params
    if (!tournamentId) {
      return;
    }
    this.setState({ loading: true, tournament: null })
    const tournament = await tournamentService.getTournament(tournamentId);
    if (!tournament)
      return;
    this.setState({ loading: false, tournament: tournament });
  }

  render() {
    const { tournament, loading } = this.state;
    if (loading) {
      return <p>Loading...</p>
    }
    if (!tournament) {
      return <p>Not found...</p>
    }
    return (
      <div>
        <TournamentView tournament={tournament} />
      </div>
    )
  }
}

// const mapStateToProps = (state) => {
//     return { searchResults: state.tournament.searchResults, tournamentList: state.tournament.tournamentList, isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
//   }

// export default withRouter(connect(
//   null,  
//   null
// )(Tournament))