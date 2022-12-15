import React, { Component } from 'react';
import { Modal, Button, Col, Form, InputGroup, Pagination } from "react-bootstrap";
import Select from 'react-select';
import { Link } from 'react-router-dom';
import { etablissement_patient_url_api, etablissement_url_api, etablissement_service_url_api, personne_patient_url_api, session_id_etab } from '../../service/apiService';
import Swal from 'sweetalert2';
import moment from 'moment';

class ListePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Persons: [],
            Services: [],
            Simplestat: [],
            show_patient_formulary: false,
            page: 0,
            size: 10,
            current_page: 0,
            personne: {
                insert_nom: '',
                insert_prenom: '',
                insert_genre: 'M',
                insert_datenaissance: '',
                insert_cin: '',
            },
            patient_dossier: {
                insert_id_etablissment: '',
                insert_motif: 'Urgence',
                insert_numerodossier: '',
                insert_contact: '',
                insert_adresse: '',
                insert_id_personne: '',
                insert_date_admission: new Date(),
                // insert_date_admission: new Date().setHours(new Date().toISOString().getHours + 3).toISOString().slice(0, 16)
            },
            modif_modal_data: {
                modif_nom: '',
                modif_prenom: '',
                modif_genre: '',
                modif_adresse: '',
                modif_date_naissance: '',
                modif_motif: '',
                modif_date_admission: '',
                modif_numero_dossier: ''
            },
            show_modif_modal: false,
            show_hospitalisation_modal: false,
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
        this.handleSubmit_patient_formulary = this.handleSubmit_patient_formulary.bind(this)
        this.handleChange_modif_patient = this.handleChange_modif_patient.bind(this);
        this.handleSubmit_modif_patient = this.handleSubmit_modif_patient.bind(this);
    }
    componentDidMount() {
        this.getAllPatientAujourdhui(this.state.page, this.state.size);
        this.getSimpleStat();
        fetch(etablissement_service_url_api)
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Services: result
                });
                console.log("SERVICES", this.state.Services);
            });
        // this.setState({ pagination.total : })
    }
    resetall() {
        this.getAllPatientAujourdhui(this.state.page, this.state.size);
        this.getSimpleStat();
    }

    handleChange_patient_formulary(event) {
        const person_state = this.state.personne
        person_state[event.target.name] = event.target.value
        this.setState(person_state);
        const patient_dossier_state = this.state.patient_dossier
        patient_dossier_state[event.target.name] = event.target.value
        this.setState(patient_dossier_state);
    }

    handleChange_modif_patient(event) {
        const modif_patient = this.state.modif_modal_data;
        modif_patient[event.target.name] = event.target.value
    }

    handleSubmit_modif_patient(event) {
        this.setState({ show_patient_formulary: false });
        this.resetall();
        Swal.fire({
            type: 'success',
            toast: true,
            title: 'Modification de patient reussi!',
            animation: true,
            position: 'top-right',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        });
    }

    handleSubmit_patient_formulary(event) {
        event.preventDefault();
        Swal.fire({
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
                });
                this.setState({ show_patient_formulary: false })
                this.resetall();
            });
        });
    }

    getAllPatientAujourdhui(page, size) {
        this.setState({ current_page: page });
        fetch(etablissement_url_api + session_id_etab + '/patient/' + page + '/' + size)
            .then((res) => res.json())
            .then(result => {
                this.setState({
                    Persons: result.content
                });
                console.log("patient", this.state.Persons);
            });
    }

    getSimpleStat() {
        fetch(etablissement_url_api + session_id_etab + '/patient/stat')
            .then((res) => res.json())
            .then(result => {
                this.setState({
                    Simplestat: result
                });
                console.log("SIMPLE STAT:", this.state.Simplestat);
            });
    }

    render() {
        const total = this.state.Simplestat.year_count;
        const per_page = parseInt(total / this.state.size);
        const pageNumbers = [];
        for (let i = 1; i <= Math.ceil(per_page); i++) {
            pageNumbers.push(i);
        }
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
                            </div>
                            <div className="az-content-header-right">
                                <Button onClick={() => this.setState({ show_patient_formulary: true })} variant="success btn-rounded btn-with-icon btn-block">
                                    <i className="far fa-check-circle"></i> Nouveu patient
                                </Button>
                            </div>
                        </div>{/* az-dashboard-one-title */}

                        {/* TABLEAU CONTENANT LES LISTE DES PATIENT DEJA PAGINé VIA API  */}
                        <div className="">
                            <table>
                                <thead>
                                    <tr>
                                        {
                                            this.headers.map(function (h) {
                                                return (
                                                    <th key={h.key}>{h.label}</th>
                                                )
                                            })
                                        }
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Persons &&
                                        this.state.Persons.map((item) =>
                                            <tr key={item.id_patient_dossier} title={item.id}>
                                                <td>
                                                    <Link to={"/patient/" + item.id_patient_dossier} title={item.id}>
                                                        {item.nom}
                                                    </Link>
                                                </td>
                                                <td>{item.prenom}</td>
                                                <td>{item.genre}</td>
                                                <td>{item.adresse}</td>
                                                <td>{moment(item.date_naissance).format("L")}</td>
                                                <td>{item.motif}</td>
                                                {/* <td>{moment(item.dateAdmission).format("L")}</td> */}
                                                <td>{moment(item.date_admission).format("DD/MM/YYYY HH:mm:ss")} ({moment(item.date_admission).from(new Date())})</td>
                                                <td>
                                                    <button onClick={() => this.setState({ modif_modal_data: item, show_modif_modal: true })}>Modifier
                                                    </button>
                                                </td>
                                                <td>
                                                    <button onClick={() => this.setState({ modif_modal_data: item, show_hospitalisation_modal: true })}>Hospitaliser
                                                    </button>
                                                </td>
                                            </tr>
                                        )
                                    }
                                </tbody>
                            </table>
                        </div>

                        {/* DIV POUR LA PAGINATION */}
                        <div className="az-dashboard-one-title">
                            <div>
                                <p className="az-dashboard-text"><i>Au total , il y a {this.state.Simplestat.day_count} patient(s) aujourd'hui ({this.state.Simplestat.month_count} pendant ce mois , {this.state.Simplestat.year_count} pendant cet année)  </i></p>
                            </div>
                            <div className="az-content-header-right">
                                <Pagination>
                                    <Pagination.First onClick={() => this.getAllPatientAujourdhui(0, this.state.size)} />
                                    <Pagination.Prev onClick={() => this.getAllPatientAujourdhui(this.state.current_page - 1, this.state.size)} />
                                    {
                                        pageNumbers.map((number) => (
                                            <Pagination.Item key={number}>{number}</Pagination.Item>
                                        ))
                                    }
                                    <Pagination.Next onClick={() => this.getAllPatientAujourdhui(this.state.current_page + 1, this.state.size)} />
                                    <Pagination.Last onClick={() => this.getAllPatientAujourdhui(per_page, this.state.size)} />
                                </Pagination>
                            </div>
                        </div>
                        <hr className="mg-y-30" />
                    </div>{/* bd */}
                </div>

                {/* MODAL FORMULAIRE NOUVEAU PATIENT */}
                < Modal show={this.state.show_patient_formulary} onHide={() => this.setState({ show_patient_formulary: false })
                } size="lg"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <form onSubmit={this.handleSubmit_patient_formulary}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h2><span className="medical-icon-administration" aria-hidden="true"></span> Nouveau Patient</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-lg">
                                <div className="col-lg">
                                    <p className="mg-b-10">Nom</p>
                                    <Form.Control type="text" name="insert_nom" id="insert_nom"
                                        placeholder='Enter le nom'
                                        value={this.state.personne.insert_nom} onChange={this.handleChange_patient_formulary} required />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Prénom</p>
                                    <Form.Control type="text" name="insert_prenom" placeholder="Entrer le prenom" value={this.state.personne.insert_prenom} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Sexe</p>
                                    <Form.Check type="radio" name="insert_genre" value="M" label="Masculin" checked={this.state.personne.insert_genre === 'M'} onChange={this.handleChange_patient_formulary} />
                                    <Form.Check type="radio" name="insert_genre" value="F" label="Féminin" checked={this.state.personne.insert_genre === 'F'} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <hr />
                            <div className="row row-sm">

                                <div className="col-lg">
                                    <p className="mg-b-10">Date de naissance</p>
                                    <Form.Control type="date" name="insert_datenaissance" value={this.state.personne.insert_datenaissance} onChange={this.handleChange_patient_formulary} required />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Numero CIN</p>
                                    <Form.Control type="string" name="insert_cin" placeholder="Entrer Carte d'Identité Nationale" value={this.state.personne.insert_cin} onChange={this.handleChange_patient_formulary} />
                                </div>
                            </div>{/* row */}
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
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="danger" >Reset</Button>
                            <Button variant="secondary" onClick={() => this.setState({ show_patient_formulary: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal >

                {/* MODAL FORMULAIRE MODIFICATION D'UN PATIENT */}
                < Modal show={this.state.show_modif_modal} onHide={() => this.setState({ show_modif_modal: false })
                } size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <form onSubmit={this.handleSubmit_modif_patient}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h2><span className="medical-icon-administration" aria-hidden="true"></span> Modification donnée de patient</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-lg">
                                <div className="col-lg">
                                    <p className="mg-b-10">Date d'admission</p>
                                    <Form.Control type="date" name="modif_date_admission" value={moment(this.state.modif_modal_data.date_admission).format('YYYY-MM-DD')} readOnly />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Heure d'admission</p>
                                    <Form.Control type="time" name="modif_date_admission" value={moment(this.state.modif_modal_data.date_admission).format('HH:mm')} readOnly />
                                </div>{/* col */}
                            </div>
                            <hr />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Nom</p>
                                    <Form.Control type="text" name="modif_nom"
                                        placeholder='Enter le nom'
                                        value={this.state.modif_modal_data.nom} onChange={this.handleChange_modif_patient} required />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Prénom</p>
                                    <Form.Control type="text" name="modif_prenom" placeholder="Entrer le prenom" value={this.state.modif_modal_data.prenom} onChange={this.handleChange_modif_patient} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Sexe</p>
                                    <Form.Check type="radio" name="modif_genre" value="M" label="Masculin" checked={this.state.modif_modal_data.genre === 'M'} onChange={this.handleChange_modif_patient} />
                                    <Form.Check type="radio" name="modif_genre" value="F" label="Féminin" checked={this.state.modif_modal_data.genre === 'F'} onChange={this.handleChange_modif_patient} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Date de naissance</p>
                                    <Form.Control type="date" name="modif_datenaissance" value={moment(this.state.modif_modal_data.datenaissance).format('YYYY-MM-DD')} onChange={this.handleChange_modif_patient} required />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Numero CIN</p>
                                    <Form.Control type="string" name="modif_cin" placeholder="Entrer Carte d'Identité Nationale" value={this.state.modif_modal_data.cin} onChange={this.handleChange_modif_patient} />
                                </div>
                            </div>{/* row */}
                            <hr />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Contact</p>
                                    <Form.Control type="string" name="modif_contact" placeholder="Entrer un contact valide" value={this.state.modif_modal_data.contact} onChange={this.handleChange_modif_patient} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Adresse</p>
                                    <Form.Control type="text" name="modif_adresse" placeholder="Entrer l'adresse" required value={this.state.modif_modal_data.adresse} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <div className="row row-sm mg-b-20">
                                <div className="col-lg">
                                    <p className="mg-b-10">Motif d'entrée</p>
                                    <select name="modif_motif" value={this.state.modif_modal_data.modif_motif} onChange={this.handleChange_patient_formulary}>
                                        {
                                            this.state.Services.map(function (service) {
                                                return (
                                                    <option key={service.id} value={service.nomService}>{service.code + '-' + service.nomService}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_modif_modal: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Modifier</Button>
                        </Modal.Footer>
                    </form>
                </Modal >

                {/* MODAL FORMULAIRE MODIFICATION D'UN PATIENT */}
                < Modal show={this.state.show_hospitalisation_modal} onHide={() => this.setState({ show_hospitalisation_modal: false })
                } size="md"
                    aria-labelledby="contained-modal-title-vcenter"
                    centered>
                    <form onSubmit={this.handleSubmit_modif_patient}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h2><span className="medical-icon-administration" aria-hidden="true"></span> Affectation d'un patient à un lits</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-lg">
                                <div className="col-lg">
                                    <p className="mg-b-10">Date d'admission</p>
                                    <Form.Control type="date" name="modif_date_admission" value={moment(this.state.modif_modal_data.date_admission).format('YYYY-MM-DD')} readOnly />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Heure d'admission</p>
                                    <Form.Control type="time" name="modif_date_admission" value={moment(this.state.modif_modal_data.date_admission).format('HH:mm')} readOnly />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Numero du dossier</p>
                                    <Form.Control type="text" name="modif_nom"
                                        placeholder='Enter le nom'
                                        value={this.state.modif_modal_data.numero_dossier} onChange={this.handleChange_hospitalisation_patient} readOnly />
                                </div>{/* col */}
                            </div>{/* row */}
                            <div className="row row-sm mg-b-20">
                                <div className="col-lg">
                                    <p className="mg-b-10">Chambre et lits</p>
                                    <select name="modif_motif" value={this.state.modif_modal_data.modif_motif} onChange={this.handleChange_patient_formulary}>
                                        <option value="A11">Batiment 1 _ A11</option>
                                    </select>
                                </div>
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_hospitalisation_modal: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Valider</Button>
                        </Modal.Footer>
                    </form>
                </Modal >

            </div >
        );
    }
}
export default ListePatient;
