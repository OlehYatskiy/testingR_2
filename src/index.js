import React from 'react';
import ReactDOM from 'react-dom';

import {BrowserRouter} from 'react-router-dom';
import { Provider } from 'react-redux';
import store from 'Redux/store';

import App from 'Pages/App';

import * as serviceWorker from './serviceWorker';


ReactDOM.render(
    <React.StrictMode>
      <Provider store={store}>
        <BrowserRouter>
            <App />
        </BrowserRouter>
      </Provider>
    </React.StrictMode>,
  document.getElementById('root')
);

serviceWorker.unregister();
