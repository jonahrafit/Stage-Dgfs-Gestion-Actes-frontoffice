import React from 'react';
import { Link } from 'react-router-dom';
import { url_api } from '../../service/api';

class PersonUpdate extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            id: '',
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

    componentDidMount() {
        alert(this.props.match.params.id);
        fetch(url_api + '/personne/search/' + this.props.match.params.id)
            .then(response => {
                return response.json();
            }).then(result => {
                console.log(result);
                this.setState({
                    id: result.id,
                    nom: result.nom,
                    prenom: result.prenom,
                    genre: result.genre,
                    groupesanguin: result.groupesanguin,
                    adresse: result.adresse,
                    datenaissance: result.datenaissance
                });
            });
    }

    handleChange(event) {
        const state = this.state
        state[event.target.name] = event.target.value
        this.setState(state);
    }

    handleSubmit(event) {
        event.preventDefault();
        fetch(url_api + '/person/Person', {
            method: 'POST',
            body: JSON.stringify({
                id: this.state.id,
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
            if (response.status === 200) {
                alert("person Person successfully.");
                window.location.href = '/persons';
            }
        });
    }

    render() {
        return (
            <div id="container">
                <Link to="/persons">persons</Link>
                <p />
                <form onSubmit={this.handleSubmit}>
                    <input type="hidden" name="id" value={this.state.id} />
                    <p>
                        <label>Nom:</label>
                        <input type="text" name="title" value={this.state.nom} onChange={this.handleChange} placeholder="Nom" />
                    </p>
                    <p>
                        <label>Prenom:</label>
                        <input type="text" name="prenom" value={this.state.prenom} onChange={this.handleChange} placeholder="Prenom" />
                    </p>
                    <p>
                        <label>Genre:</label>
                        <input type="text" name="genre" value={this.state.genre} onChange={this.handleChange} />
                    </p>
                    <p>
                        <label>Groupe Sanguin:</label>
                        <input type="text" name="groupesanguin" value={this.state.groupesanguin} onChange={this.handleChange} placeholder="Groupe sanguin" />
                    </p>
                    <p>
                        <label>Adresse:</label>
                        <input type="text" name="adresse" value={this.state.adresse} onChange={this.handleChange} placeholder="Adresse" />
                    </p>
                    <p>
                        <label>Date de naissance:</label>
                        <input type="date" name="datenaissance" value={this.state.datenaissance} onChange={this.handleChange} />
                    </p>
                    <p>
                        <input type="submit" value="Submit" />
                    </p>
                </form>
            </div>
        );
    }
}

export default PersonUpdate;