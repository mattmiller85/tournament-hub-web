
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../home'
import Tournaments from '../tournaments'
import Tournament from '../tournament'
import TournamentEdit from '../tournament/edit'
import Account from '../account'
import Login from '../login'
import Logout from '../logout'
import Register from '../register'
import Confirm from '../confirm'
import TournamentSearch from '../../components/tournament-search'

const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn }
}

class App extends Component { 
    hideNav(e) {
        
    }

    render() { return (
        <div>
            <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
            <Link className="navbar-brand" to="/">TournamentHub</Link>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarsTournamentHub" aria-controls="navbarsTournamentHub" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarsTournamentHub">
                <ul className="navbar-nav mr-auto">
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/" onClick={ this.hideNav }>Home</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/tournaments" onClick={ this.hideNav }>Tournaments</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/account" onClick={ this.hideNav }>Account</NavLink>
                </li>
                </ul>
                <TournamentSearch />
            </div>
            </nav>
            <main role="main" className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />                
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/confirm/:userid?" component={Confirm} />
                    <Route path="/tournaments" component={Tournaments} />
                    <Route path="/tournament/:tournamentId/edit" component={TournamentEdit} />
                    <Route path="/tournament/:tournamentId" component={Tournament} />
                    <Route path="/account" component={Account} />
                </Switch>
            </main>
        </div>
        )
    }
}

export default withRouter(connect(
    mapStateToProps,  
    null
)(App))
