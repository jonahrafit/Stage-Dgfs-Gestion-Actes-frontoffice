import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export class Login extends Component {
  constructor(props) {
    super();
    this.state = {
      login: {
        username: '',
        password: ''
      },
      message: '',
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
    // alert(this.state.login.username + '  ' + this.state.login.password)
    window.location.href = '/dashboard';
    // fetch(url + "login", {
    //   method: 'POST',
    //   crossorigin: true,
    //   withCredentials: true,
    //   mode: 'no-cors',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json'
    //   },
    //   body: this.state.login,
    // })
    //   .then((response) => {
    //     localStorage.setItem("user", JSON.stringify(response));
    //   })
    //   .catch(error => {
    //     console.log("ERROR: ", error);
    //     this.setState({ message: error.toString() });
    //   });
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
                    <span>Connexion</span>
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
