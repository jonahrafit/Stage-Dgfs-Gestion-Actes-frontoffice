import React, { Component, Suspense, lazy } from 'react'
// import { Switch, Route, Redirect } from 'react-router-dom'
import { Switch, Route } from 'react-router-dom'
import { Redirect } from 'react-router-dom'

const Signin = lazy(() => import('./pages/general-pages/Signin'))

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Signup = lazy(() => import('./pages/general-pages/Signup'))
const Buttons = lazy(() => import('./pages/ui-elements/Buttons'))
const Dropdowns = lazy(() => import('./pages/ui-elements/Dropdowns'))
const Icons = lazy(() => import('./pages/ui-elements/Icons'))
const FormElements = lazy(() => import('./pages/form/FormElements'))
const ChartJs = lazy(() => import('./pages/charts/ChartJs'))
const BasicTable = lazy(() => import('./pages/tables/BasicTable'))

// PERSONNE
const Persons = lazy(() => import('./pages/personne/Persons'))
const PersonCreate = lazy(() => import('./pages/personne/PersonCreate'))
const PersonUpdate = lazy(() => import('./pages/personne/PersonUpdate'))

// PATIENT
const listePatient = lazy(() => import('./pages/patient/ListePatient'))
const FichePatient = lazy(() => import('./pages/patient/FichePatient'))
const FichePrescription = lazy(() => import('./pages/patient/FichePrescription'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/general-pages/signin"></Redirect>
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/general-pages/signin" component={Signin} />
          <Route exact path="/general-pages/signup" component={Signup} />
          <Route exact path="/ui-elements/buttons" component={Buttons} />
          <Route exact path="/ui-elements/dropdowns" component={Dropdowns} />
          <Route exact path="/ui-elements/icons" component={Icons} />
          <Route exact path="/form/form-elements" component={FormElements} />
          <Route exact path="/charts/chartjs" component={ChartJs} />
          <Route exact path="/tables/basic-table" component={BasicTable} />

          {/* PERSONNE */}
          <Route exact path='/person/create' component={PersonCreate} />
          <Route exact path='/person/update/:id' component={PersonUpdate} />
          <Route exact path='/persons/' component={Persons} />

          {/* PATIENT */}
          <Route exact path="/patient" component={listePatient} />
          <Route exact path="/patient/:id" component={FichePatient} />
          <Route exact path="/patient/:id/prescription" component={FichePrescription} />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
