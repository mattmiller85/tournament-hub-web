
import React, { Component } from 'react';
import { Route, Switch, withRouter } from 'react-router'
import { NavLink, Link } from 'react-router-dom'
import { connect } from 'react-redux'

import Home from '../home'
import About from '../about'
import Account from '../account'
import Login from '../login'
import Logout from '../logout'
import Register from '../register'
import Confirm from '../confirm'


const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn }
}

//const PrivateRouteConnected = connect(mapStateToProps, null)(PrivateRoute);

class App extends Component { 
    hideNav(e) {
        //document.querySelector(".navbar-toggler").click();
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
                    <NavLink className="nav-link" activeClassName="active" to="/about" onClick={ this.hideNav }>About</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/account" onClick={ this.hideNav }>Account</NavLink>
                </li>
                <li className="nav-item">
                    <NavLink className="nav-link" activeClassName="active" to="/logout" onClick={ this.hideNav }>Logout</NavLink>
                </li>
                </ul>
                <form className="form-inline my-2 my-lg-0">
                <input className="form-control mr-sm-2" type="text" placeholder="Search" aria-label="Search" />
                <button className="btn btn-outline-success my-2 my-sm-0" type="submit">Search</button>
                </form>
            </div>
            </nav>
            <main role="main" className="container">
                <Switch>
                    <Route exact path="/" component={Home} />
                    <Route path="/login" component={Login} />                
                    <Route path="/logout" component={Logout} />
                    <Route path="/register" component={Register} />
                    <Route path="/confirm/:userid?" component={Confirm} />
                    <Route path="/about" component={About} />
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
