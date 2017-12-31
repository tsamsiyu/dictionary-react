/**
 * Configure top level of our application
 */
import React from 'react';
import ReactDOM from 'react-dom';

// 3-rd assets
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import "font-awesome/css/font-awesome.css";

// own assets
import 'assets/styles/global.scss';

// providers
import App from 'components/view/app/App';
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
