import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { session_id_etab } from '../../service/apiService';

class Etablissement extends Component {

    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/etablissement">Etablissement</Link></span>
                            <span><Link to="/etablissement">{session_id_etab}</Link></span>
                            <span>Liste des personnels</span>
                        </div>
                        <h2>Gestion d'etablissement</h2>
                        <div className="row row-xs wd-xl-80p">
                            <div className="col-sm-12 col-md-4 mg-t-10 mg-sm-t-0">
                                <Link to={"/etablissement/" + session_id_etab + "/batiments"}>
                                    <Button variant="primary btn-with-icon btn-block">
                                        <i className="typcn typcn-mail"></i> Gestion des chambres et lits</Button>
                                </Link>
                            </div>
                            <br />
                            <div className="col-sm-12 col-md-4">
                                <Link to={"/etablissement/" + session_id_etab + "/services"}>
                                    <Button variant="indigo btn-with-icon btn-block">
                                        <i className="typcn typcn-folder"></i> Gestion des services</Button>
                                </Link>
                            </div>
                            <br />
                            <div className="col-sm-12 col-md-4">
                                <Link to={"/etablissement/" + session_id_etab + "/personnels"}>
                                    <Button variant="indigo btn-with-icon btn-block">
                                        <i className="typcn typcn-folder"></i> Gestion des personnels</Button>
                                </Link>
                            </div>
                        </div>{/* row */}
                        <hr />
                    </div>
                </div>
            </div>
        );
    }
}

export default Etablissement;
