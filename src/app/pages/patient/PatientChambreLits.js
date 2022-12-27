import React, { Component } from 'react'
import { patient_url_api, etablissement_url_api, session_id_etab } from '../../service/apiService';
import authHeader from '../../service/auth-header';
import { Link } from 'react-router-dom';
import { Table, Modal, Alert, Button } from 'react-bootstrap';
import Menu from './Menu';
import Swal from 'sweetalert2';
import moment from 'moment';
import PatientService from '../../service/PatientService';
import * as Icon from 'react-icons/bs';

export default class PatientChambreLits extends Component {
    constructor(props) {
        super();
        this.state = {
            id_patient_dossier: props.match.params.id,
            patient: [],
            all_data_batiment: [],
            all_batiment: [],
            all_batiment_chambre: [],
            all_batiment_chambre_lit: [],
            show_admission_chambre_modal: false,
            admission_chambre: {
                numero_batiment: '',
                numero_chambre: '',
                numero_lit: ''
            },
            patient_temp: [],
            hospitalisation_chambres: []
        }
        this.handleChange_admission = this.handleChange_admission.bind(this);
        this.handleSubmit_admission = this.handleSubmit_admission.bind(this);
    }

    componentDidMount() {
        PatientService.getPatient(this.props.match.params.id).then(response => { this.setState({ patient: response }); })
        this.getAllBatimentWithTheirChambre(session_id_etab);
        this.getListeHospitalisation();
    }

    reset_form_admission_chambre() {
        this.setState({
            admission_chambre: {
                numero_batiment: '',
                numero_chambre: '',
                numero_lit: ''
            },
            all_batiment_chambre: [],
            all_batiment_chambre_lit: []
        })
    }
    // componentDidUpdate() {
    //     console.log("1 _ ALL BATIMENT", this.state.all_batiment);
    //     console.log("2 _ All BATIMENT CHAMBRE", this.state.all_batiment_chambre);
    //     console.log("3 _ All BATIMENT CHAMBRE LIT", this.state.all_batiment_chambre_lit);
    // }

    handleChange_admission(event) {
        event.preventDefault();
        const admission_chambre_state = this.state.admission_chambre;
        admission_chambre_state[event.target.name] = event.target.value;
        this.setState(admission_chambre_state);
        const id_b = this.state.admission_chambre.numero_batiment;
        let new_all_batiment_chambre = [];

        if (id_b !== null) {
            new_all_batiment_chambre = this.state.all_data_batiment
                .filter(temp =>
                    temp.id_batiment.toString() === id_b.toString() &&
                    temp.id_patient_dossier === null);
            this.setState({
                all_batiment_chambre:
                    Array.from(new Set(new_all_batiment_chambre.map(item => item.id_chambre)))
                        .map(id => {
                            return { id_chambre: id, nom_chambre: new_all_batiment_chambre.find(s => s.id_chambre === id).nom_chambre };
                        })
            });
        };

        const id_chambre = this.state.admission_chambre.numero_chambre;
        let new_all_batiment_chambre_lit = new_all_batiment_chambre.filter(temp => temp.id_chambre.toString() === id_chambre.toString());
        this.setState({
            all_batiment_chambre_lit:
                Array.from(new Set(new_all_batiment_chambre_lit.map(item => item.id_lit)))
                    .map(id => {
                        return { id_lit: id, nom_lit: new_all_batiment_chambre_lit.find(s => s.id_lit === id).nom_lit };
                    })
        });
    }

