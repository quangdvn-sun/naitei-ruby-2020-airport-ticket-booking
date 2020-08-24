import React from 'react';
import './styles.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Welcome from '../Welcome';
import CustomerInfo from '../CustomerInfo';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <Header />
      <Switch>
        <Route path="/booking" component={CustomerInfo} />
        <Route exact path="/" component={Welcome} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
