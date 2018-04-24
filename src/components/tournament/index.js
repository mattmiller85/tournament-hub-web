import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import bracketRendererService from '../../services/bracketRendererService';

export default class Tournament extends Component {

    componentDidMount() {

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
            <canvas ref={ (el) => this.initialize(el, tournament)} width="500" height="500"></canvas>
        </div>;
    }
}