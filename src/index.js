/**
 * Configure top level of our application
 */
import React from 'react';
import ReactDOM from 'react-dom';

import "font-awesome/css/font-awesome.css";
import 'assets/styles/common.scss';
// import 'bootstrap-sass/assets/javascripts/bootstrap.min'; // need jquery

import { App } from 'components/view/app/App';
import registerServiceWorker from 'registerServiceWorker';

import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'mobx-react';

import { stores } from 'bus';


stores.authStore.load();


ReactDOM.render(
  <BrowserRouter>
    <Provider {...stores}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
