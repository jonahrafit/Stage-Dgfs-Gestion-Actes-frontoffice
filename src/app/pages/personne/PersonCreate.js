import React from 'react';
import { Link } from 'react-router-dom';
import { url_api } from '../../service/apiService';

class PersonCreate extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            prenom: '',
            genre: '',
            groupesanguin: '',
            adresse: '',
            datenaissance: '',
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(url_api + '/personne', {
            method: 'POST',
            body: JSON.stringify({
                nom: this.state.nom,
                prenom: this.state.prenom,
                genre: this.state.genre,
                groupesanguin: this.state.groupesanguin,
                adresse: this.state.adresse,
                datenaissance: this.state.datenaissance
            }),
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => {
            if (response.status === 201) {
                alert("New website saved successfully");
                window.location.href = '/persons';
            }
        });
    }

    render() {
        return (
            <div id="container">
                <Link to="/persons">Liste des personnes</Link>
                <p />
                <form onSubmit={this.handleSubmit}>
                    <p>
                        <label>Nom:</label>
                        <input type="text" name="nom" value={this.state.nom} onChange={this.handleChange} placeholder="Nom" />
                    </p>
                    <p>
                        <label>Prenom:</label>
                        <input type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} placeholder="Prenom" />
                    </p>
                    <p>
                        <label>Genre:</label>
                        <input type="radio" value="M" name="genre" checked={this.state.genre === 'M'} onChange={this.handleChange} />Masculin
                        <input type="radio" value="F" name="genre" checked={this.state.genre === 'F'} onChange={this.handleChange} />Féminin
                    </p>
                    <p>
                        <label>Groupe Sanguin: </label>
                        <input type="text" name="groupesanguin" value={this.state.groupesanguin} onChange={this.handleChange} placeholder="Groupe sanguin" />
                    </p>
                    <p>
                        <label>Adresse: </label>
                        <input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange} placeholder="Adresse" />
                    </p>
                    <p>
                        <label>Date de naissance: </label>
                        <input type="datetime-local" name="datenaissance" value={this.state.datenaissance} onChange={this.handleChange} />
                    </p>
                    <p>
                        <input type="submit" value="Submit" />
                    </p>
                </form>
            </div>
        );
    }
}

export default PersonCreate;