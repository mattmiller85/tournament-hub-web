import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class TournamentList extends Component {

    componentDidMount() {

    }

    render() {
        const { tournamentList } = this.props;
        if (!tournamentList) {
            return <div />;
        }
        const items = tournamentList.map(t => <li key={t.id} className="list-group-item">
            <Link to={ `/tournament/${t.id}`}> {t.name} </Link>
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