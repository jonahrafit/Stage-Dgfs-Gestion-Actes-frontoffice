import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import ComponentsSidebar from '../../components/shared/ComponentsSidebar';
import { Link } from 'react-router-dom';
import { etablissement_service_url_api, personne_patient_url_api, session_id_etab ,etablissement_patient_url_api } from '../../service/api';
import { Form, Modal } from 'react-bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';

class ListePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            Persons: [],
            Services: [],
            show_patient_formulary: false,
            personne: {
                insert_nom: '',
                insert_prenom: '',
                insert_genre: 'M',
                insert_datenaissance: new Date().toISOString().slice(0, 10),
                insert_cin: '',
            },
            patient_dossier: {
                insert_id_etablissment: '',
                insert_motif: 1,
                insert_numerodossier: '',
                insert_contact: '',
                insert_adresse: '',
                insert_id_personne: ''
            },
        };
        this.headers = [
            { key: 'id', label: 'Id' },
            { key: 'nom', label: 'Nom' },
            { key: 'prenom', label: 'Prenom' },
            { key: 'genre', label: 'Genre' },
            { key: 'adresse', label: 'Adresse' },
            { key: 'date_naissance', label: 'Date de naissance' },
            { key: 'motif', label: 'Motif' }
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
                    dateNaissance: this.state.personne.insert_datenaissance,
                    contact: this.state.patient_dossier.insert_contact,
                    adresse: this.state.patient_dossier.insert_adresse,
                    idEtablissement: session_id_etab,
                    motif: this.state.patient_dossier.insert_motif,
                    numerodossier: this.state.patient_dossier.insert_numerodossier,
                    dateAdmission: new Date().toISOString().slice(0, 10),
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                Swal.fire({
                    icon: 'success',
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
                // window.location.href = '/patient';
            });
        });
    }

    componentDidMount() {
        fetch(etablissement_patient_url_api+session_id_etab)
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Persons: result
                });
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
        // if (this.state.Persons && Object.keys(this.state.Persons).length > 0) {

        return (
            <div>
                <div className="container d-flex p-md-0">
                    <ComponentsSidebar />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">

                        <div className="az-content-breadcrumb">
                            <span>Patients</span>
                            <span>Liste</span>
                        </div>
                        <h2 className="az-content-title">Listes des patients Globales</h2>
                        <div className="row row-xs wd-xl-80p">
                            <div className="col-sm-6 col-md-3"><Button onClick={() => this.setState({ show_patient_formulary: true })} variant="az-primary btn-block">Nouveu patient</Button></div>
                        </div>{/* row */}

                        <hr className="mg-y-20" />

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
                                        <th>Age</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Persons.map(function (item, key) {
                                            return (
                                                <tr key={key}>
                                                    <td><Link to="/patient/CHUMET-TEC-15689">{item.id}</Link></td>
                                                    <td>{item.nom}</td>
                                                    <td>{item.prenom}</td>
                                                    <td>{item.genre}</td>
                                                    <td>{item.adresse}</td>
                                                    <td>{moment(item.dateNaissance).format("L")}</td>
                                                    <td>{item.contact}</td>
                                                    <td>{moment(item.dateNaissance).fromNow()}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                {/* MODAL FORMULAIRE NOUVEAU PATIENT */}
                <Modal show={this.state.show_patient_formulary} onHide={() => this.setState({ show_patient_formulary: false })}>
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
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Numero CIN</p>
                                    <Form.Control type="string" name="insert_cin" placeholder="Entrer Carte d'Identité Nationale" value={this.state.personne.insert_cin} onChange={this.handleChange_patient_formulary} />
                                </div>{/* col */}
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
                                                    <option key={service.id} value={service.id}>{service.code + '-' + service.nomService}</option>
                                                )
                                            })
                                        }
                                    </select>
                                </div>
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_patient_formulary: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div>
        );
        // }
        // else {
        //     return (
        //         <>
        //             <div className="container d-flex p-md-0">
        //                 <ComponentsSidebar />
        //                 <div className="az-content-body pd-lg-l-40 d-flex flex-column">
        //                     <div className="az-content-breadcrumb">
        //                         <span>Patients</span>
        //                         <span>Liste</span>
        //                     </div>
        //                     <h2 className="az-content-title">Listes des patients Globales</h2>
        //                     <div className="row row-xs wd-xl-80p">
        //                         <div className="col-sm-6 col-md-3"><Button onClick={() => this.setState({ show: true })} variant="az-primary btn-block">Nouveu patient</Button></div>
        //                     </div>{/* row */}
        //                 </div>
        //             </div>
        //         </>
        //     );
        // }
    }
}
export default ListePatient;
