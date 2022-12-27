import React, { Component } from 'react'

export default class OutResult extends Component {
    render() {
        return (
            <div>
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">Result not found</h1>
                    <p className="lead mb-4">{this.props.message}</p>
                </div>
            </div>
        )
    }
}
