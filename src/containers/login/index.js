
import React, {Component} from 'react'
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import './index.css'
// @ts-ignore
import logo from '../../../src/logo.png'
import authService from '../../services/authService';

class Login extends Component {
  
  constructor(props) {

    super(props);

    this.state = { username: '', password: '' };
    this.login = async (e) => {
      e.preventDefault();
      const loginResponse = await authService.login(this.state);
      if (loginResponse.auth) {
        this.props.loggedIn();
        //return <Redirect to="/" />
      } else {
        alert(`Login failed: ${loginResponse.message}`)
      }
      return null;
    };

    this.handleInput = (e) => {
      const user = {};
      user[`${e.target.name}`] = e.target.value;
      this.setState(user);
    };
  }
  render() { 
    const { isLoggedIn, user } = this.props;
    if (isLoggedIn) {
      return (
        <div>
          <p>You're already logged in, { user.name }</p>
          <Link className="btn btn-primary" to="/">Home</Link>
        </div>
      )
    }
    return (
      <form className="form-signin" onSubmit={async(e) => this.login(e)}>
        <img className="mb-4" src={logo} alt="" width="72" height="72" />
        <h1 className="h3 mb-3 font-weight-normal">Please sign in</h1>
        <label htmlFor="inputEmail" className="sr-only">Email address</label>
        <input onChange={ (e) => this.handleInput(e) } type="email" className="form-control" name="email" id="inputEmail" placeholder="Email address" required autoFocus />
        <label htmlFor="inputPassword" className="sr-only">Password</label>
        <input onChange={ (e) => this.handleInput(e) } name="password" type="password" id="inputPassword" className="form-control" placeholder="Password" required />
        <div>
          <Link to="/register">New User Registration</Link>
        </div>
        <div className="checkbox mb-3">
          <label>
            <input type="checkbox" value="remember-me" /> Remember me
          </label>
        </div>
        <div>
          
        </div>
        <button className="btn btn-lg btn-primary btn-block" type="submit">Sign in</button>
        <p className="mt-5 mb-3 text-muted">&copy; 2017-2018</p>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  loggedIn: () => push('/')
}, dispatch)

const mapStateToProps = state => {
  return { isLoggedIn: state.auth.isLoggedIn, user: state.auth.user }
}

export default withRouter(connect(
  mapStateToProps, 
  mapDispatchToProps
)(Login))
