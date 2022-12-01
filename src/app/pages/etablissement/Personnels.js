import React, { Component } from 'react'
import { Table } from 'react-bootstrap'
import { utilisateur_url_api } from '../../service/apiService';

export default class Personnels extends Component {
    constructor(props) {
        super();
        this.state = {
            Utilisateurs: []
        }
    }

    componentDidMount() {
        fetch(utilisateur_url_api)
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
        )
    }
}
