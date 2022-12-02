// import React, { Component } from 'react'
// import { Link } from 'react-router-dom';
// import { patient_url_api, maladie_search_url_api } from '../../service/apiService';
// import moment from 'moment';

// export default class SortiePatient extends Component {

//   constructor(props) {
//     super();
//     this.state = {
//       id: props.match.params.id,
//       patient: [],
//       maladie: []
//     }
//     this.getPatient = this.getPatient.bind(this);
//     this.getListeMaladie = this.getListeMaladie.bind(this);
//   }

//   componentDidMount() {
//     const id = this.props.match.params.id;
//     this.getPatient(id);
//     this.getListeMaladie();
//   }

//   getPatient(id) {
//     fetch(patient_url_api + id)
//       .then((res) => res.json())
//       .then(response => {
//         this.setState({
//           patient: response
//         });
//         console.log("patient", response);
//         return response;
//       })
//   }

//   getListeMaladie() {
//     fetch(maladie_search_url_api)
//       .then((res) => res.json())
//       .then(response => {
//         this.setState({
//           maladie: response
//         });
//         console.log("MALADIE", response);
//         return response;
//       })
//   }

//   render() {
//     const p = this.state.patient;
//     return (
//       <div>
//         <div className="container d-flex p-md-0" >
//           <div className="az-content-body pd-lg-l-40 d-flex flex-column">
//             <div className="az-content-breadcrumb">
//               <span><Link to="/patient">Patients </Link> </span>
//               <span><Link to={"/patient/" + p.id}>{p.numero_dossier}</Link></span>
//               <span> Sortie </span>
//             </div>

//             <h2 className="az-content-title">Fiche de sortie d'un patient</h2>

//             <div className="az-dashboard-one-title">
//               <div>
//                 <p>Nom et prenom : <h2 className="az-dashboard-title">{p.nom + '  ' + p.prenom}</h2></p>
//                 <p className="az-dashboard-text"><i>né(e) le , {p.date_naissance}</i></p>
//               </div>
//             </div>{/* az-dashboard-one-title */}
//             <p>Date d'admission : {p.date_naissance} soit , {moment(p.date_naissance).from(Date())}</p>
//             <p>Diagnostic à la sortie: </p>
//             <div>
//             </div>
//           </div>
//         </div>
//       </div>
//     )
//   }
// }

import React, { Component } from 'react'
import axios from 'axios'

class SortiePatient extends Component {
  constructor(props) {
    super(props)
    this.state = {
      Student: [],
    }
    this.node = React.createRef()
  }
  componentDidMount() {
    document.addEventListener('mousedown', this.onSearchClick)
  }
  componentWillUnmount() {
    document.removeEventListener('mousedown', this.onSearchClick)
  }
  onSearchClick = (e) => {
    if (this.node.current.contains(e.target)) {
      return
    }
    this.setState({
      Student: [],
    })
  }
  handleAPI = async (e) => {
    await axios
      .get('https://jsonplaceholder.typicode.com/users')
      .then((res) => {
        this.setState({
          Student: res.data,
        })
      })
      .catch((err) => {
        alert(err)
      })
    let convertToLc = e.target.value.toLowerCase()
    let filterData = this.state.Student.filter((e) => {
      let nameToLc = e.name.toLowerCase()
      return nameToLc.indexOf(convertToLc) !== -1
    })
    this.setState({
      Student: filterData,
    })
  }
  render() {
    return (
      <div className="container mt-5">
        <h2>React Filter Search Module Example</h2>
        <div className="mt-4">
          <input
            type="text"
            onClick={this.onSearchClick}
            className="form-control"
            onChange={this.handleAPI}
            placeholder="Search ..."
            ref={this.node}
          />
        </div>
        <ul className="list-group">
          {this.state.Student.map((res) => {
            return (
              <a
                href="#"
                className="list-group-item list-group-item-action"
                key={res.id}
              >
                {res.name}
              </a>
            )
          })}
        </ul>
      </div>
    )
  }
}
export default SortiePatient;