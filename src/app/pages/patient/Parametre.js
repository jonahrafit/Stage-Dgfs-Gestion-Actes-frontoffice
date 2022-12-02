import React, { Component } from 'react'
import { Button } from 'react-bootstrap'

export default class Parametre extends Component {
    render() {
        return (
            <div>
                <div className="col-sm-6 col-md-4 col-lg-3 country-card">
                    <div className="country-card-container border-gray rounded border mx-2 my-3 d-flex flex-row align-items-center p-0 bg-light">
                        <div className="h-100 position-relative border-gray border-right px-2 bg-white rounded-left">
                            <i className="far fa-user"></i>
                        </div>
                        <div className="px-3">
                            <span className="country-name text-dark d-block font-weight-bold">Temperature</span>
                            <span className="country-region text-secondary text-uppercase">60 °C</span>
                        </div>
                    </div>
                </div>
                <div className="card card-table-one">
                    <div className="table-responsive">
                        <table className="table">
                            <thead>
                                <tr>
                                    <th className="wd-5p">&nbsp;</th>
                                    <th className="wd-45p">Nom du parametre</th>
                                    <th>Valeur normales</th>
                                    <th>Dernier prise</th>
                                    <th>Notes</th>
                                    <th>&nbsp;</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><i className="flag-icon flag-icon-us flag-icon-squared"></i></td>
                                    <td><strong>Température</strong></td>
                                    <td>36° - 38°</td>
                                    <td>Il y a 40 min</td>
                                    <td>
                                        <h6>16,869 <small className="tx-success"><i className="icon ion-md-arrow-up"></i> 2.87%</small></h6>
                                    </td>
                                    <td><Button variant="btn btn-block">
                                        <i className="typcn typcn-folder"></i> Courbe</Button>
                                    </td>
                                </tr>

                                <tr>
                                    <td><i className="flag-icon flag-icon-us flag-icon-squared"></i></td>
                                    <td><strong>Température</strong></td>
                                    <td>36° - 38°</td>
                                    <td>Il y a 40 min</td>
                                    <td>
                                        <h6>16,869 <small className="tx-danger"><i className="icon ion-md-arrow-down"></i> 2.87%</small></h6>
                                    </td>
                                    <td><Button variant="btn btn-block">
                                        <i className="typcn typcn-folder"></i> Courbe</Button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>{/* table-responsive */}
                </div>{/* card */}
            </div>
        )
    }
}
