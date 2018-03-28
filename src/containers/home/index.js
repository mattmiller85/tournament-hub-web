import React, { Component } from 'react'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Home extends Component {
    
    render() {
        const { isLoggedIn } = this.props;
        return (
            <div>
                <h1>TournamentHub</h1>
                <p>Welcome to TournamentHub!</p>
                <Link className="btn btn-primary" to={ isLoggedIn ? "/account" : "/login" }>
                    { isLoggedIn ? "Account Details" : "Login to TournamentHub" }
                </Link>
            </div>
        );
    }
} 

const mapDispatchToProps = dispatch => bindActionCreators({
  changePage: () => push('/account')
}, dispatch)

const mapStateToProps = (state) => {
    return { isLoggedIn: state.auth.isLoggedIn }
  }

export default withRouter(connect(
  mapStateToProps,  
  mapDispatchToProps
)(Home))