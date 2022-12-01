import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

export class Login extends Component {
  constructor(props) {
    super();
    this.state = this.initialState;
    this.handleChange = this.handleChange.bind(this);
  }

  initialState = {
    login: '',
    motdepasse: ''
  };

  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }

  formsubmit(event) {
    alert("submit so!!!!");
    console.log(this.state);
  }

  render() {
    return (
      <div>
        <div className="az-signin-wrapper">
          <div className="az-card-signin">
            <h1 className="az-logo">Bienvenu</h1>
            <div className="az-signin-header">
              <form onSubmit={this.formSubmit}>
                <div className="form-group">
                  <label>Nom d'utilisateur</label>
                  <input type="text" className="form-control" name="login" placeholder="Enter your email" 
                    value={this.state.login} onChange={this.handleChange} />
                </div>{/* form-group */}
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" name="motdepasse" placeholder="Enter your password"
                    value={this.state.motdepasse} onChange={this.handleChange} />
                </div>{/* form-group */}
                <Link to="/dashboard">
                  <Button className="btn btn-az-primary btn-block" 
                  disabled={this.state.login.length === 0 || this.state.motdepasse.length === 0} >
                    Connexion
                  </Button>
                </Link>
              </form>
            </div>{/* az-signin-header */}
            <div className="az-signin-footer">
            </div> {/*az-signin-footer*/}
          </div>{/* az-card-signin */}
        </div>{/* az-signin-wrapper */}
      </div>
    )
  }
}

export default Login
