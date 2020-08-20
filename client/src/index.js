import React, { Suspense } from 'react';
import ReactDOM from 'react-dom';
import App from './containers/App';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './i18n';

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback='loading'>
      <App />
    </Suspense>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
