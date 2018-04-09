import React, { Component } from 'react'

export default class Game extends Component {

    componentDidMount() {

    }

    render() {
        const { game } = this.props;
        if (!game) {
            return <div />;
        }
        return (
            <div>
                <div>At {game.location}</div>
                <div>Number {game.number}</div>
                <div>{game.team1Description} vs {game.team2Description}</div>
            </div>
        )
    }
}