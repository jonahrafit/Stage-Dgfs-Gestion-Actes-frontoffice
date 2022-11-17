import React, { Component } from 'react';
import MenuFichePatient from './MenuFichePatient';
import { Modal, Table, Form } from 'react-bootstrap';
import Select from 'react-select';
import { Button } from 'react-bootstrap';

class FichePrescription extends Component {
    constructor(props) {
        super();
        this.state = {
            show_prescription_formulary: false,
        }
    }
    render() {
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <MenuFichePatient />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Patient  </span>
                            <span> 1 </span>
                            {/* <span>{this.state.patient.adresse}</span> */}
                            <span>Prescription </span>
                        </div>

                        <h2 className="az-content-title">Fiche de prescription medicale</h2>

                        <div className="az-content-label mg-b-5">Rakotomanana Naricomma</div>
                        <p className="mg-b-5">26 ans / Masculin / Lit : A45 / Date entrée : 20 Novembre 2022 15:16</p>
                        <p className="mg-b-20"> <button onClick={() => this.setState({ show_prescription_formulary: true })} >Nouvelle prescription</button></p>
                        <div className="table-responsive">
                            <Table className="mg-b-0">
                                <thead>
                                    <tr>
                                        <th>Presciption</th>
                                        <th>Posologie</th>
                                        <th>Voie d'administration</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Doliprane 40mg</th>
                                        <td>IVDL</td>
                                        <td>Orale</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span className='bg-red'>Cetriaxone 50mg</span></th>
                                        <td>IVDL</td>
                                        <td>Orale</td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span className='bg-green'>DEXAMETA</span> </th>
                                        <td>IVDL</td>
                                        <td>Orale</td>
                                    </tr>
                                </tbody>
                            </Table>
                        </div>{/* table-responsive */}
                    </div>
                </div>


                {/* MODAL FORMULAIRE PRESCRIPTION MEDICALE */}
                <Modal show={this.state.show_prescription_formulary} onHide={() => this.setState({ show_prescription_formulary: false })}>
                    <form onSubmit={this.handleSubmit_patient_formulary}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h2><span className="medical-icon-anesthesia" aria-hidden="true"></span> Des parametre vitaux </h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <Form.Control type="text" placeholder="Id prescripteur : ID-54918DE" readOnly />
                                </div>{/* col */}
                            </div>{/* row */}
                            <hr />
                            <div className="row row-sm">
                                <hr className="mg-y-5" />
                                <div className="col-lg">
                                    <p className="mg-b-10">Medicament</p>
                                    <Select
                                        options={[
                                            { value: 'paracetamol', label: 'paracetamol' },
                                            { value: 'chrome', label: 'chrome' },
                                        ]}
                                    />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Voie d'administration</p>
                                    <Select
                                        options={[
                                            { value: 'orale', label: 'orale' },
                                            { value: 'rectale', label: 'rectale' },
                                        ]}
                                    />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Date début</p>
                                    <Form.Control type="date" name="datedebut" value={this.state.datedebut} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <hr className="mg-y-5" />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Posologie</p>
                                    <Select
                                        options={[
                                            { value: 'Matin-Midi-Soir', label: 'Matin-Midi-Soir' },
                                        ]}
                                    />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Quantite</p>
                                    <Form.Control type="text" name="quantite" value={this.state.quantite} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_prescription_formulary: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Valider la prescription</Button>
                        </Modal.Footer>
                    </form>
                </Modal>

            </div>
        );
    }
}

export default FichePrescription;
