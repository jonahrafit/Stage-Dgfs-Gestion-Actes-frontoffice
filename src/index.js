import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from './app/App';
import * as serviceWorker from './serviceWorker';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';

ReactDOM.render(
  <BrowserRouter basename="/">
    <App />
  </BrowserRouter>
  ,
  document.getElementById('root'));

serviceWorker.unregister();
