import React, { Component, Suspense, lazy } from 'react'
import { Switch, Route, Redirect } from 'react-router-dom'

const Dashboard = lazy(() => import('./pages/dashboard/Dashboard'))
const Signin = lazy(() => import('./pages/general-pages/Signin'))
const Signup = lazy(() => import('./pages/general-pages/Signup'))
const Buttons = lazy(() => import('./pages/ui-elements/Buttons'))
const Dropdowns = lazy(() => import('./pages/ui-elements/Dropdowns'))
const Icons = lazy(() => import('./pages/ui-elements/Icons'))
const FormElements = lazy(() => import('./pages/form/FormElements'))
const ChartJs = lazy(() => import('./pages/charts/ChartJs'))
const BasicTable = lazy(() => import('./pages/tables/BasicTable'))
const FichePatient = lazy(() => import('./pages/patient/FichePatient'))
const TestWS = lazy(() => import('./pages/patient/TestWS'))

export class AppRoutes extends Component {
  render() {
    return (
      <Suspense fallback=''>
        <Switch>
          <Route exact path="/">
            <Redirect to="/dashboard"></Redirect>
          </Route>
          <Route exact path="/dashboard" component={Dashboard} />
          <Route exact path="/patient/fiche-form" component={FichePatient} />
          <Route exact path="/ws" component={TestWS} />

          <Route exact path="/general-pages/signin" component={Signin} />
          <Route exact path="/general-pages/signup" component={Signup} />

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
