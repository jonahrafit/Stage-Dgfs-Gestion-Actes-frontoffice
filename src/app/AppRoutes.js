import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'


const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Buttons = lazy(() => import('./pages/ui-elements/Buttons'))
const Dropdowns = lazy(() => import('./pages/ui-elements/Dropdowns'))
const Icons = lazy(() => import('./pages/ui-elements/Icons'))
const FormElements = lazy(() => import('./pages/form/FormElements'))
const ChartJs = lazy(() => import('./pages/charts/ChartJs'))
const BasicTable = lazy(() => import('./pages/tables/BasicTable'))

// LOGIN
const Login = lazy(() => import('./pages/generalpage/Login'))

// PERSONNE
const Persons = lazy(() => import('./pages/personne/Persons'))
const PersonCreate = lazy(() => import('./pages/personne/PersonCreate'))
const PersonUpdate = lazy(() => import('./pages/personne/PersonUpdate'))

// PATIENT
const listePatient = lazy(() => import('./pages/patient/ListePatient'))
const FichePatient = lazy(() => import('./pages/patient/Patient'))
const FichePrescription = lazy(() => import('./pages/patient/FichePrescription'))
const SortiePatient = lazy(() => import('./pages/patient/SortiePatient'))

// ETABLISSEMENT
const listeEtablissement = lazy(() => import('./pages/etablissement/Etablissement'))
const listeLits = lazy(() => import('./pages/etablissement/Lits'))

// MALADIE
const Maladie = lazy(() => import('./pages/patient/Maladie'))

const Search = lazy(() => import('./pages/etablissement/Search'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/login"></Redirect>
          </Route>

          {/* LOGIN */}
          <Route exact path="/login" component={Login} />
          
          {/* PERSONNE */}
          <Route exact path='/person/create' component={PersonCreate} />
          <Route exact path='/person/update/:id' component={PersonUpdate} />
          <Route exact path='/persons/' component={Persons} />

          {/* PATIENT */}
          <Route exact path="/patient" component={listePatient} />
          <Route exact path="/patient/:id" component={FichePatient} />
          <Route exact path="/patient/:id/prescription" component={FichePrescription} />
          <Route exact path="/patient/:id/sortie" component={SortiePatient} />

          {/* ETABLISSEMENT */}
          <Route exact path="/etablissement" component={listeEtablissement} />
          <Route exact path="/etablissement/lits" component={listeLits} />

          {/* MALADIE */}
          <Route exact path="/maladie" component={Maladie} />

          <Route exact path="/search" component={Search} />

          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/ui-elements/buttons" component={Buttons} />
          <Route exact path="/ui-elements/dropdowns" component={Dropdowns} />
          <Route exact path="/ui-elements/icons" component={Icons} />
          <Route exact path="/form/form-elements" component={FormElements} />
          <Route exact path="/charts/chartjs" component={ChartJs} />
          <Route exact path="/tables/basic-table" component={BasicTable} />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
