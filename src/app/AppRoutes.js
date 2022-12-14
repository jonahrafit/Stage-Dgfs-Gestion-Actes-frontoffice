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
const PatientListe = lazy(() => import('./pages/patient/PatientListe'))
const PatientFiche = lazy(() => import('./pages/patient/PatientFiche'))
const PatientParametre = lazy(() => import('./pages/patient/PatientParametre'))
const PatientPrescription = lazy(() => import('./pages/patient/PatientPrescription'))
const PatientSortie = lazy(() => import('./pages/patient/PatientSortie'))
const PatientChambreLits = lazy(() => import('./pages/patient/PatientChambreLits'))

// ETABLISSEMENT
const listeEtablissement = lazy(() => import('./pages/etablissement/Etablissement'))
const listeBatiments = lazy(() => import('./pages/etablissement/Batiments'))
const listePersonnels = lazy(() => import('./pages/etablissement/Personnels'))
const listeServices = lazy(() => import('./pages/etablissement/Service'))

// MALADIE
const Maladie = lazy(() => import('./pages/patient/Maladie'))

const Search = lazy(() => import('./pages/etablissement/Search'))

const PageNotFound = lazy(() => import('./pages/generalpage/PageNotFound'))

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
          <Route exact path='/persons/' component={Persons} />
          <Route exact path='/person/create' component={PersonCreate} />
          <Route exact path='/person/update/:id' component={PersonUpdate} />

          {/* PATIENT */}
          <Route exact path="/patient" component={PatientListe} />
          <Route exact path="/patient/:id" component={PatientFiche} />
          <Route exact path="/patient/:id/parametre" component={PatientParametre} />
          <Route exact path="/patient/:id/prescription" component={PatientPrescription} />
          <Route exact path="/patient/:id/sortie" component={PatientSortie} />
          <Route exact path="/patient/:id/chambreslits" component={PatientChambreLits} />

          {/* ETABLISSEMENT */}
          <Route exact path="/etablissement" component={listeEtablissement} />
          <Route exact path="/etablissement/:id/batiments" component={listeBatiments} />
          <Route exact path="/etablissement/:id/personnels" component={listePersonnels} />
          <Route exact path="/etablissement/:id/services" component={listeServices} />

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

          <Route exact path="/*" component={PageNotFound} />

        </Switch>
      </Suspense>
    )
  }
}

export default AppRoutes
