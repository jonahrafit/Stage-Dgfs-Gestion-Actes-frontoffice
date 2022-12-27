import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { utilisateur_url_api, session_id_etab } from '../../service/apiService';
import authHeader from '../../service/auth-header';
import { Link } from "react-router-dom";

export default class Personnels extends Component {
    constructor(props) {
        super();
        this.state = {
            Utilisateurs: []
        }
    }

    componentDidMount() {
        fetch(utilisateur_url_api, { headers: authHeader() })
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Utilisateurs: result
                });
                console.log(this.state.Utilisateurs);
            });
    }

    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/etablissement">Etablissement</Link></span>
                            <span><Link to="/etablissement">{session_id_etab}</Link></span>
                            <span>Liste des personnels </span>
                        </div>
                        <div className="az-content-label mg-b-5">Liste des personnels</div>
                        <p className="mg-b-20">Tous ce qui intègre sur notre etablissement</p>

                        <div className="table-responsive">
                            <i className="mg-b-20">Il y a (05) employée(s)</i>
                            <Table striped className="mg-b-0">
                                <thead>
                                    <tr>
                                        <th>Nom et prenoms</th>
                                        <th>Email</th>
                                        <th>Role</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.Utilisateurs.map(function (item, key) {
                                            return (
                                                <tr key={key}>
                                                    <td>{item.personne.nom + ' ' + item.personne.prenom}</td>
                                                    <td>{item.nomUtilisateur}</td>
                                                    <td>{item.role.role}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </Table>
                        </div>{/* bd */}
                    </div>
                </div>
            </div>
        )
    }
}
