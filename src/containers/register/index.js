import React, { Component } from 'react'
import './index.css'
import authService from '../../services/authService';
import { push } from 'react-router-redux'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

class Register extends Component {
  constructor() {
    super();
    this.register = async (e) => {
      e.preventDefault();
      const registerResult = await authService.register(this.state);
      if (registerResult.auth) {
        this.props.takeToConfirmationPage();
      } else{
        alert("Registration failed");
      }
    };
  
    this.handleInput = (e) => {
      const user = {};
      user[`${e.target.name}`] = e.target.value;
      this.setState(user);
    };
  }
  
  componentDidMount() {
    this.setState({
      name: '',
      email: '',
      password: '',
      password2: '',
      confirmUrlBase: 'http://localhost:3000/confirm/',
    });
  }

  render() {
    return (
      <form className="form-signin" onSubmit={async(e) => this.register(e)}>
        <div className="form-group">
          <label htmlFor="register-email">Email address</label>
          <input onChange={ (e) => this.handleInput(e) } type="email" className="form-control" name="email" id="register-email" aria-describedby="emailHelp" placeholder="Enter email" />
          <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
        </div>
        <div className="form-group">
          <label htmlFor="register-name-1">Your name</label>
          <input onChange={ (e) => this.handleInput(e) } type="text" className="form-control" name="name" id="register-name-1" placeholder="Your Name" />
        </div>
        <div className="form-group">
          <label htmlFor="register-password-1">Password</label>
          <input onChange={ (e) => this.handleInput(e) } type="password" className="form-control" name="password" id="register-password-1" placeholder="Password" />
        </div>
        <div className="form-group">
          <label htmlFor="register-password-2">Password again</label>
          <input onChange={ (e) => this.handleInput(e) } type="password" className="form-control" name="password2" id="register-password-2" placeholder="Password Again" />
        </div>
        <button type="submit" className="btn btn-primary">Register!</button>
      </form>
    );
  }
}

const mapDispatchToProps = dispatch => bindActionCreators({
  takeToConfirmationPage: () => push('/confirm')
}, dispatch)

export default withRouter(connect(
  null, 
  mapDispatchToProps
)(Register))