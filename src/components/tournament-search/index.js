import React, { Component } from 'react'
import tournamentService from '../../services/tournamentService';

export default class TournamentSearch extends Component {

    constructor() {
        super();
        
        this.search = async (e) => {
            e.preventDefault();
            const { searchString } = this.state;
            tournamentService.search(searchString);
        }

        this.handleInput = (e) => {
            const state = {};
            state[`${e.target.name}`] = e.target.value;
            this.setState(state);
        };
    }


    render() {
        return (
            <form onSubmit={async (e) => this.search(e)} className="form-inline my-2 my-lg-0">
                <input onChange={ (e) => this.handleInput(e) } name="searchString" className="form-control mr-sm-2" type="text" placeholder="Search Tournaments" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
            </form>
        )
    }
}