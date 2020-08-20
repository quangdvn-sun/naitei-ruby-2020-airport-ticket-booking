import React from 'react';
import './styles.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Welcome from '../Welcome';
import CustomerInfo from '../CustomerInfo';

function App() {
  return (
    <div className='App'>
      <Header />
      <Welcome />
      <Footer />
    </div>
  );
}

export default App;
