import React from 'react';
import MenuFichePatient from './MenuFichePatient';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';
import { patient_url_api, etablissement_parametre_url_api, date_now } from '../../service/apiService';
import { Component } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';


class FichePatient extends Component {
    constructor(props) {
        super();
        this.getPatient = this.getPatient.bind(this);
        this.state = {
            id: props.match.params.id,
            show_parameter_formulary: false,
            patient: [],
            parametres: [],
        }
        this.handleSubmit_parameter_formulary = this.handleSubmit_parameter_formulary.bind(this);
    }

    data = {
        labels: ["12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan"],
        datasets: [
            {
                label: "FC",
                // backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            }, {
                label: "FR",
                // backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(55, 99, 22)",
                data: [40, 10, 19, null, 22, 13, 55],
            }, {
                label: "SpO2",
                // backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(12, 29, 52)",
                data: [10, 30, 15, 22, 20, 5, 15],
            },
        ],
    };

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getPatient(id);
        this.getAllParametre();
    }

    getPatient(id) {
        console.log(patient_url_api + id)
        fetch(patient_url_api + id)
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    patient: response
                });
                console.log(response);
            })
    }

    getAllParametre() {
        fetch(etablissement_parametre_url_api)
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    parametres: response
                });
                console.log(response);
            })
    }

    handleSubmit_parameter_formulary(e) {
        e.preventDefault();
        var insert_parametre = [];
        // test sod tsy tao anaty formulaire le parametre
        // izay misy de ajoutena ao am insetr_parametre
        // ajouter avec boucle fotsiny
        this.state.parametres.forEach(param => {
            const object = {
                id_patient_dossier: this.state.patient.id_patient_dossier,
                date_parametre: date_now,
                valeur: e.target['insert_' + param.nomParametre].value,
                id_parametre: param.id
            };
            insert_parametre.push(object);
        });
        console.log(insert_parametre);
    }

    render() {
        const p = this.state.patient;
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <MenuFichePatient />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/patient">Patient </Link> </span>
                            <span>{p.numero_dossier}</span>
                        </div>
                        <div className="row row-sm">
                            <div className="col-sm-8 col-md-6 col-xl-4">
                                <button onClick={() => this.setState({ show_parameter_formulary: true })} className="medical-icon-medical-library" title="Ajouter parametre" aria-hidden="true">
                                    Paramètre
                                </button>
                            </div>
                            <div className="col-sm-8 col-md-6 col-xl-4">
                                <Link to={"/patient/" + p.id_patient_dossier + "/prescription"}>
                                    <button className="medical-icon-health-services" title="Prescrire" aria-hidden="true" >
                                        Fiche de prescription
                                    </button>
                                </Link>
                            </div>
                        </div>
                        <hr />
                        <div className="row row-sm mg-b-20 mg-lg-b-0">
                            <div className="col-lg-6 col-xl-4">
                                <div className="row row-sm">
                                    <div className="col-md-12 col-lg-12 mg-b-20 mg-md-b-0 mg-lg-b-20">
                                        <div className="card card-dashboard-five">
                                            <div className="card-header">
                                                <h6 className="card-title">Informations générales</h6>
                                            </div>{/* card-header */}
                                            <div className="card-body row row-sm">
                                                <div className="col-12">Numéro du dossier : <b>{p.numero_dossier}</b></div>
                                                <div className="col-12">Nom et prenom : <b>{p.nom + " " + p.prenom}</b></div>
                                                <div className="col-12">Sexe : <b>{p.genre}</b></div><br />
                                                <div className="col-12">Age : <b>{p.date_naissance}</b></div>
                                                <div className="col-12">Groupe sanguin  : <b>{p.groupe_sanguin}</b></div>
                                            </div>{/* card-body */}
                                        </div>{/* card-dashboard-five */}
                                    </div>{/* col */}
                                    <div className="col-md-12 col-lg-12 mg-b-20 mg-md-b-0 mg-lg-b-20">
                                        <div className="card card-dashboard-five">
                                            <div className="card-header">
                                                <h6 className="card-title">Hospitalisation</h6>
                                            </div>{/* card-header */}
                                            <div className="card-body row row-sm">
                                                <div className="col-12">Date d'admission : <b>{p.date_admission}</b></div>
                                                <div className="col-12">Motif d'admission: <b>{p.motif}</b></div>
                                            </div>{/* card-body */}
                                        </div>{/* card-dashboard-five */}
                                    </div>{/* col */}
                                </div>{/* row */}
                            </div>{/* col-lg-3 */}
                            <div className="col-lg-7 col-xl-8 mg-t-20 mg-lg-t-0">
                                <div className="card card-table-one">
                                    <h6 className="card-title">Courbe de paramètre journalières</h6>
                                    <p className="az-content-text mg-b-20">
                                        Tout paramètre vitaux qu'il faut tenir chaque jour
                                    </p>
                                    <div className="">
                                        <Line data={this.data} />
                                    </div>{/* table-responsive */}
                                </div>{/* card */}
                            </div>{/* col-lg */}
                        </div>{/* row */}
                    </div>
                </div>

                {/* MODAL FORMULAIRE PARAMETRE MEDICALE */}
                <Modal show={this.state.show_parameter_formulary} onHide={() => this.setState({ show_parameter_formulary: false })}>
                    <form onSubmit={this.handleSubmit_parameter_formulary}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h2><span className="medical-icon-anesthesia" aria-hidden="true"></span> Des parametre vitaux </h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-sm">
                                {
                                    this.state.parametres.map(param => (
                                        <div key={param.id}>
                                            <div className="col-lg">
                                                <p className="mg-b-10">{param.nomParametre}</p>
                                                <Form.Control type="number" name={'insert_' + param.nomParametre}
                                                    placeholder={'Enter ' + param.nomParametre} min={param.minValue} max={param.maxValue} />
                                            </div>
                                        </div>
                                    ))
                                }
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_parameter_formulary: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div >
        );
    }
}
export default FichePatient;