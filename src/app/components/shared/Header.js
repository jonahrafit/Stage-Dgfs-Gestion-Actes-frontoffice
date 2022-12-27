import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import { Nav, Navbar, Dropdown } from "react-bootstrap";
import Datetime from "../../pages/generalpage/Datetime";
import * as Icon from "react-icons/bs";
import jwtDecode from "jwt-decode";

export class Header extends Component {
  closeMenu(e) {
    e.target.closest(".dropdown").classList.remove("show");
    e.target.closest(".dropdown .dropdown-menu").classList.remove("show");
  }

  toggleHeaderMenu(e) {
    e.preventDefault();
    document.querySelector("body").classList.toggle("az-header-menu-show");
  }

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      document.querySelector("body").classList.remove("az-header-menu-show");
    }
  }

  logout() {
    localStorage.removeItem("token");
    window.location.href = '/login';
  }

  render() {
    let user_details = '';
    if (localStorage.getItem("token")) {
      user_details = jwtDecode(localStorage.getItem("token"));
    }
    return (
      <div>
        <Navbar bg="dark" variant="dark" expand="lg" sticky="top">
          <Navbar.Brand>
            <Datetime />
          </Navbar.Brand>
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ml-auto">
              <Nav.Item className={
                this.isPathActive("/dashboard")
                  ? "nav-item active"
                  : "nav-item"
              }>
                <Nav.Link href="/dashboard">
                  <i className="typcn typcn-chart-area-outline"></i> Acceuil
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={
                this.isPathActive("/patient")
                  ? "nav-item active"
                  : "nav-item"
              }>
                <Nav.Link href="/patient">
                  <span className="medical-icon-health-services" aria-hidden="true">  </span>  Gestion des patients
                </Nav.Link>
              </Nav.Item>
              <Nav.Item className={
                this.isPathActive("/etablissement")
                  ? "nav-item active"
                  : "nav-item"
              }
              >
                <Nav.Link href="/etablissement">
                  <Icon.BsHouse /> Gestion des Etablissements
                </Nav.Link>
              </Nav.Item>

              <Nav.Item className="nav-item">
                <Dropdown
                  className={
                    this.isPathActive("/general-pages")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                    <i className="typcn typcn-document"></i> Pages
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="az-menu-sub">
                    <Nav.Link href="/general-pages/signin"
                      className={
                        this.isPathActive("/general-pages/signin")
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Sign In
                    </Nav.Link>
                    <Nav.Link href="/general-pages/signup"
                      className={
                        this.isPathActive("/general-pages/signup")
                          ? "nav-link active"
                          : "nav-link"
                      }
                    >
                      Sign Up
                    </Nav.Link>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
              <Nav.Item>
                <Dropdown
                  className={
                    this.isPathActive("/ui-elements") ||
                      this.isPathActive("/form") ||
                      this.isPathActive("/charts") ||
                      this.isPathActive("/tables")
                      ? "nav-item active"
                      : "nav-item"
                  }
                >
                  <Dropdown.Toggle as={"a"} className="nav-link with-sub">
                    <i className="typcn typcn-book"></i> Components
                  </Dropdown.Toggle>
                  <Dropdown.Menu className="az-menu-sub az-menu-sub-mega">
                    <div className="container">
                      <div>
                        <Nav.Item>
                          <span>UI Elements</span>
                          <Nav.Link href="/ui-elements/buttons"
                            className={
                              this.isPathActive("/ui-elements/buttons")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Buttons
                          </Nav.Link>
                          <Nav.Link href="/ui-elements/dropdowns"
                            className={
                              this.isPathActive("/ui-elements/dropdowns")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Dropdown
                          </Nav.Link>
                          <Nav.Link href="/ui-elements/icons"
                            className={
                              this.isPathActive("/ui-elements/icons")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Icons
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        <Nav.Item>
                          <span>Forms</span>
                          <Nav.Link href="/form/form-elements"
                            className={
                              this.isPathActive("/form/form-elements")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Form Elements
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        <Nav.Item>
                          <span>Charts</span>
                          <Nav.Link href="/charts/chartjs"
                            className={
                              this.isPathActive("/charts/chartjs")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            ChartJS
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                      <div>
                        <Nav.Item>
                          <span>Tables</span>
                          <Nav.Link href="/tables/basic-table"
                            className={
                              this.isPathActive("/tables/basic-table")
                                ? "nav-link active"
                                : "nav-link"
                            }
                          >
                            Basic Tables
                          </Nav.Link>
                        </Nav.Item>
                      </div>
                    </div>
                  </Dropdown.Menu>
                </Dropdown>
              </Nav.Item>
            </Nav>
          </Navbar.Collapse>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Dropdown className="az-profile-menu">
            <Dropdown.Toggle as={"a"} className="az-img-user">
              <img
                src={require("../../../assets/images/img1.jpg")}
                alt=""
              ></img>
            </Dropdown.Toggle>
            <Dropdown.Menu>
              <div className="az-dropdown-header d-sm-none">
                <a href="#/"
                  onClick={event => this.closeMenu(event)}
                  className="az-header-arrow"
                >
                  <i className="icon ion-md-arrow-back"></i>
                </a>
              </div>
              <div className="az-header-profile">
                <div className="az-img-user">
                  <img
                    src={require("../../../assets/images/img1.jpg")}
                    alt=""
                  ></img>
                </div>
                <h6>{user_details.sub ? user_details.sub : ''}</h6>
                <span>{user_details.roles ? user_details.roles.map((usr) => usr + ' ') : ''}</span>
              </div>
              <a href="#/" className="dropdown-item">
                <i className="typcn typcn-cog-outline"></i> Mon profile
              </a>
              <Nav.Link onClick={this.logout} className="dropdown-item">
                <i className="typcn typcn-power-outline"></i> Deconnexion
              </Nav.Link>
            </Dropdown.Menu>
          </Dropdown>
        </Navbar>

      </div >
    );
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(Header);
