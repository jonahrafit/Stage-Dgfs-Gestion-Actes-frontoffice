import React, { Component } from 'react';
import { Form, Button, Modal } from 'react-bootstrap';
import { url_api } from '../../service/api';
import Swal from 'sweetalert2';

export class FormulairePatient extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            genre: 'M',
            datenaissance: new Date().toISOString().slice(0, 10),
            motif: '',
            numerodossier: '',
            contact: '',
            adresse: '',
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        Swal.fire({
            title: 'Verifier?',
            text: 'Nom: ' + this.state.nom + '\nPrenom: ' + this.state.prenom + '\nGenre:' + this.state.genre,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Oui',
            cancelButtonText: 'Non',
            closeOnConfirm: false
        }).then(() => {
            fetch(url_api + 'personne', {
                method: 'POST',
                body: JSON.stringify({
                    nom: this.state.nom,
                    prenom: this.state.prenom,
                    genre: this.state.genre,
                    contact: this.state.contact,
                    adresse: this.state.adresse,
                    datenaissance: this.state.datenaissance
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                Swal.fire({
                    title: 'Insertion succés',
                    type: 'success',
                })
                window.location.href = '/patient';
            });
        });
    }
    closeModal() {
        window.location.href = '/patient';
    }
    render() {

        return (
            <div>
                <Modal show={this.props.show} onHide={this.closeModal}>
                    <form onSubmit={this.handleSubmit}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h2><span className="medical-icon-administration" aria-hidden="true"></span> Nouveau Patient</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Nom</p>
                                    <Form.Control type="text" name="nom"
                                        placeholder='Enter le nom'
                                        value={this.state.nom} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Prénom</p>
                                    <Form.Control type="text" name="prenom" placeholder="Entrer le prenom" value={this.state.prenom} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Sexe</p>
                                    <Form.Check type="radio" name="genre" value="M" label="Masculin" checked={this.state.genre === 'M'} onChange={this.handleChange} />
                                    <Form.Check type="radio" name="genre" value="F" label="Féminin" checked={this.state.genre === 'F'} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Age</p>
                                    <Form.Control type="number" name="age" id="age" placeholder="Entrer l'âge" value={this.state.age} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Date de naissance</p>
                                    <Form.Control type="date" name="datenaissance" value={this.state.datenaissance} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Contact</p>
                                    <Form.Control type="string" name="contact" placeholder="Entrer un contact valide" value={this.state.contact} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Adresse</p>
                                    <Form.Control type="text" name="adresse" placeholder="Entrer l'adresse" value={this.state.adresse} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <div className="row row-sm mg-b-20">
                                <div className="col-lg">
                                    <p className="mg-b-10">Motif d'entrée</p>
                                    <select name="motif" value={this.state.motif} onChange={this.handleChange}>
                                        <option value="urgence">Urgence</option>
                                        <option value="CE">Consultation externe</option>
                                        <option value="RAD">Radiologie</option>
                                    </select>
                                </div>
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={this.closeModal}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div >
        )
    }
}

export default FormulairePatient;