    handleSubmit_admission(event) {
        event.preventDefault();
        if (this.state.admission_chambre.numero_batiment.length === 0 ||
            this.state.admission_chambre.numero_chambre.length === 0 ||
            this.state.admission_chambre.numero_lit.length === 0) {
            alert("mbola misy null de tsy mety io e");
        }
        else {
            fetch(patient_url_api + this.state.id_patient_dossier + '/hospitalisation', {
                method: 'POST',
                body: JSON.stringify({
                    id_etablissement: session_id_etab,
                    id_patient_dossier: this.state.id_patient_dossier,
                    id_batiment: this.state.admission_chambre.numero_batiment,
                    numero_chambre: this.state.admission_chambre.numero_chambre,
                    numero_lit: this.state.admission_chambre.numero_lit,
                    date_debut: new Date(),
                    date_fin: null
                }),
                headers: authHeader(),
            }).then((res) => {
                if (res.status === 201 || res.status === 200) {
                    console.log(res);
                    Swal.fire({
                        type: 'success',
                        toast: true,
                        title: 'Admission vers un nouveau chambre reussi',
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
                    this.getAllBatimentWithTheirChambre(session_id_etab);
                    this.getListeHospitalisation();
                    this.reset_form_admission_chambre();
                }
                else {
                    Swal.fire({
                        type: 'error',
                        toast: true,
                        title: res.status,
                        position: 'top-right',
                        timer: 3000,
                        showConfirmButton: false,
                        timerProgressBar: true,
                        didOpen: (toast) => {
                            toast.addEventListener('mouseenter', Swal.stopTimer)
                            toast.addEventListener('mouseleave', Swal.resumeTimer)
                        }
                    })
                }
                this.setState({ show_admission_chambre_modal: false });
            })
        }
    }

    getListeHospitalisation() {
        fetch(patient_url_api + this.state.id_patient_dossier + '/hospitalisation/' + session_id_etab, { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                console.log("Hospitalisation CHAMBRES", response);
                this.setState({
                    hospitalisation_chambres: response
                });
            })
    }

    getAllBatimentWithTheirChambre(id_etablissement) {
        fetch(etablissement_url_api + id_etablissement + '/batiment', { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                const result = response.filter(resp => resp.id_patient_dossier === null);
                this.setState({
                    all_data_batiment: result,
                    all_batiment: Array.from(new Set(result.map(item => item.id_batiment)))
                        .map(id => {
                            return { id_batiment: id, nom_batiment: result.find(s => s.id_batiment === id).nom_batiment, sigle: result.find(s => s.id_batiment === id).sigle };
                        })
                });
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
                            <span><Link to={'/patient/' + patient.id}>{patient.numero_dossier}</Link> </span>
                            <span>Chambre et lits </span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            <Menu patient={patient} />
                            <div className="col-lg-12 mg-b-10">
                                <hr />
                                <p className="mg-b-20"> <button onClick={() => this.setState({ show_admission_chambre_modal: true })} >Admir vers une nouvelle chambre</button></p>
                                <div className="table-responsive">
                                    <Table className="mg-b-0 table table-bordered border-primary">
                                        <thead>
                                            <tr>
                                                <th>Batiment</th>
                                                <th>Chambre</th>
                                                <th>Lits</th>
                                                <th>Date entrée</th>
                                                <th>Date sortie
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                this.state.hospitalisation_chambres &&
                                                this.state.hospitalisation_chambres.map((hch) =>
                                                    <tr key={hch.id} title={hch.id_batiment}>
                                                        <td>{hch.batiment.sigle}</td>
                                                        <td>{hch.chambre.nomChambre}</td>
                                                        <td>{hch.lit.nom}</td>
                                                        <td>{moment(hch.date_debut).format("DD/MM/YYYY HH:mm:ss")}</td>
                                                        <td>{hch.date_sortie ? moment(hch.date_sortie).format("DD/MM/YYYY HH:mm:ss") : ''}</td>
                                                    </tr>
                                                )
                                            }
                                        </tbody>
                                    </Table>
                                </div>{/* table-responsive */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* MODAL ADMISSION VERS UNE CHAMBRE */}
                <Modal show={this.state.show_admission_chambre_modal} onHide={() => this.setState({ show_admission_chambre_modal: false })} size="md" aria-labelledby="contained-modal-title-vcenter" centered>
                    <form onSubmit={this.handleSubmit_admission}>
                        <Modal.Header closeButton>
                            <Modal.Title id="contained-modal-title-vcenter">
                                <h2> <Icon.BsChevronBarUp /> Admission vers une chambre</h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-lg">
                                <div className="col-lg">
                                    <Alert variant="info">Seules les disponibles sont affichées ici ! </Alert>
                                </div>
                            </div>
                            <div className="row row-lg">
                                <div className="col-lg">
                                    <p className="mg-b-10">Batiment</p>
                                    <select name="numero_batiment" value={this.state.admission_chambre.numero_batiment} onChange={this.handleChange_admission}>
                                        <option> Selectionner une batiment </option>
                                        {
                                            console.log(this.state.hospitalisation_chambres)
                                        }
                                        {this.state.all_batiment.map((bat) =>
                                            <option key={bat.id_batiment} title={'BATIMENT : ' + bat.id_batiment} value={bat.id_batiment}> {bat.nom_batiment + '(' + bat.sigle + ')'} </option>
                                        )
                                        }
                                    </select>
                                </div>
                                {
                                    this.state.all_batiment_chambre.length > 0 &&
                                    <div className="col-lg">
                                        <p className="mg-b-10">Chambre</p>
                                        <select name="numero_chambre" value={this.state.admission_chambre.numero_chambre} onChange={this.handleChange_admission} >
                                            <option> Selectionner un chambre </option>
                                            {
                                                this.state.all_batiment_chambre.map((chamb) =>
                                                    <option key={chamb.id_chambre} title={'CHAMBRE : ' + chamb.id_chambre} value={chamb.id_chambre}>{chamb.nom_chambre} </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                }
                                {
                                    this.state.all_batiment_chambre_lit.length > 0 &&
                                    <div className="col-lg">
                                        <p className="mg-b-10">Lits</p>
                                        <select name="numero_lit" value={this.state.admission_chambre.numero_lit} onChange={this.handleChange_admission}>
                                            <option> Selectionner une lit </option>
                                            {
                                                this.state.all_batiment_chambre_lit.map((lit) =>
                                                    <option key={lit.id_lit} title={'LIT : ' + lit.id_lit} value={lit.id_lit}>{lit.nom_lit} </option>
                                                )
                                            }
                                        </select>
                                    </div>
                                }
                            </div>
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_admission_chambre_modal: false })}>Annuler</Button>
                            <Button type="submit" variant="primary" disabled={this.state.admission_chambre.numero_batiment.length === 0 || this.state.admission_chambre.numero_chambre.length === 0 || this.state.admission_chambre.numero_lit.length === 0}>Valider</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div >
        )
    }
}
