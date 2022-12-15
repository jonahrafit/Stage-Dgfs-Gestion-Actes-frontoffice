import React, { Component } from 'react'
import { patient_url_api, maladie_url_api } from '../../service/apiService';
import { Link } from 'react-router-dom';
import { Form } from 'react-bootstrap';
import Select from 'react-select';
import Creatable from 'react-select/creatable'

export default class PatientSortie extends Component {

    constructor(props) {
        super(props);
        this.state = {
            id_patient_dossier: props.match.params.id,
            patient: [],
            maladies: [],
            bilan_sortie: {
                maladie: ''
            }
        }
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getPatient = this.getPatient.bind(this);
    }

    handleChange(event) {
        const state_bilan_sortie = this.state.bilan_sortie;
        state_bilan_sortie[event.target.name] = event.target.value;
        this.setState(state_bilan_sortie);
        this.getMaladie(this.state.bilan_sortie.maladie);
    }

    handleSubmit(event) {
        event.preventDefault();
    }

    componentDidMount() {
        this.getPatient(this.state.id_patient_dossier);
        this.getListeMaladie();
    }

    getListeMaladie() {
        fetch(maladie_url_api)
            .then(response => response.json())
            .then((res) => {
                this.setState({
                    maladies: res
                });
                console.log(res)
            })
            .catch((e) => {
                console.error(`An error occurred: ${e}`)
            });
    }

    getMaladie(search) {
        fetch(maladie_url_api, {
            method: 'POST',
            body: JSON.stringify({
                search: search,
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then((res) => {
            this.setState({ maladies: res })
        })
    }

    getPatient(id) {
        fetch(patient_url_api + id)
            .then((res) => res.json())
            .then(response => {
                this.setState({
                    patient: response
                });
                console.log("patient", response);
                return response;
            })
    }
    render() {
        const patient = this.state.patient;
        
        return (
            <div>
                <div className="container d-flex p-md-0" >
                    <div className="az-content-body pd-lg-l-40 d-flex flex-column">
                        <div className="az-content-breadcrumb">
                            <span><Link to="/patient">Patient </Link> </span>
                            <span><Link to={'/patient/' + patient.id}>{patient.numero_dossier}</Link> </span>
                            <span>Patient </span>
                        </div>
                        <div className="row row-sm mg-b-20">
                            {/* <div className="col-md-12">
                                <form onSubmit={this.handleSubmit}>
                                    <Form.Control type="text" name="maladie" value={this.state.bilan_sortie.maladie} onChange={this.handleChange} />
                                </form>
                            </div> */}
                            <div className="col-md-6">
                                {/* <ul className="list-group">
                                    {
                                        this.state.maladies.map((mal) =>
                                            <li className="list-group-item" key={mal.code} title={mal.code}>{mal.libelle}</li>
                                        )}
                                </ul> */}
                                <Creatable isClearable options={this.state.maladies} />
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }
}

// import React, {useEffect, useState} from 'react';
// import axios from 'axios'
// import { Hint } from 'react-autocomplete-hint';
// import './App.css'

// function App() {
//   const [hintData, setHintData] = useState([])
//   const [text, setText] = useState('')

//   const getData = async () => {
//     const res = await axios.get('https://jsonplaceholder.typicode.com/users')
//       var hintArray = []
//        res.data.map(a => hintArray.push(a.name))
//         setHintData(hintArray)
//   }

//   useEffect(()=> {
//     getData()
//   })

//   return (
//     <div className="App">
//       <h5>Try typing these words</h5>
//       <code>{`[${hintData.toString()}]`}</code>
//       <br/>
//       <br/>
//       <br/>
//      <Hint options={hintData} allowTabFill>
//     <input className='input-with-hint'
//         value={text}
//         onChange={e => setText(e.target.value)} 
        
//         />
//       </Hint>
//     </div>
//   );
// }

// export default App;
