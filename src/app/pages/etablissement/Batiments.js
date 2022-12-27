import React, { Component } from 'react'
import { Button, Modal, Form, Table } from "react-bootstrap";
import { etablissement_url_api, session_id_etab } from '../../service/apiService';
import { Link } from 'react-router-dom';
import authHeader from '../../service/auth-header';
import { Pie } from 'react-chartjs-2';

export default class Batiments extends Component {
    constructor(props) {
        super();
        this.state = {
            batiments: [],
            doughnutPieData: { datasets: [], labels: [] },
            show_modal_bed: false,
            show_modal_chambre: false,
            show_modal_batiment: false,
            insert_nouveau_lit: {
                id_batiment: '',
                id_chambre: '',
                nombre_lit: 1
            },
            insert_nouveau_batiment: {
                nom_batiment: '',
                sigle_batiment: ''
            },
            insert_nouveau_chambre: {
                nombre_lit: 0,
                nom_chambre: ''
            },

        }
    }
    handleChange_nouveu_lit(event) {

    }

    handleSubmit_nouveau_lit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        this.getListeBatiments(session_id_etab);
    }

    getListeBatiments(id) {
        fetch(etablissement_url_api + id + '/batiment', { headers: authHeader() })
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    batiments: response
                });
            })
        console.log("batiment", this.state.batiments);
    }


    doughnutPieOptions = {
        cutoutPercentage: 50,
        maintainAspectRatio: false,
        responsive: true,
        legend: {
            display: true,
        },
        animation: {
            animateScale: true,
            animateRotate: true
        }
    };

    render() {
        let labels = ['Occupé', 'Libre '];
        let occupe = 0;
        let libre = 0;
        for (const element of this.state.batiments) {
            let bat = element;
            if (bat.id_patient_dossier != null) {
                occupe = occupe + 1;
            } else { libre = libre + 1; }
        }
        let doughnutPieData = {
            labels: labels,
            datasets: [{
                data: [occupe, libre],
                backgroundColor: ['red', 'green']
            }]
        }
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/etablissement">Etablissement</Link></span>
                            <span><Link to="/etablissement">{session_id_etab}</Link></span>
                            <span>Etats de lit</span>
                        </div>
                        <div className="az-content-label mg-b-5">Etats de lits </div>
                        <div className="row row-xs wd-xl-80p">
                            <div className="col-sm-6 col-md-3 mg-t-10 mg-sm-t-0">
                                <Button onClick={() => this.setState({ show_modal_batiment: true })} variant="az-secondary btn-block">Nouveau batiment</Button>
                            </div>
                            <div className="col-sm-6 col-md-3 mg-t-10 mg-md-t-0"><Button variant="gray-500 btn-block">Nouveau chambre</Button></div>
                            <div className="col-sm-6 col-md-3 mg-t-10 mg-md-t-0">
                                <Button onClick={() => this.setState({ show_modal_bed: true })} variant="gray-700 btn-block">Ajouter des lits</Button>
                            </div>
                        </div>{/* row */}
                        <hr />
                        <div className="row row-sm mg-b-20">
                            <div className="col-lg-8 mg-t-20 mg-lg-t-0">
                                <Table striped bordered hover>
                                    <thead>
                                        <tr>
                                            <td>Batiment</td>
                                            <td>Chambre</td>
                                            <td>Lit</td>
                                            <td>Etat</td>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            this.state.batiments.map((batiment) =>
                                                <tr key={batiment.id} style={{ backgroundColor: batiment.id_patient_dossier ? 'red' : 'white' }}>
                                                    <td>{batiment.sigle + '    '}{batiment.nom_batiment}</td>
                                                    <td>{batiment.nom_chambre}</td>
                                                    <td>{batiment.nom_lit}</td>
                                                    <td>{batiment.id_patient_dossier ? 'OCCUPE' : 'LIBRE'}</td>
                                                </tr>
                                            )}
                                    </tbody>
                                </Table>
                            </div>{/* col */}
                            <div className="col-lg-4">
                                <div className="chartjs-wrapper-demo">
                                    <Pie data={doughnutPieData} options={this.doughnutPieOptions} />
                                </div>
                                <div className="row">
                                    <div className="col-sm-6 col-xs-7 goleft">
                                        <p><i className='fa fa-square' style={{ color: 'red' }}> </i> Occupé : {occupe}<br />
                                            <i className='fa fa-square' style={{ color: 'green' }}> </i> Libre : {libre}</p>
                                    </div>
                                    <div className="col-sm-6 col-xs-5">
                                        <h3>Total de lit: {occupe + libre}</h3>
                                    </div>
                                </div>
                            </div>{/* col */}
                        </div>{/* col */}
                    </div>
                </div >
                {/* MODAL NOUVEAU BATIMENT */}
                <Modal show={this.state.show_modal_batiment} onHide={() => this.setState({ show_modal_batiment: false })}>
                    <form onSubmit={this.handleSubmit_nouveau_lit}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h2>
                                    Nouveau batiment
                                </h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">
                                        Entre le nom de nouveau batiment
                                    </p>
                                    <Form.Control type="text" name="nom_batiment" value={this.state.insert_nouveau_batiment.nom_batiment} />
                                </div>{/* col */}
                            </div>{/* row */}
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">
                                        Sigle de nouveau batiment
                                    </p>
                                    <Form.Control type="text" name="sigle_batiment" value={this.state.insert_nouveau_batiment.sigle_batiment} />
                                </div>{/* col */}
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_modal_batiment: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
                {/* MODAL NOUVEAU CHAMBRE */}

                {/* MODAL NOUVEEAUS LITS*/}
                <Modal show={this.state.show_modal_bed} onHide={() => this.setState({ show_modal_bed: false })}>
                    <form onSubmit={this.handleSubmit_nouveau_lit}>
                        <Modal.Header closeButton>
                            <Modal.Title>
                                <h2>
                                    Ajouter des lits
                                </h2>
                            </Modal.Title>
                        </Modal.Header>
                        <Modal.Body>
                            <div className="row row-sm mg-b-20">
                                <div className="col-lg">
                                    <p className="mg-b-10">Batiment</p>
                                    <select name="id_batiment" value={this.state.insert_nouveau_lit.id_batiment} onChange={this.handleChange_patient_formulary}>
                                        {
                                            this.state.batiments.map((bat) =>
                                                <option key={bat.id} value={bat.id}>{bat.sigle + ' ' + bat.nomBatiment} </option>
                                            )
                                        }
                                    </select>
                                </div>
                                <div className="col-lg">
                                    <p className="mg-b-10">Chambre</p>
                                    <select name="id_batiment" value={this.state.insert_nouveau_lit.id_chambre} onChange={this.handleChange_patient_formulary}>
                                        {
                                            this.state.batiments.map((bat) =>
                                                <option key={bat.id} value={bat.id}>{bat.sigle + ' ' + bat.nomBatiment} </option>
                                            )
                                        }
                                    </select>
                                </div>
                            </div>{/* row */}
                            <div className="row row-sm">
                                <div className="col-lg">
                                    <p className="mg-b-10">
                                        Entre le nombre de nouveau lit
                                    </p>
                                    <Form.Control type="number" name="nombre_lit" value={this.state.insert_nouveau_lit.nombre_lit} />
                                </div>{/* col */}
                            </div>{/* row */}
                        </Modal.Body>
                        <Modal.Footer>
                            <Button variant="secondary" onClick={() => this.setState({ show_modal_bed: false })}>Annuler</Button>
                            <Button type="submit" variant="primary">Inserer</Button>
                        </Modal.Footer>
                    </form>
                </Modal>
            </div >
        )
    }
}
