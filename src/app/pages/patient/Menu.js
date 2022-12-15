import React, { Component } from 'react'
import { Link } from "react-router-dom";

export default class Menu extends Component {
    render() {
        const { patient } = this.props;
        return (
            <div>
                <Link to={"/patient/" + patient.id_patient_dossier}>
                    Profils
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to={'/patient/' + patient.id_patient_dossier + '/parametre'}>
                    Paramètres medicaux
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to={'/patient/' + patient.id_patient_dossier + '/prescription'}>
                    Prescription médicale
                </Link>
                &nbsp;&nbsp;&nbsp;
                <Link to={'/patient/' + patient.id_patient_dossier + '/sortie'}>
                    Fin de traitement
                </Link>
            </div >
        )
    }
}
