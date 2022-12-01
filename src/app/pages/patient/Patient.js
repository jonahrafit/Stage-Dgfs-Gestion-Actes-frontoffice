import React, { Component } from 'react'
import { Link } from 'react-router-dom';
import { Information } from '../generalpage/Function';
import { patient_url_api, etablissement_parametre_url_api, date_now, patient_parametre_url_api } from '../../service/apiService';
import { Form, Modal, Button, ProgressBar } from 'react-bootstrap';
import Swal from 'sweetalert2';
import { Line } from 'react-chartjs-2';
import moment from 'moment';

export default class Patient extends Component {

    constructor(props) {
        super();
        this.state = {
            show: "apropos",
            id: props.match.params.id,
            nombre_jour_stat: 5,
            patient: [],
            parametres: []
        }
        this.getPatient = this.getPatient.bind(this);
        this.handleSubmit_parameter_formulary = this.handleSubmit_parameter_formulary.bind(this);
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        this.getPatient(id);
        this.getAllParametre();
        this.getParameterChartData(id, this.state.nombre_jour_stat);
    }

    getAllParametre() {
        fetch(etablissement_parametre_url_api)
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    parametres: response
                });
                console.log("etablissement parametre", response);
            })
    }

    handleSubmit_parameter_formulary(e) {
        e.preventDefault();
        let insert_parametre = [];
        // test sod tsy tao anaty formulaire le parametre
        // izay misy de ajoutena ao am insetr_parametre
        // ajouter avec boucle fotsiny
        this.state.parametres.forEach(param => {
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
                    title: 'Insertion de parametres reussi!',
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
        this.setState({ show_parameter_formulary: false })
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

    getParameterChartData(id_patient_dossier, nombre_jour) {
        console.log(patient_parametre_url_api + id_patient_dossier + "/nbj-" + nombre_jour);
        fetch(patient_parametre_url_api + id_patient_dossier + "/nbj-" + nombre_jour)
            .then((result) => result.json())
            .then(res => {
                let labels = res[0].reverse();
                let datasets = [];
                for (let i = 1; i < Array.from(res).length; i++) {
                    let temp = Array.from(res)[i];
                    datasets.push({
                        'label': 'label',
                        'data': temp,
                        'borderColor': 'red',
                        'borderWidth': 1,
                        'fill': false
                    })

                }
                this.setState({
                    parameter_chart_data: {
                        labels: labels,
                        datasets: datasets,
                    }
                });
            });
    }

    render() {
        const p = this.state.patient;
        moment.locale('fr');
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/patient">Patient </Link> </span>
                            <span>{p.numero_dossier}</span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            <div className="col-lg-12 mg-b-10">
                                <div className="card">
                                    <div className="card-body row">
                                        <div className="col-md-2 col-sm-4 d-flex align-items-center">
                                            <div className="az-header-profile">
                                                <div className="az-img-user">
                                                    <img src={require("../../../assets/images/img1.jpg")} alt="" ></img>
                                                </div>
                                                <h6>{p.nom + " " + p.prenom}</h6>
                                                <span>24 ans</span>
                                            </div>
                                        </div>{/* col */}
                                        <div className="col-md-4 col-sm-8">
                                            <h3>Informations <i className="far fa-edit"></i></h3>
                                            <Information labelname="Nom" labelvalue={p.nom} />
                                            <Information labelname="Prenom" labelvalue={p.prenom} />
                                            <Information labelname="Date de naissance" labelvalue={moment(p.date_naissance).format('LL')} />
                                            <Information labelname="Genre" labelvalue={p.genre} />
                                            <Information labelname="Groupe sanguin" labelvalue={p.groupe_sanguin} />
                                            <Information labelname="Adresse" labelvalue={p.adresse} />
                                            <Information labelname="Contact" labelvalue={p.contact} />
                                        </div>{/* col */}
                                        <div className="col-md-6 col-lg-5">
                                            <h3>Admission</h3>
                                            <Information labelname="Numero du dossier" labelvalue={p.numero_dossier} />
                                            <Information labelname="Date d'admission" labelvalue={moment(p.date_admission).format('L')} />
                                            <Information labelname="Heure d'admission" labelvalue={p.heure_admission} />
                                            <Information labelname="Motif" labelvalue={p.motif} />
                                            <Information labelname="Mode de reference" labelvalue={p.reference} />
                                            <hr />
                                            <h3>Notes <i className="far fa-edit"></i></h3>
                                            <i>(Aucune note pour ce patient)</i>
                                        </div>{/* col */}
                                    </div>{/* card-body */}
                                </div>{/* card-dashboard-four */}
                            </div>{/* col */}
                            <div className="col-lg-12 mg-b-10">
                                <div className="card">
                                    <div className="card-body row">
                                        <div className="col-md-4 border-right border-dark">
                                            <Button variant="outline-light btn-rounded btn-block" onClick={() => this.setState({ show_parameter_formulary: true })}
                                                className="medical-icon-medical-library" title="Ajouter parametre" aria-hidden="true">
                                                Paramètre</Button>
                                            <br />
                                            <Link to={"/patient/" + p.id_patient_dossier + "/prescription"}>
                                                <Button variant="outline-light btn-rounded btn-block" className="medical-icon-health-services">
                                                    Fiche de prescription
                                                </Button>
                                            </Link>
                                            <br />
                                            <Button variant="outline-light btn-rounded btn-block">+ Histoire de la maladie </Button><br />
                                            <Button variant="outline-light btn-rounded btn-block">+ Biomètrie </Button><br />
                                            <Button variant="outline-light btn-rounded btn-block">+ Paramètre vitaux </Button><br />
                                            <Button variant="outline-light btn-rounded btn-block">+ Hypothèse diagnostic </Button><br />
                                        </div>
                                        <div className="col-lg-8 ht-lg-100p">
                                            <div className="card card-dashboard-one">
                                                <h6 className="card-title">Courbe de paramètre journalières <i>((05) jours derniers )</i> </h6>
                                                <p className="az-content-text mg-b-20">
                                                    Tout paramètre vitaux qu'il faut tenir chaque jour
                                                </p>
                                                <div className="card-body">
                                                    {!this.state.parameter_chart_data ? (
                                                        <ProgressBar />
                                                    ) : (
                                                        <Line data={this.state.parameter_chart_data} />
                                                    )}
                                                </div>
                                            </div>{/* card */}
                                        </div>{/* col */}
                                    </div>{/* col */}
                                </div>{/* card-body */}
                            </div>{/* card-dashboard-four */}
                        </div>{/* col */}
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
                            <div className="row">
                                {
                                    this.state.parametres.map(param => (
                                        <div key={param.id}>
                                            <div className="col-12">
                                                <p className="mg-b-10">{param.nomParametre}</p>
                                                <Form.Control type="number" name={'insert_' + param.nomParametre.replace(" ", "_").toLowerCase()}
                                                    placeholder={'Enter ' + param.nomParametre} min={param.minValue} max={param.maxValue} />
                                            </div>
                                        </div>
                                    ))
                                }
                                {/* <Link> + Ajouter nouveau parametre </Link> */}
                                <div className="col-lg">
                                    <Form.Control type="hidden" name="insert_date_parametre" value={date_now} />
                                </div>{/* col */}
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_parameter_formulary: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div >

        )
    }
}
