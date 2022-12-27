import React, { Component } from 'react'
import { patient_url_api, etablissement_parametre_url_api } from '../../service/apiService';
import { Link } from 'react-router-dom';
import Menu from './Menu';
import moment from 'moment';
import { Modal, Form, Button, Tabs, Tab, Table, ProgressBar } from 'react-bootstrap';
import { Line } from 'react-chartjs-2';
import Swal from 'sweetalert2';
import authHeader from '../../service/auth-header';
import PatientService from '../../service/PatientService';

export default class PatientParametre extends Component {
    constructor(props) {
        super();
        this.state = {
            id_patient_dossier: props.match.params.id,
            nombre_jour_stat: 5,
            patient: [],
            parametres: [],
            parametres_dossier: [],
            modal_data: [],
        }
        this.getAllParametreDossier = this.getAllParametreDossier.bind(this);
        this.getParameterChartData = this.getParameterChartData.bind(this);
        this.handleSubmit_parameter_formulary = this.handleSubmit_parameter_formulary.bind(this);
    }

    componentDidMount() {
        PatientService.getPatient(this.props.match.params.id).then(response => { this.setState({ patient: response }); })
        this.getAllParametre();
        this.getParameterChartData(this.state.id_patient_dossier, this.state.nombre_jour_stat);
        this.getAllParametreDossier(this.state.id_patient_dossier);
    }

