import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import bracketRendererService from '../../services/bracketRendererService'
import tournamentService from '../../services/tournamentService'

export default class Tournament extends Component {

    constructor() {
        super();
        this.state = { needToSave: false };
    }
    componentDidMount() {
        bracketRendererService.on("teamAdvanced", () => {
            this.setState({ needToSave: true });
        });
    }

    async saveTournament() {
        const { tournament } = this.props;
        await tournamentService.saveTournament(tournament);
    }

    initialize(el, tournament) {
        if (!el || !tournament)
            return;
        //el.height = window.innerHeight - 200;
        el.width = window.innerWidth;
        window.addEventListener('resize', () => {
            el.width = window.innerWidth;
            //el.height = window.innerHeight - 200;
            bracketRendererService.buildBracket(el, tournament);
        }, false);
        bracketRendererService.buildBracket(el, tournament);
    }


    render() {
        const { tournament } = this.props;
        if (!tournament) {
            return <div />;
        }
        
        return <div>
            <h1>{ tournament.name }</h1>
            <Link className="btn btn-dark" to={ `/tournament/${tournament.id}/edit`}> edit </Link>
            <button className="btn btn-light" onClick={ async (e) => this.saveTournament() } disabled={ this.state.needToSave === false }> save </button>
            
            <canvas ref={ (el) => this.initialize(el, tournament)} width="500" height="500"></canvas>
        </div>;
    }
}