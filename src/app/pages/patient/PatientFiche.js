import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import Menu from './Menu';
import { patient_url_api } from '../../service/apiService';
import moment from 'moment';

export default class PatientFiche extends Component {
    constructor(props) {
        super();
        this.state = {
            id_patient_dossier: props.match.params.id,
            patient: [],
            parametres_dossier: []
        }
        this.getPatient = this.getPatient.bind(this);
    }

    componentDidMount() {
        this.getPatient(this.state.id_patient_dossier);
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
                            <span>{patient.numero_dossier}</span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            <Menu patient={patient} />
                            <div className="col-lg-12 mg-b-10">
                                <hr />
                                <div className="row">
                                    <div className="px-3 ">
                                        <span className="country-name text-dark d-block font-weight-bold">Numero du dossier:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Nom et prénom :</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Date et lieu de naissance:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Sexe :</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Age :</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Adresse:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Contact:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Date et Heure d'admission:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Motif:</span>
                                    </div>
                                    <div className="px-3">
                                        <span className="country-name text-dark d-block font-weight-bold">{patient.numero_dossier}</span>
                                        <span className="country-name text-dark d-block font-weight-bold">{patient.nom + " " + patient.prenom}</span>
                                        <span className="country-region text-secondary text-uppercase-first d-block"><i>{moment(patient.date_naissance).format('L')}</i></span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{patient.genre} </span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{moment(patient.date_admission).format('Y') - moment(patient.date_naissance).format('Y')} ans</span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{patient.adresse}</span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{patient.contact}</span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{moment(patient.date_admission).format('DD/MM/YYYY HH:mm:ss')} <i>{' (' + moment(patient.date_admission).fromNow() + ')'}</i></span>
                                        <span className="country-name text-dark d-block font-weight-bold">{patient.motif}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
