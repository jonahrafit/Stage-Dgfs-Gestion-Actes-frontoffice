import React, { Component } from 'react';
import ComponentsSidebar from '../../components/shared/ComponentsSidebar';
class Etablissement extends Component {
    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <ComponentsSidebar />
                    <h2>Gestion d'etablissement</h2>
                </div>
            </div>
        );
    }
}

export default Etablissement;
