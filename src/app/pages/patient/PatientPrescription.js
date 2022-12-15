import React, { Component } from 'react';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import { patient_prescription_url_api, patient_url_api } from '../../service/apiService';
import { Link } from 'react-router-dom';
import Menu from './Menu';

export default class PatientPrescription extends Component {
    constructor(props) {
        super();
        this.state = {
            id_patient_dossier: props.match.params.id,
            show_prescription_formulary: false,
            prescription: {
                insert_medicament: '',
                insert_voie_administration: 'Orale',
                insert_duree_traitement: '',
                insert_remarque: ''
            },
            patient: []
        }
        this.handleChangePrescription = this.handleChangePrescription.bind(this);
        this.handleSubmitPrescription = this.handleSubmitPrescription.bind(this);
        this.getPatient = this.getPatient.bind(this);
    }

    componentDidMount() {
        this.getPatient(this.state.id_patient_dossier);
    }

    handleChangePrescription(event) {
        const prescription_state = this.state.prescription
        prescription_state[event.target.name] = event.target.value
        this.setState(prescription_state);
    }

    getAllPrescription(idpatientdossier) {
        fetch(patient_prescription_url_api + idpatientdossier)
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    prescriptions: response
                });
                console.log("Patient prescription", response);
            })
    }

    handleSubmitPrescription(event) {
        event.preventDefault();
        const p = this.state.prescription;
        console.log("Prescription", p);
        console.log(p.insert_medicament + '   ' + p.insert_voie_administration);
        console.log("DUree ", p.insert_duree_traitement, " --- > ");
        alert("ny tohiny izao no andrasana");
    }
    getPatient(id) {
        fetch(patient_url_api + id)
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    patient: response
                });
                console.log("patient", response);
                return response;
            })
    }
    render() {
        const patient = this.state.patient;
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/patient">Patient </Link> </span>
                            <span><Link to={'/patient/' + patient.id}>{patient.numero_dossier}</Link> </span>
                            <span>Prescription </span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            <Menu patient={patient} />
                            <div className="col-lg-12 mg-b-10">
                                <hr />
                                <p className="mg-b-20"> <button onClick={() => this.setState({ show_prescription_formulary: true })} >Nouvelle prescription</button></p>
                                <div className="table-responsive">
                                    <Table className="mg-b-0">
                                        <thead>
                                            <tr>
                                                <th>Presciption / Voie d'administration</th>
                                                <th>Date_debut</th>
                                                <th>Date_fin</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.prescriptions &&
                                                this.state.prescriptions.map(function (item, key) {
                                                    return (
                                                        <tr key={key}>
                                                            <th scope="row">{item.medicament.nom} / {item.voie_administration} </th>
                                                            <td>{item.date_debut}</td>
                                                            <td>{item.date_fin}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </Table>
                                </div>{/* table-responsive */}
                            </div>
                        </div>

                        {/* MODAL FORMULAIRE PRESCRIPTION MEDICALE */}
                        <Modal show={this.state.show_prescription_formulary} onHide={() => this.setState({ show_prescription_formulary: false })}>
                            <form onSubmit={this.handleSubmitPrescription}>
                                <Modal.Header closeButton>
                                    <Modal.Title>
                                        <h2>Nouvelle prescription medicale</h2>
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
                                            <Form.Control type="text" name="insert_medicament" value={this.state.prescription.insert_medicament} onChange={this.handleChangePrescription} />
                                        </div>{/* col */}
                                        <div className="col-lg">
                                            <p className="mg-b-10">Voie d'administration</p>
                                            <select name="insert_voie_administration" value={this.state.prescription.insert_voie_administration} onChange={this.handleChangePrescription}>
                                                <option value="orale">Orale</option>
                                                <option value="rectale">Rectale</option>
                                            </select>
                                        </div>{/* col */}
                                    </div>{/* row */}
                                    <hr className="mg-y-5" />
                                    <div className="row row-sm">
                                        <div className="col-lg">
                                            <p className="mg-b-10">Dureé de traitement (en j)</p>
                                            <Form.Control type="text" name="insert_duree_traitement" value={this.state.prescription.insert_duree_traitement} onChange={this.handleChangePrescription} />
                                        </div>{/* col */}
                                    </div>{/* row */}
                                    <hr className="mg-y-5" />
                                    <div className="row row-sm">
                                        <div className="col-lg">
                                            <p className="mg-b-10">Note</p>
                                            <textarea name="insert_remarque" value={this.state.prescription.insert_remarque} onChange={this.handleChangePrescription} ></textarea>
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
                </div>
            </div>
        );
    }
}

