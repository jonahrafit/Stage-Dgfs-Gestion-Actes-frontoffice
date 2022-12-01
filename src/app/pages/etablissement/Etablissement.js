import React, { Component } from 'react';
import { Button } from 'react-bootstrap';
import { maladie_url_api } from '../../service/apiService';
import Personnels from './Personnels';
import ChambresLits from './ChambresLits';

class Etablissement extends Component {
    constructor(props) {
        super();
        this.state = {
            Maladies: [],
            show_personnels: true,
        }
    }

    componentDidMount() {
        fetch(maladie_url_api)
            .then((res) => res.json())
            .then(result => {
                console.log(result);
                this.setState({
                    Maladies: result
                });
            });
    }

    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Components</span>
                            <span>UI Elements</span>
                            <span>Buttons</span>
                        </div>
                        <h2>Gestion d'etablissement</h2>
                        <div className="row row-xs wd-xl-80p">
                            <div className="col-sm-12 col-md-6"><Button onClick={() => this.setState({ show_personnels: true })} variant="indigo btn-with-icon btn-block"><i className="typcn typcn-folder"></i> Gestion des personnels</Button></div>
                            <br />
                            <div className="col-sm-12 col-md-6 mg-t-10 mg-sm-t-0"><Button onClick={() => this.setState({ show_personnels: false })} variant="primary btn-with-icon btn-block"><i className="typcn typcn-mail"></i> Gestion des chambres et lits</Button></div>
                        </div>{/* row */}
                        <hr />
                        {this.state.show_personnels &&
                            <Personnels />
                        }
                        {!this.state.show_personnels &&
                            <ChambresLits />
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Etablissement;
