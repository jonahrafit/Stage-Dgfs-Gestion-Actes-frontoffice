import React, { Component } from 'react'
import { Button } from 'react-bootstrap'
import { url } from '../../service/apiService';
// import axios from 'axios';
// import AuthService from './auth.service';

export class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      login: {
        username: 'jonah@gmail.com',
        password: '1234'
      },
      message: '',
      loading: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.formSubmit = this.formSubmit.bind(this);
  }

  handleChange(event) {
    const statelogin = this.state.login;
    statelogin[event.target.name] = event.target.value;
    this.setState(statelogin);
  }

  formSubmit(event) {
    event.preventDefault();
    this.setState({ loading: true });
    var data = new FormData();
    data.append("username", this.state.login.username);
    data.append("password", this.state.login.password);
    fetch(url + "login", {
      method: 'POST',
      body: data
    })
      .then((responseF) => responseF.json())
      .then((response) => {
        localStorage.setItem("token", JSON.stringify(response));
        window.location.href = '/dashboard';
      })
      .catch((exception) => {
        this.setState({
          message: exception.toString(),
          loading: false
        })
      });

  }

  render() {
    return (
      <div>
        <div className="az-signin-wrapper">
          <div className="az-card-signin">
            <h1 className="az-logo">Bienvenu</h1>
            <div className="az-signin-header">
              {this.state.message && (
                <div className="form-group">
                  <div className="alert alert-danger" role="alert">
                    {this.state.message}
                  </div>
                </div>
              )}
              <form onSubmit={this.formSubmit}>
                <div className="form-group">
                  <label>Nom d'utilisateur</label>
                  <input type="text" className="form-control" name="username" placeholder="Enter your email"
                    value={this.state.login.username} onChange={this.handleChange} />
                </div>{/* form-group */}
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" name="password" placeholder="Enter your password"
                    value={this.state.login.password} onChange={this.handleChange} />
                </div>{/* form-group */}
                <div className="form-group">
                  <Button type="submit" className="btn btn-az-primary btn-block" disabled={this.state.login.username.length === 0 || this.state.login.password.length === 0}>
                    <span> {this.state.loading ? <div className="spinner-border" role="status"></div> : 'Connexion'}</span>
                  </Button>
                </div>
              </form>
            </div>{/* az-signin-header */}
            <div className="az-signin-footer">
            </div> {/*az-signin-footer*/}
          </div>{/* az-card-signin */}
        </div>{/* az-signin-wrapper */}
      </div >
    )
  }
}

export default Login
