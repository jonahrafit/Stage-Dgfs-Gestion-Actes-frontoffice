import React, { Component } from 'react'
import { Link, withRouter } from 'react-router-dom'
import ComponentsSidebar from './../../components/shared/ComponentsSidebar';

export class MenuFichePatient extends Component {
  render() {
    return (
      <div>
        <div className="az-content-left az-content-left-components">
          <ComponentsSidebar />
          <div className="component-item">
            <label>Coordonées</label>
            <nav className="nav flex-column">
              <Link to="/ui-elements/buttons" className={this.isPathActive('/ui-elements/buttons') ? "nav-link active" : "nav-link"}>Identité</Link>
              <Link to="/ui-elements/dropdowns" className={this.isPathActive('/ui-elements/dropdowns') ? "nav-link active" : "nav-link"}>Parcours sanitaire</Link>
              <Link to="/ui-elements/dropdowns" className={this.isPathActive('/ui-elements/dropdowns') ? "nav-link active" : "nav-link"}>Admission</Link>
            </nav>
            <label>Consultation</label>
            <nav className="nav flex-column">
              <Link to="/charts/chartjs" className={this.isPathActive('/charts/chartjs') ? "nav-link active" : "nav-link"}>Consultation actuelle</Link>
              <Link to="/charts/chartjs" className={this.isPathActive('/charts/chartjs') ? "nav-link active" : "nav-link"}>Historique de consultation</Link>
            </nav>
            <label>Antécédents médicaux</label>
            <nav className="nav flex-column">
              <Link to="/tables/basic-table" className={this.isPathActive('/tables/basic-table') ? "nav-link active" : "nav-link"}>Paramètre journalières</Link>
            </nav>
          </div>{/* component-item */}
        </div>{/* az-content-left */}
      </div>
    )
  }

  isPathActive(path) {
    return this.props.location.pathname.startsWith(path);
  }
}

export default withRouter(MenuFichePatient)
