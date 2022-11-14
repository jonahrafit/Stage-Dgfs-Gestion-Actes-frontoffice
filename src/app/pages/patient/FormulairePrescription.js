import React, { Component } from 'react';
import MenuFichePatient from './MenuFichePatient';
import { Form } from 'react-bootstrap';
import { Button } from 'react-bootstrap';
import Select from 'react-select';

class FormulairePrescription extends Component {
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
                            <span>prescription</span>
                        </div>
                        <div className="az-content-label mg-b-5">Rakotomndrinda Jean / 24ans / CHUMET-30-156795</div>
                        <h2 className="az-content-label mg-b-5">Fomulaire de prescription médicale</h2>

                        <form onSubmit={this.handleSubmit}>
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
                            <hr className="mg-y-5" />
                            <div className="row row-xs wd-xl-80p">
                                <div className="col-sm-6 col-md-6">
                                    <Button type="submit" variant="primary btn-block">Valider la prescription</Button>
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

export default FormulairePrescription;