    getAllParametre() {
        fetch(etablissement_parametre_url_api, { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    parametres: response
                });
                console.log("Etablissement parametre", response);
            })
    }

    reset() {
        this.setState({
            insert_parametre: ''
        })
    }

    getAllParametreDossier(id_patient_dossier) {
        fetch(patient_url_api + id_patient_dossier + '/parametre/tous', { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    parametres_dossier: response
                })
            })
    }

    getParameterChartData(id_patient_dossier, nombre_jour) {
        fetch(patient_url_api + id_patient_dossier + "/parametre/nbj-" + nombre_jour, { headers: authHeader() })
            .then((result) => result.json())
            .then(res => {
                console.log("parametre data chart ", res)
                let labels = res.listedate.reverse();
                let datasets = [];
                let datasets_tab = res.datasets;
                for (const element of Array.from(datasets_tab)) {
                    let temp = element;
                    datasets.push({
                        'label': temp[0],
                        'data': temp.splice(2, temp.length).reverse(),
                        'borderColor': temp[1],
                        'borderWidth': 1,
                        'fill': false
                    })
                }
                console.log("datasets", datasets);
                this.setState({
                    parameter_chart_data: {
                        labels: labels,
                        datasets: datasets,
                    }
                });
            });
    }
    handleSubmit_parameter_formulary(event) {
        event.preventDefault();
        const idpd = event.target.insert_id_patient_dossier.value;
        const idp = event.target.insert_id_parametre.value;
        const v = event.target.insert_parametre.value;
        fetch(patient_url_api + idpd + '/parametre/', {
            method: 'POST',
            body: JSON.stringify({
                id_patient_dossier: idpd,
                id_parametre: idp,
                date_parametre: new Date(),
                valeur: v,
            }),
            headers: authHeader(),
        }).then((res) => {
            Swal.fire({
                type: 'success',
                toast: true,
                title: 'Insertion d une parametre reussi',
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
            this.setState({ show_parameter_formulary: false })
            this.reset();
            this.getParameterChartData(this.state.id_patient_dossier, this.state.nombre_jour_stat);
            this.getAllParametreDossier(this.state.id_patient_dossier);
        }).catch((err) => {
            console.log(err);
        });
    }

    render() {
        const patient = this.state.patient;
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/patient">Patient </Link> </span>
                            <span><Link to={'/patient/' + patient.id}>{patient.numero_dossier}</Link> </span>
                            <span>Paramètre </span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            <Menu patient={patient} />
                            <div className="col-lg-12 mg-b-10">
                                <hr />
                                <div className="row">
                                    <div className="col-md-3 row-sm mg-b-5" >
                                        <div className="card card-dashboard-one">
                                            <div className="card-body">
                                                {
                                                    this.state.parametres.map((param) =>
                                                        <div key={param.id}>
                                                            <button onClick={() => this.setState({ show_parameter_formulary: true, modal_data: param })}> {param.nomParametre} </button>
                                                        </div>
                                                    )
                                                }
                                            </div>{/* card-body */}
                                        </div>{/* card */}
                                        <Modal show={this.state.show_parameter_formulary} onHide={() => this.setState({ show_parameter_formulary: false })}>
                                            <form onSubmit={this.handleSubmit_parameter_formulary}>
                                                <Modal.Header closeButton>
                                                    <Modal.Title>
                                                        <h2>
                                                            {this.state.modal_data.nomParametre}
                                                        </h2>
                                                    </Modal.Title>
                                                </Modal.Header>
                                                <Modal.Body>
                                                    <div className="row row-sm">
                                                        <Form.Control type="hidden" name="insert_id_patient_dossier" value={patient.id_patient_dossier} />
                                                        <Form.Control type="hidden" name="insert_id_parametre" value={this.state.modal_data.id} />
                                                        Entre la valeur : <br />
                                                        <div className="col-lg-5">
                                                            <Form.Control type="text" name="insert_parametre" value={this.state.insert_parametre} onChange={(e) => this.setState({ insert_parametre: e.target.value })} />
                                                        </div>{/* col */}
                                                    </div>{/* row */}
                                                </Modal.Body>
                                                <Modal.Footer>
                                                    <Button variant="secondary" onClick={() => this.setState({ show_parameter_formulary: false })}>Annuler</Button>
                                                    <Button type="submit" variant="primary">Inserer</Button>
                                                </Modal.Footer>
                                            </form>
                                        </Modal>
                                    </div >
                                    <hr />
                                    <div className="col-md-9 col-sm-12">
                                        <Tabs defaultActiveKey="tableau" id="uncontrolled-tab-example" className="mb-10 row-sm">
                                            <Tab eventKey="tableau" title="Tableau">
                                                <i>ETO AMPIO COLONNE MITENY NY EVOLUTION PAR RAPPORT AM TEO ALOHA HOE NIAKATRA SA NIDINA</i>
                                                <br />
                                                <br />
                                                <Table hover className="mg-b-0">
                                                    <thead>
                                                        <tr>
                                                            <th scope="row">&nbsp;</th>
                                                            <td>Nom du parametre</td>
                                                            <td>Valeur</td>
                                                            <td>Date de prise de parametre</td>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {
                                                            this.state.parametres_dossier.map(function (item, key) {
                                                                return (
                                                                    <tr key={key}>
                                                                        <th scope="row">{item.id}</th>
                                                                        <td>{item.parametre.nomParametre}</td>
                                                                        <td>{item.valeur}</td>
                                                                        <td>{moment(item.dateParametre).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                                    </tr>
                                                                )
                                                            })
                                                        }
                                                    </tbody>
                                                </Table>
                                            </Tab>
                                            <Tab eventKey="courbe" title="Courbe">
                                                <div className="row row-sm mg-b-20">
                                                    <div className="col-lg-12">
                                                        <div className="card card-dashboard-one">
                                                            <div className="card-header">
                                                                <div>
                                                                    <h6 className="card-title">Evolution durant <i>(05) jours derniers </i> </h6>
                                                                </div>
                                                                <div className="btn-group">
                                                                    <button className="btn active">Day</button>
                                                                    <button className="btn">Week</button>
                                                                    <button className="btn">Month</button>
                                                                </div>
                                                            </div>{/* card-header */}
                                                            <div className="card-body">
                                                                {!this.state.parameter_chart_data ? (
                                                                    <ProgressBar />
                                                                ) : (
                                                                    <Line data={this.state.parameter_chart_data} />
                                                                )}
                                                            </div>{/* card-body */}
                                                        </div>{/* card */}
                                                    </div>{/* col */}
                                                </div>
                                            </Tab>
                                        </Tabs>
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
