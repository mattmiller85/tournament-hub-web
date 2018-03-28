import './index.css';

import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import authService from '../../services/authService';

export default class Confirm extends Component {
  constructor() {
    super();
    this.state = { result: { confirmed: false } };
  }
  
  async componentDidMount() {
    this.setState({ result: { confirmed: false }})
    const { userid } = this.props.match.params
    if (!userid) {
      return;
    }
    this.setState({ result: await authService.confirm(userid) });
  }

  render() {
    const { result } = this.state;
    if (!result.confirmed) {
      return <p>You should receive an email shortly with a link to bring you back here after confirming your account.</p>
    }
    return (
      <div>
        <p>Your account has been successfully confirmed.</p>
        <Link className="btn btn-primary" to="/login">Login -></Link>
      </div>
    )
  }
}