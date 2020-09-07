import React, { useEffect } from 'react';
import './styles.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import { ToastAlert } from '../../components/Alert';
import BookingSession from '../BookingSession';
import Welcome from '../Welcome';
import Profile from '../../components/Profile';
import PrivateRoute from '../../components/PrivateRoute';
import { Route, Switch } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../../store/actions';

function App() {
  const { token } = useSelector(state => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [token, dispatch]);

  return (
    <div className="App">
      <ToastAlert />
      <Header />
      <Switch>
        <Route path="/booking" component={BookingSession} />
        <PrivateRoute path="/profile" component={Profile} authed={token} />
        <Route exact path="/" component={Welcome} />
      </Switch>
      <Footer />
    </div>
  );
}

export default App;
