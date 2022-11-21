import React from 'react';
import { Link } from 'react-router-dom';
import { url_api } from '../../service/apiService';

class Persons extends React.Component {

	constructor(props) {
		super(props);
		this.state = { Persons: [] };
		this.headers = [
			{ key: 'id', label: 'Id' },
			{ key: 'nom', label: 'Nom' },
			{ key: 'prenom', label: 'Prenom' },
			{ key: 'genre', label: 'Genre' },
			{ key: 'groupesanguin', label: 'Groupe Sanguin' },
			{ key: 'adresse', label: 'Adresse' },
			{ key: 'datenaissance', label: 'Date de naissance' }
		];
		this.deletePerson = this.deletePerson.bind(this);
	}

	componentDidMount() {
		fetch(url_api + '/persons')
			.then((res) => res.json())
			.then(result => {
				console.log(result);
				this.setState({
					Persons: result
				});
			})
	}

	deletePerson(id) {
		if (window.confirm("Are you sure want to delete?")) {
			fetch(url_api + '/personne/delete/' + id)
				.then(response => {
					if (response.status === 200) {
						alert("Person deleted successfully");
						window.location.href = '/';
					}
				});
		}
	}

	render() {
		if (this.state.Persons && Object.keys(this.state.Persons).length > 0) {
			return (
				<div id="container">
					<Link to="/person/create">Ajouter une personne</Link>
					<p />
					<table>
						<thead>
							<tr>
								{
									this.headers.map(function (h) {
										return (
											<th key={h.key}>{h.label}</th>
										)
									})
								}
								<th>Actions</th>
							</tr>
						</thead>
						<tbody>
							{
								this.state.Persons.map(function (item, key) {
									return (
										<tr key={key}>
											<td>{item.id}</td>
											<td>{item.nom}</td>
											<td>{item.prenom}</td>
											<td>{item.genre}</td>
											<td>{item.groupesanguin}</td>
											<td>{item.adresse}</td>
											<td>{item.datenaissance}</td>
											<td>
												<Link to={`/person/update/${item.id}`}>Edit</Link>
												&nbsp;<button onClick={this.deletePerson.bind(this, item.id)}>Delete</button>
											</td>
										</tr>
									)
								}.bind(this))
							}
						</tbody>
					</table>
				</div>
			)
		} else {
			return (
				<div id="container">
					<Link to="/person/create">Add Person</Link><p />
					<div style={{ color: 'red' }}>No record found</div>
				</div>
			)
		}
	}
}

export default Persons;