import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import { Button } from "react-bootstrap";
import { Pie } from 'react-chartjs-2';

export default class ChambresLits extends Component {

  doughnutPieData = {
    labels: ['Occupé', 'Libre' ],
    datasets: [{
      data: [30, 65],
      backgroundColor: ['#560bd0', '#007bff']
    }]
  };

  doughnutPieOptions = {
    maintainAspectRatio: false,
    responsive: true,
    legend: {
      display: false,
    },
    animation: {
      animateScale: true,
      animateRotate: true
    }
  };

  render() {
    return (
      <div>
        <h2>Visualisation globale (état de chambre et lits)</h2>
        <div className="row">
          <div className="col-lg-6">
            <div className="card card-dashboard-four">
              <div className="card-header">
                <h6 className="card-title">Etat par batiments (pavillons)</h6>
              </div>{/* card-header */}
              <div className="card-body row">
                <div className="col-md-12 col-lg-12 mg-md-t-0">
                  <div className="az-traffic-detail-item">
                    <div>
                      <Link to="/dashboard">
                        <span>Batiment 1</span>
                      </Link>
                      <span>6 / 24 <span>(75%)</span></span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar bg-purple wd-25p" role="progressbar" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>{/* progress */}
                  </div>
                  <div className="az-traffic-detail-item">
                    <div>
                      <Link to="/dashboard">
                        <span>Batiment 2</span>
                      </Link>
                      <span>20 / 20  <span>(0%)</span></span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar bg-danger wd-100p" role="progressbar" aria-valuenow="100" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>{/* progress */}
                  </div>
                  <div className="az-traffic-detail-item">
                    <div>
                      <Link to="/dashboard">
                        <span>Batiment 3</span>
                      </Link>
                      <span>60 / 90 <span>(30%)</span></span>
                    </div>
                    <div className="progress">
                      <div className="progress-bar bg-info wd-60p" role="progressbar" aria-valuenow="60" aria-valuemin="0" aria-valuemax="100"></div>
                    </div>{/* progress */}
                  </div>
                </div>{/* col */}
              </div>{/* card-body */}
            </div>{/* card-dashboard-four */}
          </div>{/* col */}
          <div className="col-sm-6 col-md-3 mg-t-10 mg-md-t-0">
            <Link to="/etablissement/lits">
              <Button variant="info btn-rounded btn-block">Voir liste lits</Button>
            </Link>
            <div className="chartjs-wrapper-demo">
              <Pie data={this.doughnutPieData} options={this.doughnutPieOptions} />
            </div>
          </div>{/* col */}
        </div >
      </div >
    )
  }
}
