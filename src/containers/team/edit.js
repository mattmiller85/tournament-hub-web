import React, { Component } from 'react';
import tournamentService from '../../services/tournamentService';
import { goBack, push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import TeamEdit from '../../components/team-edit'

class EditTeam extends Component {
    constructor() {
        super();
        this.state = { tournament: null, team: null };

        this.handleInput = (e) => {
            const { team } = this.state;
            team[`${e.target.name}`] = e.target.value;
            this.setState({ team });
        };

        this.updateGame = async (e) => {
            e.preventDefault();
            e.stopPropagation();
            let result = null;
            if (this.state.team.id && this.state.team.id !== '') {
                result = await tournamentService.saveTeam(this.state.tournament.id, this.state.team);
            } else {
                result = await tournamentService.createTeam(this.state.tournament.id, this.state.team);
            }

            if (result) {
                this.props.back();
            }
        };
    }

    async componentDidMount() {
        debugger;
        const { tournamentId, teamId } = this.props.match.params;
        if (!tournamentId) {
            return;
        }

        this.setState({ tournament: null });
        const tournament = await tournamentService.getTournament(tournamentId);
        if (!teamId || teamId === 'add') {
            this.setState({
                team: {
                    "id": "",
                    "name": "",
                    "color": "",
                    "roster": []
                },
                tournament
            });
        } else {
            this.setState({ team: tournament.teams.find(t => t.id === teamId), tournament });
        }
    }

    async save(e, addAnother) {
        let { team, tournament} = this.state;
        tournament.teams = tournament.teams || [];
        if (!team.id || team.id === '') {
            tournament.teams.push(team);
        }
        await tournamentService.saveTournament(tournament);
        if (addAnother) {
            this.setState({
                team: {
                    "id": "",
                    "name": "",
                    "color": "",
                    "roster": []
                }});
            this.props.addAnother();
            return;
        }
        this.props.back();
    }

    cancel(e) {
        this.props.back();
    }

    render() {
        let { team, tournament} = this.state;
        if (!team) {
            return <div />;
        }
        const addNavButtons = (<div>
            <button onClick={async (e) => this.save(e, false)} className="btn btn-success">Save team to { tournament.name }</button>
            <br />
        </div>)

        return (<div>
            <TeamEdit team={ team } />
            <br />
            { addNavButtons }
            <button onClick={(e) => this.cancel(e)} className="btn btn-light">Back</button>
        </div>)
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
    back: () => goBack(),
    addAnother: () => push("add")
}, dispatch)

// const mapStateToProps = (state) => {
//     return { tournament: state.tournament.searchResults, tournamentList: state.tournament.tournamentList, isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
//   }

export default withRouter(connect(
    null,
    mapDispatchToProps
)(EditTeam))