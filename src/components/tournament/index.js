import React, { Component } from 'react'
import GameBracket from '../game-bracket'
import { Link } from 'react-router-dom'

export default class Tournament extends Component {

    componentDidMount() {

    }

    render() {
        const { tournament } = this.props;
        if (!tournament) {
            return <div />;
        }
        
        const groups = tournament.games.map(g => g.bracketGroup).filter((value, index, self) => {
            return self.indexOf(value) === index;
        });
        const brackets = groups.map(g => {
            const games = tournament.games.filter(game => game.bracketGroup === g);
            const roundGames = {};
            tournament.games.map(g => g.round).filter((value, index, self) => {
                return self.indexOf(value) === index;
            }).map(r => {
                return roundGames[r.toString()] = games.filter(game => game.round === r);
            });
            return {
                group: g,
                gamesByRound: roundGames
            }
        });
        return <div>
                <h1>{tournament.name}</h1>
                <Link to={ `/tournament/${tournament.id}/edit`}> edit </Link>
                {brackets.map(bracket => {
                    return (<div key={bracket.group}>
                        <h2>Group {bracket.group}</h2>
                        <div>
                            {Object.entries(bracket.gamesByRound).map(r => {
                                const gameData = bracket.gamesByRound[r[0]];
                                if (!gameData)
                                    return <div>{r[0]}</div>;
                                const games = gameData.sort((a, b) => a.number > b.number).map(g => <GameBracket key={g.id} game={g} round={r[0]} />);
                                return (
                                    <div style={ { display: 'inline-block', verticalAlign: 'top' } } key={r[0]}>
                                        <h3>Round {r[0]}</h3>                                
                                        {games}
                                    </div>
                                )
                            })}
                        </div>
                        </div>) 
                })}
            </div>;
    }
}