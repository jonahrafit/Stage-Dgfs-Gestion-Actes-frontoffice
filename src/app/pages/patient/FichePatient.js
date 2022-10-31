import React, { Component } from 'react';
import ComponentsSidebar from '../../components/shared/ComponentsSidebar';
import { Table, Form, Button } from 'react-bootstrap';
import Select from 'react-select';

export class Patient extends Component {

    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <ComponentsSidebar />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Registre</span>
                        </div>
                        <h2 className="az-content-title">Fiche de registre</h2>
                        <form onSubmit={this.handleSubmit}>
                            { formFields.map((form ,))}
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Nom</p>
                                    <Form.Control type="text" 
                                    placeholder = 'Enter le nom'
                                    onChange={event => handleFormChange(event, index)}
                                    value={form.name} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Prénom</p>
                                    <Form.Control type="text" value={this.state.prenom} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Sexe</p>
                                    <Form.Check type="radio" name="sexe" label="M" defaultChecked />
                                    <Form.Check type="radio" name="sexe" label="F" />
                                </div>
                            </div>{/* row */}
                            <hr className="mg-y-10" />
                            <div className="row row-sm">
                                <div className="col-lg-4">
                                    <p className="mg-b-10">Date de naissance</p>
                                    <Form.Control type="date" value={this.state.datenaissance} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg-4">
                                    <p className="mg-b-10">Contact</p>
                                    <Form.Control type="text" value={this.state.contact} />
                                </div>{/* col */}
                                <div className="col-lg-4">
                                    <p className="mg-b-10">Adresse</p>
                                    <Form.Control type="text" value={this.state.adresse} />
                                </div>{/* col */}
                            </div>
                            <hr className="mg-y-10" />
                            <div className="row row-sm mg-b-20">
                                <div className="col-lg-6">
                                    <p className="mg-b-10">Motif d'entrée</p>
                                    <Select
                                        options={[
                                            { value: 'Ugrence', label: 'Urgence' },
                                            { value: 'CE', label: 'Consultation externe' },
                                            { value: 'RAD', label: 'Radiologie' }
                                        ]}
                                    />
                                </div>{/* col-4 */}
                            </div>{/* row */}
                            {this.state.data}
                            <div className="row row-xs wd-xl-80p">
                                <div className="col-sm-6 col-md-3"><Button type="submit" variant="primary btn-block">Primary</Button></div>
                            </div>
                        </form>
                        <hr />
                        <div className="az-content-label mg-b-5">Liste Globale</div>
                        <div className="table-responsive">
                            <Table hover className="mg-b-0">
                                <thead>
                                    <tr>
                                        <th>ID</th>
                                        <th>Name</th>
                                        <th>Position</th>
                                        <th>Salary</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">1</th>
                                        <td>Tiger Nixon</td>
                                        <td>System Architect</td>
                                        <td>$320,800</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">2</th>
                                        <td>Garrett Winters</td>
                                        <td>Accountant</td>
                                        <td>$170,750</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">3</th>
                                        <td>Ashton Cox</td>
                                        <td>Junior Technical Author</td>
                                        <td>$86,000</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">4</th>
                                        <td>Cedric Kelly</td>
                                        <td>Senior Javascript Developer</td>
                                        <td>$433,060</td>
                                    </tr>
                                    <tr>
                                        <th scope="row">5</th>
                                        <td>Airi Satou</td>
                                        <td>Accountant</td>
                                        <td>$162,700</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>{/* table-responsive */}
                    </div>{/* az-content-body */}

                </div>{/* container */}
            </div >
        )
    }
}

export default Patient;
