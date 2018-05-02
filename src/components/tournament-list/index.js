import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import tournamentService from '../../services/tournamentService'

export default class TournamentList extends Component {

    componentDidMount() {

    }

    async removeTournament(e, tournamentId) {
        e.preventDefault();
        await tournamentService.removeTournament(tournamentId);
    }

    render() {
        const { tournamentList } = this.props;
        if (!tournamentList) {
            return <div />;
        }
        const items = tournamentList.map(t => <li key={t.id} className="list-group-item">
            <Link to={ `/tournament/${t.id}`}> {t.name} </Link> | <button onClick={ async (e) => this.removeTournament(e, t.id)} className="btn btn-danger btn-sm">remove</button>
        </li>);
        return (
            <div>
                <ul className="list-group">
                    {items}
                </ul>
            </div>
        )
    }
}