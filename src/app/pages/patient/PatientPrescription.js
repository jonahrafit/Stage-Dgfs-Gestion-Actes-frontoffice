import React, { Component } from 'react';
import { Modal, Table, Form, Button } from 'react-bootstrap';
import { patient_url_api, medicament_url_api } from '../../service/apiService';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import authHeader from '../../service/auth-header';
import Swal from 'sweetalert2';
import moment from 'moment';
import PatientService from '../../service/PatientService';

export default class PatientPrescription extends Component {
    constructor(props) {
        super();
        this.state = {
            id_patient_dossier: props.match.params.id,
            show_prescription_formulary: true,
            prescription: {
                insert_medicament: '1',
                insert_voie_administration: 'Orale',
                insert_duree_traitement: '3',
                insert_frequence: 'MMS',
                insert_remarque: '',
                insert_date_prescription: new Date(),
                insert_matin: 0,
                insert_midi: 0,
                insert_soir: 0,
                insert_date_debut: new Date(),
            },
            patient: [],
            medicament: [],
            prescriptions: []
        }
        this.handleChangePrescription = this.handleChangePrescription.bind(this);
        this.handleSubmitPrescription = this.handleSubmitPrescription.bind(this);
    }

    componentDidMount() {
        PatientService.getPatient(this.props.match.params.id).then(response => { this.setState({ patient: response }); })
        this.getAllMedicament();
        this.getAllPrescription(this.state.id_patient_dossier);
    }

    handleChangePrescription(event) {
        const prescription_state = this.state.prescription
        prescription_state[event.target.name] = event.target.value
        this.setState(prescription_state);
    }

    handleSubmitPrescription(event) {
        event.preventDefault();
        const date_farany = new Date();
        date_farany.setDate(date_farany.getDate() + this.state.prescription.insert_duree_traitement);
        console.log("MIDI", this.state.prescription.insert_midi);
        fetch(patient_url_api + this.state.id_patient_dossier + '/prescription', {
            method: 'POST',
            body: JSON.stringify({
                date_debut: this.state.prescription.insert_date_debut,
                date_fin: date_farany,
                duree: this.state.prescription.insert_duree_traitement,
                matin: this.state.prescription.insert_matin,
                midi: this.state.prescription.insert_midi,
                soir: this.state.prescription.insert_soir,
                remarque: this.state.prescription.insert_remarque,
                id_medicament: this.state.prescription.insert_medicament,
                id_patient_dossier: this.state.id_patient_dossier,
                voie_administration: this.state.prescription.insert_voie_administration,
                type_posologie: this.state.prescription.insert_frequence,
            }),
            headers: authHeader(),
        }).then((res) => {
            if (res.status === 201) {
                console.log(res);
                Swal.fire({
                    type: 'success',
                    toast: true,
                    title: 'Insertion d une nouvelle prescription reussi',
                    animation: true,
                    position: 'top-right',
                    showConfirmButton: false,
                    timer: 3000,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            }
            else {
                Swal.fire({
                    type: 'error',
                    toast: true,
                    title: res.status,
                    position: 'top-right',
                    timer: 3000,
                    showConfirmButton: false,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                        toast.addEventListener('mouseenter', Swal.stopTimer)
                        toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })
            }
            this.setState({
                show_prescription_formulary: false,
                prescription: {
                    insert_medicament: '1',
                    insert_voie_administration: 'Orale',
                    insert_duree_traitement: '3',
                    insert_frequence: 'MMS',
                    insert_remarque: '',
                    insert_date_prescription: new Date(),
                    insert_matin: 0,
                    insert_midi: 0,
                    insert_soir: 0,
                    insert_date_debut: new Date()
                }
            });
            this.getAllPrescription(this.state.id_patient_dossier);
        }).catch((err) => {
            console.log(err);
        });

    }

    getAllPrescription(idpatientdossier) {
        fetch(patient_url_api + idpatientdossier + '/prescription', { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    prescriptions: response
                });
                console.log("Patient prescription", response);
            })
    }

