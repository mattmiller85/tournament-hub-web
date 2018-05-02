import React, { Component } from 'react';
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import tournamentService from '../../services/tournamentService';

class TournamentAdd extends Component {
  constructor() {
    super();
    this.state = { loading: true, templateId: '8_team_single_elimination' };
  }

  async componentDidMount() {
    this.setState({ loading: false });
  }

  async addTournament() {
    this.setState({ loading: true });
    const template = await tournamentService.getTemplate(this.state.templateId);
    const created = await tournamentService.createTournament(template);
    this.setState({ loading: false });
    this.props.changePage(`/tournament/${created.id}`);
  }

  setTemplateId(e) {
    this.setState({ templateId: e.target.value });
  }

  render() {
    const {loading } = this.state;
    if (loading) {
      return <p>Loading...</p>
    }

    return (
      <div>
        <select onClick={ (e) => this.setTemplateId(e) }>
          <option value="8_team_single_elimination">8 team single elimination</option>
          <option value="4_team_single_elimination">4 team single elimination</option>
        </select>
        <button className="btn btn-success" onClick={ async (e) => this.addTournament() }>add</button>
      </div>
    )
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: (route) => push(route)
}, dispatch)

// const mapStateToProps = (state) => {
//     return { searchResults: state.tournament.searchResults, tournamentList: state.tournament.tournamentList, isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
//   }

export default withRouter(connect(
  null,  
  mapDispatchToProps
)(TournamentAdd))