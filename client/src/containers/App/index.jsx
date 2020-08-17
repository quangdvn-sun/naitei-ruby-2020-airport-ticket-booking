import React from 'react';
import './styles.scss';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Welcome from '../Welcome';

function App() {
  return (
    <div className='App'>
      <Header />
      <div>
        <Welcome/>
      </div>
      <Footer />
    </div>
  );
}

export default App;
