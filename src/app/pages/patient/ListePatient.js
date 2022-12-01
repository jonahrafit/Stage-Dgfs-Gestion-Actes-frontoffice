import React, { Component } from 'react';
import { Modal, Button, Col, Form, InputGroup } from "react-bootstrap";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { etablissement_patient_url_api, etablissement_service_url_api, personne_patient_url_api, session_id_etab, date_now } from '../../service/apiService';
import Swal from 'sweetalert2';
import moment from 'moment';

class ListePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Persons: [],
            Services: [],
            show_patient_formulary: false,
            page: 1,
            size: 3,
            personne: {
                insert_nom: '',
                insert_prenom: '',
                insert_genre: 'M',
                insert_datenaissance: '',
                insert_cin: '102 391 006 119',
            },
            patient_dossier: {
                insert_id_etablissment: '',
                insert_motif: 'Urgence',
                insert_numerodossier: '',
                insert_contact: '034 642 056489',
                insert_adresse: 's',
                insert_id_personne: '',
                insert_date_admission: date_now
                // insert_date_admission: new Date().setHours(new Date().toISOString().getHours + 3).toISOString().slice(0, 16)
            },
        };
        this.headers = [
            { key: 'nom', label: 'Nom' },
            { key: 'prenom', label: 'Prenom' },
            { key: 'genre', label: 'Genre' },
            { key: 'adresse', label: 'Adresse' },
            { key: 'date_naissance', label: 'Date de naissance' },
            { key: 'motif', label: 'Motif d\'entrée' },
            { key: 'date_admission', label: 'Date d\'entrée' }
        ];
        this.handleChange_patient_formulary = this.handleChange_patient_formulary.bind(this);
        this.handleSubmit_patient_formulary = this.handleSubmit_patient_formulary.bind(this);
    }

    handleChange_patient_formulary(event) {
        const person_state = this.state.personne
        person_state[event.target.name] = event.target.value
        this.setState(person_state);
        const patient_dossier_state = this.state.patient_dossier
        patient_dossier_state[event.target.name] = event.target.value
        this.setState(patient_dossier_state);
    }

    handleSubmit_patient_formulary(event) {
        event.preventDefault();
        Swal.fire({
            title: 'Verifier ?',
            text: this.state.personne.insert_nom + '/' + this.state.personne.insert_prenom + '/' + this.state.personne.insert_genre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            closeOnConfirm: true
        }).then(() => {
            fetch(personne_patient_url_api, {
                method: 'POST',
                body: JSON.stringify({
                    nom: this.state.personne.insert_nom,
                    prenom: this.state.personne.insert_prenom,
                    genre: this.state.personne.insert_genre,
                    cin: this.state.personne.insert_cin,
                    date_naissance: this.state.personne.insert_datenaissance,
                    contact: this.state.patient_dossier.insert_contact,
                    adresse: this.state.patient_dossier.insert_adresse,
                    id_etablissement: session_id_etab,
                    motif: this.state.patient_dossier.insert_motif,
                    numero_dossier: this.state.patient_dossier.insert_numerodossier,
                    date_admission: this.state.patient_dossier.insert_date_admission,
                    // date_admission: new Date().toISOString().slice(0, 10),
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                Swal.fire({
                    type: 'success',
                    toast: true,
                    title: 'Insertion de nouveau patient reussi!',
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
                this.setState({ show_patient_formulary: false })
            });
        });
    }

    componentDidMount() {
        fetch(etablissement_patient_url_api + this.state.page + '/' + this.state.size)
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Persons: result.content
                });
                console.log(this.state.Persons);
            });
        fetch(etablissement_service_url_api)
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Services: result
                });
            });
    }

    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Patients</span>
                        </div>
                        <div className="az-dashboard-one-title">
                            <div>
                                <h2 className="az-dashboard-title">Liste des patients</h2>
                                <p className="az-dashboard-text"><i>Aujourd'hui , on compte (10) patients </i></p>
                            </div>
                            <div className="az-content-header-right">
                                <Button onClick={() => this.setState({ show_patient_formulary: true })} variant="success btn-rounded btn-with-icon btn-block">
                                    <i className="far fa-check-circle"></i> Nouveu patient
                                </Button>
                            </div>
                        </div>{/* az-dashboard-one-title */}
                        <Form.Group className="full-width">
                            <Form.Row>
                                <Col sm={2} md={2} lg={2}>
                                    <Form.Group className="">
                                        <Form.Label>Min</Form.Label>
                                        <Form.Control
                                            placeholder="0"
                                            aria-label="min range"
                                            name="min_range"
                                            required
                                            ref="min_range">

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={2} md={2} lg={2}>
                                    <Form.Group className="">
                                        <Form.Label>Max</Form.Label>
                                        <Form.Control
                                            placeholder="0"
                                            aria-label="max range"
                                            name="max_range"
                                            required
                                            ref="max_range">

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={3} lg={3}>
                                    <Form.Group className="">
                                        <Form.Label>Metric</Form.Label>
                                        <Select
                                            name="tiered_metric"
                                            onChange={(e) => this.handleMetricChange(e)}
                                            options={this.state.metricList}></Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={3} lg={3}>
                                    <Form.Label>Amount</Form.Label>
                                    <InputGroup className="mmb-3 fw">
                                        <Form.Control
                                            placeholder="0.00"
                                            aria-label="tiered amount"
                                            aria-describedby="tiered-amt-addon2"
                                            name="tiered_amount"
                                            pattern="^\d*\.\d{1,18}$"
                                            required
                                            ref="tiered_amt"

                                        />
                                    </InputGroup>
                                </Col>
                                <Col sm={12} md={2} lg={2}>
                                    <Form.Label>_</Form.Label>
                                    <Button>Filtrer</Button>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <div className="table table-bordered">
                            <table cellPadding="0" cellSpacing="0">
                                <thead>
                                    <tr>
                                        {
                                            this.headers.map(function (h) {
                                                return (
                                                    <th key={h.key}>{h.label}</th>
                                                )
                                            })
                                        }
                                        <th>Age  </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Persons.map(function (item, key) {
                                            return (
                                                <tr key={key}>
                                                    <td>
                                                        <Link to={"/patient/" + item.id}>
                                                            {item.nom}
                                                        </Link>
                                                    </td>
                                                    <td>{item.prenom}</td>
                                                    <td>{item.genre}</td>
                                                    <td>{item.adresse}</td>
                                                    <td>{item.date_naissance}</td>
                                                    <td>{item.motif}</td>
                                                    {/* <td>{moment(item.dateAdmission).format("L")}</td> */}
                                                    <td>{item.date_admission}</td>
                                                    <td>{moment(item.date_naissance).from(item.date_admission)}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                        <hr className="mg-y-30" />
                    </div>{/* bd */}
                </div>


                {/* MODAL FORMULAIRE NOUVEAU PATIENT */}
                < Modal show={this.state.show_patient_formulary} onHide={() => this.setState({ show_patient_formulary: false })
                }>
                    <form onSubmit={this.handleSubmit_patient_formulary}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h2><span className="medical-icon-administration" aria-hidden="true"></span> Nouveau Patient</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Nom</p>
                                    <Form.Control type="text" name="insert_nom"
                                        placeholder='Enter le nom'
                                        value={this.state.personne.insert_nom} onChange={this.handleChange_patient_formulary} required />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Prénom</p>
                                    <Form.Control type="text" name="insert_prenom" placeholder="Entrer le prenom" value={this.state.personne.insert_prenom} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <hr />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Sexe</p>
                                    <Form.Check type="radio" name="insert_genre" value="M" label="Masculin" checked={this.state.personne.insert_genre === 'M'} onChange={this.handleChange_patient_formulary} />
                                    <Form.Check type="radio" name="insert_genre" value="F" label="Féminin" checked={this.state.personne.insert_genre === 'F'} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Date de naissance</p>
                                    <Form.Control type="date" name="insert_datenaissance" value={this.state.personne.insert_datenaissance} onChange={this.handleChange_patient_formulary} required />
                                </div>{/* col */}
                            </div>{/* row */}
                            <hr />
                            <div div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Numero CIN</p>
                                    <Form.Control type="string" name="insert_cin" placeholder="Entrer Carte d'Identité Nationale" value={this.state.personne.insert_cin} onChange={this.handleChange_patient_formulary} />
                                </div>
                            </div>

                            <hr />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Contact</p>
                                    <Form.Control type="string" name="insert_contact" placeholder="Entrer un contact valide" value={this.state.patient_dossier.insert_contact} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Adresse</p>
                                    <Form.Control type="text" name="insert_adresse" placeholder="Entrer l'adresse" required value={this.state.patient_dossier.insert_adresse} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <div className="row row-sm mg-b-20">
                                <div className="col-lg">
                                    <p className="mg-b-10">Motif d'entrée</p>
                                    <select name="insert_motif" value={this.state.patient_dossier.insert_motif} onChange={this.handleChange_patient_formulary}>
                                        {
                                            this.state.Services.map(function (service) {
                                                return (
                                                    <option key={service.id} value={service.nomService}>{service.code + '-' + service.nomService}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                                <div className="col-lg">
                                    <p className="mg-b-10">Date d'admission</p>
                                    <Form.Control type="datetime-local" name="insert_date_admission" value={this.state.patient_dossier.insert_date_admission} onChange={this.handleChange_patient_formulary} required />
                                </div>{/* col */}
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" >Reset</Button>
                            <Button variant="secondary" onClick={() => this.setState({ show_patient_formulary: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal >
            </div >
        );
    }
}
export default ListePatient;
