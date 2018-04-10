import React, { Component } from 'react'

export default class GameInfo extends Component {

    componentDidMount() {

    }

    render() {
        const { game } = this.props;
        if (!game) {
            return <div />;
        }
        return (
            <div>
                <span>Game #{game.number}, </span>
                <span>at {game.location}, </span>
                <span>{game.team1Description} vs {game.team2Description}</span>
            </div>
        )
    }
}