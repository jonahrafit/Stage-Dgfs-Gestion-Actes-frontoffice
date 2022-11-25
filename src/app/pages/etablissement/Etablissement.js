import React, { Component } from 'react';
import ComponentsSidebar from '../../components/shared/ComponentsSidebar';
import { Button } from 'react-bootstrap';
class Etablissement extends Component {
    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <ComponentsSidebar />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Components</span>
                            <span>UI Elements</span>
                            <span>Buttons</span>
                        </div>
                        <h2>Gestion d'etablissement</h2>
                        <div className="row row-xs wd-xl-80p">
                            <div className="col-sm-12 col-md-6"><Button variant="indigo btn-with-icon btn-block"><i className="typcn typcn-folder"></i> Gestion des personnels</Button></div>
                            <div className="col-sm-12 col-md-6 mg-t-10 mg-sm-t-0"><Button variant="primary btn-with-icon btn-block"><i className="typcn typcn-mail"></i> Gestion des chambres et lits</Button></div>
                        </div>{/* row */}
                    </div>
                </div>
            </div>
        );
    }
}

export default Etablissement;
