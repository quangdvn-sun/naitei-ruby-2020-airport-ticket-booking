import React, { lazy, Suspense } from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import configureStore from './store/store';
import LoadingIndicator from './components/LoadingIndicator';
import './index.scss';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import './i18n';
import { Router } from 'react-router-dom';
import history from './utils/history';

const App = lazy(() => import('./containers/App'));
const store = configureStore();

ReactDOM.render(
  <React.Fragment>
    <Suspense fallback={null}>
      <Provider store={store}>
        <Router history={history} >
          <App />
        </Router>
      </Provider>
    </Suspense>
  </React.Fragment>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
