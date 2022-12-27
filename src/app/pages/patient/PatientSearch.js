import React, { useState, useEffect } from "react";
import axios from "axios";
import { Form } from "react-bootstrap";

function PatientSearch() {
    const [patients, setPatients] = useState([]);
    const [, setText] = useState();
    const [suggestions, setSuggestions] = useState([]);

    useEffect(() => {
        const loadPatients = async () => {
            const response = await axios.get('http://localhost:9001/api/dgfs/patient');
            console.log(response.data)
            setPatients(response.data)
        }
        loadPatients();
    }, [])

    const changeHandler = (text) => {
        let matches = [];
        if (text.length > 0) {
            matches = patients.filter(patient => {
                const regex = new RegExp(`${text}`, "gi");
                return patient.personne.nom.match(regex);
            })
        }
        console.log("MATCHES ", matches);
        setSuggestions(matches);
        setText(text);
    }
    return (
        <div>
            
            <Form.Control type="text" name="text" onChange={e => changeHandler(e.target.value)} />
            {suggestions && suggestions.map((suggestion, i) =>
                <div onClick={e => setText(e.target.value)}>{suggestion.personne.nom}</div>
            )}
        </div>
    )
}

export default PatientSearch;