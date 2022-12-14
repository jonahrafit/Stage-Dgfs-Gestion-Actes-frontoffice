import React, { Component } from 'react'
import { Link } from 'react-router-dom'

export default class PageNotFound extends Component {
    render() {
        return (
            <div>
                <div className="px-4 py-5 my-5 text-center">
                    <h1 className="display-5 fw-bold">Page Not Found</h1>
                    <div className="col-lg-6 mx-auto">
                        <p className="lead mb-4">Quickly design and customize responsive mobile-first sites with Bootstrap, the world’s most popular front-end open source toolkit, featuring Sass variables and mixins, responsive grid system, extensive prebuilt components, and powerful JavaScript plugins.</p>
                        <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                            <Link to="/dashboard"><button type="button" className="btn btn-primary btn-lg px-4 gap-3">{'<< Go to Home'}</button></Link>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}
