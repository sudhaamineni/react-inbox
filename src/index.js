import React from 'react';
import ReactDOM from 'react-dom';
import Inbox from './components/Inbox';
import registerServiceWorker from './registerServiceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap/dist/css/bootstrap-theme.css';
import 'font-awesome/css/font-awesome.css';
import { fetchMessages } from './actions'
import store from './store'
import { Provider } from 'react-redux'
import './index.css';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import Compose from './components/ComposeMessage';
store.dispatch(fetchMessages())

ReactDOM.render(
  <Provider store= {store} >
  <BrowserRouter>
     <div>
    <Inbox /> </div>
   </BrowserRouter>


  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
