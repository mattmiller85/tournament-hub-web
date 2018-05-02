import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import tournamenService from '../../services/tournamentService';
import TournamentList from '../../components/tournament-list';

class Tournaments extends Component {
    
    async componentDidMount() {
        await tournamenService.getTournamentsForUser(); // this dispatches the USER_TOURNAMENT_LIST_ACTION action
    }

    render() {
        const { tournamentList, searchResults, isLoggedIn } = this.props;
        if (!isLoggedIn) {
            return (
                <div>
                    <p>Recent tournaments or something.</p>
                </div>
            );
        }
        let searchResultsDisplay = <div></div>;
        if (searchResults && searchResults.length > 0) {
            searchResultsDisplay = <div>
                <h1>Search Results</h1>
                <TournamentList tournamentList={ searchResults } isLoggedIn={ isLoggedIn } />
            </div>
        }
        return (
            <div>
                <h1>Your Tournaments</h1>
                <Link className="btn btn-success" to="/tournament/add">add</Link>
                <TournamentList tournamentList={ tournamentList } isLoggedIn={ isLoggedIn } />
                {searchResultsDisplay}
            </div>
        )
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  //changePage: () => push('/account')
}, dispatch)

const mapStateToProps = (state) => {
    return { searchResults: state.tournament.searchResults, tournamentList: state.tournament.tournamentList, isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
  }

export default withRouter(connect(
  mapStateToProps,  
  mapDispatchToProps
)(Tournaments))
