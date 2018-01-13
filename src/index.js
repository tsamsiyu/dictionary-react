/**
 * Configure top level of our application
 */
import React from 'react'
import ReactDOM from 'react-dom'

import "font-awesome/css/font-awesome.css"
import 'assets/styles/common.scss'
// import 'bootstrap-sass/assets/javascripts/bootstrap.min'; // need jquery ?

import { App } from 'components/view/app/App'
import { BrowserRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import registerServiceWorker from 'registerServiceWorker'
import { store } from 'store'
import { ACTIONS } from 'store/actions'


store.dispatch(ACTIONS.LOAD_AUTH);


ReactDOM.render(
  <BrowserRouter>
    <Provider store={store}>
      <App/>
    </Provider>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();
