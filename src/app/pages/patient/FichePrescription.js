import React, { Component } from 'react';
import MenuFichePatient from './MenuFichePatient';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import Select from 'react-select';
import { date_now } from '../../service/apiService';

class FichePrescription extends Component {
    constructor(props) {
        super();
        this.state = {
            show_prescription_formulary: false,
            prescription: {
                medicament: '',
                datedebut: date_now,
                voie_adminnistration: '',
                posologie: '',
                quantite: '',
            }
        }
    }

    handleChangePrescription(event) {
        const prescription_state = this.state.prescription
        prescription_state[event.target.name] = event.target.value
        this.setState({ prescription : prescription_state});
    }

    handleSubmitPrescription(event){
        event.preventDefault();
        alert(this.state.prescription)
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
                                        <th>Presciption / Posologie / Voie d'administration</th>
                                        <th>22 Sept</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <th scope="row">Doliprane 40mg / IVDL / Orale</th>
                                        <td><i className="fa fa-circle" aria-hidden="true"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span style={{ color: 'red' }}>Cetriaxone 50mg</span> / IVDL / Orale</th>
                                        <td><i className="fa5p fa5p-triangle" aria-hidden="true"></i></td>
                                    </tr>
                                    <tr>
                                        <th scope="row"><span style={{ color: 'green' }}>DEXAMETA</span> / IVDL / Orale</th>
                                        <td><span className="medical-icon-anesthesia" aria-hidden="true"></span></td>
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
                                    <Form.Control type="text" name="id_prescripteur" placeholder="Id prescripteur : ID-54918DE" value="1" readOnly />
                                </div>{/* col */}
                            </div>{/* row */}
                            <hr />
                            <div className="row row-sm">
                                <hr className="mg-y-5" />
                                <div className="col-lg">
                                    <p className="mg-b-10">Medicament</p>
                                    <Select name="medicament" value={this.state.medicament} onChange={this.handleChangePrescription}
                                        options={[
                                            { value: 'paracetamol', label: 'paracetamol' },
                                            { value: 'chrome', label: 'chrome' },
                                        ]}
                                    />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Voie d'administration</p>
                                    <Select value={this.state.voie_administration} onChange={this.handleChangePrescription} name="voie_administration"
                                        options={[
                                            { value: 'orale', label: 'orale' },
                                            { value: 'rectale', label: 'rectale' },
                                        ]}
                                    />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Date début</p>
                                    <Form.Control type="date" name="datedebut" value={this.state.datedebut} onChange={this.handleChangePrescription} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <hr className="mg-y-5" />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Posologie</p>
                                    <Select value={this.state.posologie} onChange={this.handleChangePrescription} name="posologie"
                                        options={[
                                            { value: 'Matin-Midi-Soir', label: 'Matin-Midi-Soir' },
                                        ]}
                                    />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Quantite</p>
                                    <Form.Control type="text" name="quantite" value={this.state.quantite} onChange={this.handleChangePrescription} />
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
