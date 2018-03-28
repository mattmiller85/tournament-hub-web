import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Account extends Component {
    
    render() {
        const { isLoggedIn, user } = this.props;
        if (!isLoggedIn) {
            return (
                <div>
                    <h1>Account Details</h1>
                    <div><Link className="btn btn-primary" to="/login">Login</Link></div>
                </div>
            );
        }
        return (
            <div>
                <h1>Account Details</h1>
                <p>Welcome to TournamentHub, { user.name }!</p>
            </div>
        );
    }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/account')
}, dispatch)

const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
  }

export default withRouter(connect(
  mapStateToProps,  
  mapDispatchToProps
)(Account))