    getAllMedicament() {
        fetch(medicament_url_api, { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    medicament: response
                });
                console.log("Liste medicament", response);
            })
    }

    getPatient(id) {
        fetch(patient_url_api + id, { headers: authHeader() })
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
                                    <Table className="mg-b-0 table table-bordered border-primary">
                                        <thead>
                                            <tr>
                                                <th rowSpan={2}>Medicament</th>
                                                <th rowSpan={2}>Debut de traitement</th>
                                                <th rowSpan={2}>Duree de traitement(en jour)</th>
                                                <th rowSpan={2}>Voie d'administration</th>
                                                <th colSpan={3}>Posologie </th>
                                            </tr>
                                            <tr>
                                                <th>Matin</th>
                                                <th>Midi</th>
                                                <th>Soir</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.prescriptions &&
                                                this.state.prescriptions.map(function (item, key) {
                                                    return (
                                                        <tr key={key} title={item.remarque}>
                                                            <th scope="row">{item.medicament.nomMedicament}
                                                                <span className="badge badge-danger text-uppercase">Nouveau</span></th>
                                                            <td>{moment(item.dateDebut).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                            <td>{item.duree}</td>
                                                            <td>{item.voieAdministration}</td>
                                                            <td>{item.matin === 0 ? '-' : item.matin}</td>
                                                            <td>{item.midi === 0 ? '-' : item.midi}</td>
                                                            <td>{item.soir === 0 ? '-' : item.soir}</td>
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
                                        <div className="col-lg col-md-6">
                                            <p className="mg-b-10">Medicament</p>
                                            <select name="insert_medicament" value={this.state.prescription.insert_medicament} onChange={this.handleChangePrescription}>
                                                {
                                                    this.state.medicament.map(function (medicament) {
                                                        return (
                                                            <option key={medicament.id} value={medicament.id}>{medicament.nomMedicament}</option>
                                                        )
                                                    })
                                                }
                                            </select>
                                        </div>{/* col */}
                                        <div className="col-lg col-md-6">
                                            <p className="mg-b-10">Voie d'administration</p>
                                            <select name="insert_voie_administration" value={this.state.prescription.insert_voie_administration} onChange={this.handleChangePrescription}>
                                                <option value="orale">Orale</option>
                                                <option value="rectale">Rectale</option>
                                            </select>
                                        </div>{/* col */}
                                    </div>{/* row */}
                                    <hr className="mg-y-5" />
                                    <div className="row row-sm">
                                        <div className="col-lg col-md-6">
                                            <p className="mg-b-10">Dureé de traitement (en j)</p>
                                            <Form.Control type="text" name="insert_duree_traitement" value={this.state.prescription.insert_duree_traitement} onChange={this.handleChangePrescription} required />
                                        </div>{/* col */}
                                        <div className="col-lg col-md-6">
                                            <p className="mg-b-10">Fréquence de prise de medicament</p>
                                            <select name="insert_frequence" value={this.state.prescription.insert_frequence} onChange={this.handleChangePrescription}>
                                                <option value="Matin">Chaque matin</option>
                                                <option value="Midi">Chaque midi</option>
                                                <option value="Soir">Chaque soir</option>
                                                <option value="MMS">Matin - Midi - Soir</option>
                                            </select>
                                        </div>{/* col */}
                                    </div>{/* row */}
                                    {
                                        this.state.prescription.insert_frequence === "MMS" && (
                                            <div className="row row-sm">
                                                <div className="col-lg col-md-4">
                                                    <p className="mg-b-10">Matin</p>
                                                    <Form.Control type="text" name="insert_matin" value={this.state.prescription.insert_matin} onChange={this.handleChangePrescription} />
                                                </div>
                                                <div className="col-lg col-md-4">
                                                    <p className="mg-b-10">Midi</p>
                                                    <Form.Control type="text" name="insert_midi" value={this.state.prescription.insert_midi} onChange={this.handleChangePrescription} />
                                                </div>
                                                <div className="col-lg col-md-4">
                                                    <p className="mg-b-10">Soir</p>
                                                    <Form.Control type="text" name="insert_soir" value={this.state.prescription.insert_soir} onChange={this.handleChangePrescription} />
                                                </div>
                                            </div>
                                        )
                                    }
                                    {
                                        this.state.prescription.insert_frequence !== "MMS" && (
                                            <div className="row row-sm">
                                                <div className="col-lg">
                                                    <p className="mg-b-10">Quantité</p>
                                                    <Form.Control type="text" name={'insert_' + this.state.prescription.insert_frequence.toLowerCase()} value={this.state.prescription['insert_' + this.state.prescription.insert_frequence.toLowerCase()]} onChange={this.handleChangePrescription} />
                                                </div>
                                            </div>
                                        )
                                    }
                                    <hr className="mg-y-5" />
                                    <div className="row">
                                        <div className="col-lg">
                                            <p className="mg-b-10">Remarque</p>
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

