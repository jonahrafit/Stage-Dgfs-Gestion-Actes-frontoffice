import React, { Component } from 'react'
import { Table, Badge, Button, Col, Form, InputGroup } from "react-bootstrap";
import { utilisateur_url_api } from '../../service/apiService';
import Select from 'react-select';
import { Link } from 'react-router-dom';

export default class Lits extends Component {
    constructor(props) {
        super();
        this.state = {
            Lits: []
        }
    }

    componentDidMount() {
        fetch(utilisateur_url_api)
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Lits: result
                });
                console.log(this.state.Lits);
            });
    }

    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/etablissement">Etablissement</Link></span>
                            <span>Etats de lit</span>
                        </div>
                        <div className="az-content-label mg-b-5">Etats de lits </div>
                        <Form.Group className="full-width">
                            <Form.Row>
                                <Col sm={12} md={2} lg={2}>
                                    <Form.Group className="">
                                        <Form.Label>Min</Form.Label>
                                        <Form.Control
                                            placeholder="0"
                                            aria-label="min range"
                                            name="min_range"
                                            required
                                            ref="min_range">

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={2} lg={2}>
                                    <Form.Group className="">
                                        <Form.Label>Max</Form.Label>
                                        <Form.Control
                                            placeholder="0"
                                            aria-label="max range"
                                            name="max_range"
                                            required
                                            ref="max_range">

                                        </Form.Control>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={3} lg={3}>
                                    <Form.Group className="">
                                        <Form.Label>Metric</Form.Label>
                                        <Select
                                            name="tiered_metric"
                                            onChange={(e) => this.handleMetricChange(e)}
                                            options={this.state.metricList}></Select>
                                    </Form.Group>
                                </Col>
                                <Col sm={12} md={3} lg={3}>
                                    <Form.Label>Amount</Form.Label>
                                    <InputGroup className="mmb-3 fw">
                                        <Form.Control
                                            placeholder="0.00"
                                            aria-label="tiered amount"
                                            aria-describedby="tiered-amt-addon2"
                                            name="tiered_amount"
                                            pattern="^\d*\.\d{1,18}$"
                                            required
                                            ref="tiered_amt"

                                        />
                                    </InputGroup>
                                </Col>
                                <Col sm={12} md={2} lg={2}>
                                    <Form.Label>_</Form.Label>
                                    <Button>Filtrer</Button>
                                </Col>
                            </Form.Row>
                        </Form.Group>
                        <i className="mg-b-20">On compte 15/90 libre(s)</i>
                        <div className="table-responsive">
                            <Table striped>
                                <thead>
                                    <tr>
                                        <th>Batiment</th>
                                        <th>Chambre</th>
                                        <th>Lits</th>
                                        <th>Etat</th>
                                        <th>Libre dans </th>
                                    </tr>
                                </thead>
                                <tbody>

                                    <tr>
                                        <td>Batiment 1</td>
                                        <td>Chambre 5</td>
                                        <td>A16</td>
                                        <td>
                                            <Badge pill variant="danger">
                                                Occupé
                                            </Badge>{" "}
                                        </td>
                                        <td>3 jours</td>
                                    </tr>
                                    <tr>
                                        <td>Batiment 1</td>
                                        <td>Chambre 5</td>
                                        <td>A15</td>
                                        <td>
                                            Libre
                                        </td>
                                        <td> - </td>
                                    </tr>
                                    {
                                        this.state.Lits.map(function (item, key) {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.personne.nom + ' ' + item.personne.prenom}</td>
                                                    <td>{item.nomUtilisateur}</td>
                                                    <td>{item.role.role}</td>
                                                    <td>
                                                        <Badge pill variant="danger">
                                                            Occupé
                                                        </Badge>{" "}
                                                    </td>
                                                    <td>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>{/* bd */}
                    </div>
                </div >
            </div >
        )
    }
}
