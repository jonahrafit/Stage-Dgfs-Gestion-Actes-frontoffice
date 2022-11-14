import React, { Component } from 'react';
import MenuFichePatient from './MenuFichePatient';
import { Link } from 'react-router-dom';
import { Line } from 'react-chartjs-2';


class FichePatient extends Component {
    data = {
        labels: ["12 Jan", "13 Jan", "14 Jan", "15 Jan", "16 Jan", "17 Jan"],
        datasets: [
            {
                label: "FC",
                // backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(255, 99, 132)",
                data: [0, 10, 5, 2, 20, 30, 45],
            }, {
                label: "FR",
                // backgroundColor: "rgb(255, 99, 132)",
                borderColor: "rgb(55, 99, 12)",
                data: [40, 10, 15, 22, 20, 13, 55],
            },
        ],
    };


    render() {
        return (
            <div>
                <div className="container d-flex p-md-0">
                    <MenuFichePatient />
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span>Patient</span>
                            <span>CHUMET-30-156795</span>
                        </div>

                        <div className="row row-sm">
                            <div className="col-sm-8 col-md-6 col-xl-4">
                                <Link to="/patient/CHUMET-TEC-15689/parametre">
                                    <span className="medical-icon-medical-library" title="Ajouter parametre" aria-hidden="true" /> Paramètre
                                </Link>
                            </div>
                            <div className="col-sm-8 col-md-6 col-xl-4">
                                <Link to="/patient/CHUMET-TEC-15689/prescription">
                                    <span className="medical-icon-health-services" title="Prescrire" aria-hidden="true" /> Prescription
                                </Link>
                            </div>
                        </div> <hr />
                        <div className="az-content-label mg-b-5">Information générale</div>
                        <div className="row row-sm">
                            <div className="col-sm-8 col-md-6 col-xl-4">
                                <div className="ht-200 ht-lg-250">
                                    <div>Numéro du dossier : <b>CHUMET-30-156795</b></div>
                                    <div>Nom et prenom : <b>Garrett Winters</b></div>
                                    <div>Sexe : <b>Masculin</b></div>
                                    <div>Age : <b>15</b></div>
                                    <div><Link to="#"> Voir plus</Link></div>
                                </div>
                            </div>
                        </div>
                        <div>
                            <Line data={this.data} />
                        </div>
                    </div>
                </div>
            </div >
        );
    }
}

export default FichePatient;
