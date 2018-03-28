
import React, {Component} from 'react'
import { withRouter } from 'react-router'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import authService from '../../services/authService';

class Logout extends Component {
  
  async componentDidMount() {
    await authService.logout();
  }

  render() {
    const { isLoggedIn } = this.props;
    if (!isLoggedIn)
      return (
        <div>
            <p>You've been logged out</p>
            <Link className="btn btn-primary" to="/login">Login -></Link>
        </div>
      )
    return (
      <div>
        <p>Please wait while you're logged out</p>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn }
}

export default withRouter(connect(
  mapStateToProps, 
  null
)(Logout))
