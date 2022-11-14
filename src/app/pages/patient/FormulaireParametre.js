import React, { Component } from 'react';
import { url_api } from '../../service/api';
import MenuFichePatient from './MenuFichePatient';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import { Swal } from 'sweetalert2-react';

class FormulaireParametre extends Component {
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
                // if (response.status === 201) {
                // }
            });
        });
    }
    
    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <MenuFichePatient />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Patient</span>
                            <span>CHUMET-30-156795</span>
                            <span>paramètre</span>
                        </div>
                        <div className="az-content-label mg-b-5">Rakotomndrinda Jean / 24ans / CHUMET-30-156795</div>
                        <h2 className="az-content-label mg-b-5">Fomulaire d'ajout des paramètres</h2>

                        <form onSubmit={this.handleSubmit}>
                            <div className="row row-sm">
                                <hr className="mg-y-5" />
                                <div className="col-lg">
                                    <p className="mg-b-10">Température(°)</p>
                                    <Form.Control type="number" name="temperatrue"
                                        placeholder='Enter la temperature'
                                        value={this.state.temperature} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Tension Artérielle(cmHg)</p>
                                    <Form.Control type="number" name="tension_arterielle" placeholder="Entrer la tension artérielle" value={this.state.tension_arterielle} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Frequence respiratoire(/min)</p>
                                    <Form.Control type="number" name="freq_resp" placeholder="Entrer la frequence respiratoire par minute" value={this.state.freq_resp} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}

                            <hr className="mg-y-5" />
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">Glycémie</p>
                                    <Form.Control type="number" name="glycemie" placeholder="Entrer le taux de glycémie" value={this.state.glycemie} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">Frequence cardique(/min)</p>
                                    <Form.Control type="number" name="freq_cardk" placeholder="Entrer la frequence cardique par minute" value={this.state.freq_cardk} onChange={this.handleChange} />
                                </div>{/* col */}
                                <div className="col-lg">
                                    <p className="mg-b-10">PeakFlow</p>
                                    <Form.Control type="number" name="peakflow"
                                        placeholder='Enter la peakflow'
                                        value={this.state.peakflow} onChange={this.handleChange} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <hr className="mg-y-5" />
                            <div className="row row-xs wd-xl-80p">
                                <div className="col-sm-6 col-md-3">
                                    <Button type="submit" variant="primary btn-block">Insérer</Button>
                                </div>
                            </div>
                        </form>
                        <hr />
                        <h3>Courbe</h3>
                    </div>
                </div>
            </div>
        );
    }
}

export default FormulaireParametre;
