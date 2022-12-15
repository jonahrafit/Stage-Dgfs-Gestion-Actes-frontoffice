import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { patient_url_api, patient_parametre_url_api } from '../../service/apiService';
import { Tabs, Tab, Button } from 'react-bootstrap';
import Swal from 'sweetalert2';
import moment from 'moment';
import Parametre from './Parametre';
import Menu from './Menu';

export default class Patient extends Component {

    constructor(props) {
        super();
        this.state = {
            id_patient_dossier: props.match.params.id,
            nombre_jour_stat: 5,
            patient: [],
            parametres_dossier: []
        }
        this.getPatient = this.getPatient.bind(this);
        this.getAllParametreDossier = this.getAllParametreDossier.bind(this);
        this.handleSubmit_parameter_formulary = this.handleSubmit_parameter_formulary.bind(this);
    }

    componentDidMount() {
        const id_patient_dossier = this.props.match.params.id;
        this.getPatient(id_patient_dossier);
        this.getAllParametreDossier(id_patient_dossier);
    }

    handleSubmit_parameter_formulary(e) {
        e.preventDefault();
        let insert_parametre = [];
        this.state.parametres_dossier.forEach(param => {
            let nom_input = param.nomParametre.replace(" ", "_").toLowerCase();
            const object = {
                id_patient_dossier: this.state.patient.id_patient_dossier,
                date_parametre: e.target['insert_date_parametre'].value,
                valeur: e.target['insert_' + nom_input].value,
                id_parametre: param.id
            };
            insert_parametre.push(object);
        });
        console.log("Insert parametre", insert_parametre);
        insert_parametre.forEach(i_p => {
            fetch(patient_parametre_url_api, {
                method: 'POST',
                body: JSON.stringify({
                    id_patient_dossier: i_p.id_patient_dossier,
                    date_parametre: i_p.date_parametre,
                    valeur: i_p.valeur,
                    id_parametre: i_p.id_parametre
                }),
                headers: {
                    "Content-type": "application/json; charset=UTF-8"
                }
            }).then(response => {
                Swal.fire({
                    type: 'success',
                    toast: true,
                    title: 'Insertion de parametres_dossier reussi!',
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
            });
        })
        this.setState({ show_parameter_formulary: false });
        this.getParameterChartData(this.state.id, this.state.nombre_jour_stat);
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

    getAllParametreDossier(id_patient_dossier) {
        fetch(patient_parametre_url_api + id_patient_dossier + '/tous')
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    parametres_dossier: response
                })
            })
    }

    setStateOfParametreDossier = (value) => {
        this.setState({ parametres_dossier: value });
    }

    render() {
        const p = this.state.patient;
        const param = this.state.parametres_dossier;
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/patient">Patient </Link> </span>
                            <span>{p.numero_dossier}</span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            <Menu patient={p} />
                            <div className="col-lg-12 mg-b-10">
                                <div className="row">
                                    <div className="px-3 ">
                                        <span className="country-name text-dark d-block font-weight-bold">Numero du dossier:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Nom et prénom :</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Date et lieu de naissance:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Sexe :</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Age :</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Adresse / Contact:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Date d'admission:</span>
                                        <span className="country-name text-dark d-block font-weight-bold">Motif:</span>
                                    </div>
                                    <div className="px-3">
                                        <span className="country-name text-dark d-block font-weight-bold">{p.numero_dossier}</span>
                                        <span className="country-name text-dark d-block font-weight-bold">{p.nom + " " + p.prenom}</span>
                                        <span className="country-region text-secondary text-toLowerCase"><i>{moment(p.date_naissance).format('L')}</i></span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{p.genre} </span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{moment(p.date_admission).format('Y') - moment(p.date_naissance).format('Y')} ans</span>
                                        <span className="country-region text-secondary text-uppercase-first d-block">{p.adresse + ' / ' + p.contact}</span>
                                        <span className="country-region text-secondary text-toLowerCase"><i>{moment(p.date_admission).format('L') + ' (' + moment(p.date_admission).fromNow() + ')'}</i></span>
                                        <span className="country-name text-dark d-block font-weight-bold">{p.motif}</span>
                                    </div>
                                </div>
                            </div>
                            <div className="col-lg-12 mg-b-10">
                                <Tabs
                                    defaultActiveKey="profil"
                                    id="noanim-tab-example"
                                    className="mb-1 row-sm">
                                    <Tab eventKey="profil" title="Profils">
                                        <div className="row">
                                            <div className="px-3 ">
                                                <span className="country-name text-dark d-block font-weight-bold">Numero du dossier:</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Nom et prénom :</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Date et lieu de naissance:</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Sexe :</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Age :</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Adresse / Contact:</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Date d'admission:</span>
                                                <span className="country-name text-dark d-block font-weight-bold">Motif:</span>
                                            </div>
                                            <div className="px-3">
                                                <span className="country-name text-dark d-block font-weight-bold">{p.numero_dossier}</span>
                                                <span className="country-name text-dark d-block font-weight-bold">{p.nom + " " + p.prenom}</span>
                                                <span className="country-region text-secondary text-toLowerCase"><i>{moment(p.date_naissance).format('L')}</i></span>
                                                <span className="country-region text-secondary text-uppercase-first d-block">{p.genre} </span>
                                                <span className="country-region text-secondary text-uppercase-first d-block">{moment(p.date_admission).format('Y') - moment(p.date_naissance).format('Y')} ans</span>
                                                <span className="country-region text-secondary text-uppercase-first d-block">{p.adresse + ' / ' + p.contact}</span>
                                                <span className="country-region text-secondary text-toLowerCase"><i>{moment(p.date_admission).format('L') + ' (' + moment(p.date_admission).fromNow() + ')'}</i></span>
                                                <span className="country-name text-dark d-block font-weight-bold">{p.motif}</span>
                                            </div>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="parametre" title="Paramètre">
                                        <Parametre patient={p} parametre_dossier={param} setStateOfParent={this.setStateOfParent} />
                                    </Tab>
                                    <Tab eventKey="prescription" title="Prescription médicale">
                                        <div className="col-sm-6 col-md-4">
                                            <Link to={'/patient/' + p.id_patient_dossier + '/prescription'}>
                                                <Button variant="outline-success btn-rounded btn-block">Voir plus en details </Button>
                                            </Link>
                                        </div>
                                    </Tab>
                                    <Tab eventKey="histoire" title="Histoire de la maladie">+ Histoire de la maladie </Tab><br />
                                    <Tab eventKey="Biometrie" title="Biometrie">+ Biomètrie </Tab><br />
                                    <Tab eventKey="hypothese" title="hypothese diagnostic">+ Paramètre vitaux </Tab><br />
                                </Tabs>
                            </div>{/* col */}
                        </div>{/* col */}
                    </div>
                </div>
            </div>
        )
    }
}
