import React, { Component } from 'react'
import { Link } from 'react-router-dom'

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
                  <input type="text" className="form-control" placeholder="Enter your email" defaultValue="demo@bootstrapdash.com" />
                </div>{/* form-group */}
                <div className="form-group">
                  <label>Mot de passe</label>
                  <input type="password" className="form-control" placeholder="Enter your password" defaultValue="thisisademo" />
                </div>{/* form-group */}
                <Link to="/dashboard" className="btn btn-az-primary btn-block">Connexion</Link>
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
