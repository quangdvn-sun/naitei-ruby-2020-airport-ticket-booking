import React from 'react';
import Loader from 'react-loader-spinner';
import 'react-loader-spinner/dist/loader/css/react-spinner-loader.css';
import './style.scss';

function LoadingIndicator() {
  return (
    <div>
      <Loader className="loading" type="ThreeDots" height="100" width="100" />
    </div>
  );
}

export default LoadingIndicator;
