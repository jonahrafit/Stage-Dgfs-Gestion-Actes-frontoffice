import React, { Component } from 'react'

function callApi() {
    fetch('http://localhost:9001/books', { method: 'GET' })
        .then(response => alert(response.status))
}

export class TestWS extends Component {

    render() {
        return (
            <div>
                <div className="App">
                    <header className="App-header">
                        <button onClick={callApi}>Call API</button>
                    </header>
                </div>
            </div>
        );
    }
}

export default TestWS;