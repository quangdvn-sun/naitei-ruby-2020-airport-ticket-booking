import React from 'react';
import './styles.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import ToastAlert from '../../components/Alert';
import BookingSession from '../BookingSession';
import Welcome from '../Welcome';
import { Route, Switch } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <ToastAlert />
      <Header />
      <Switch>
        <Route path="/booking" component={BookingSession} />
        <Route exact path="/" component={Welcome} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
