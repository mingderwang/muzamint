import React from 'react';
import logo from '../../assets/img/logo.svg';
import './WelcomePage.scss';

const WelcomePage = () => {
  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Welcome to the share-gpt extension!</p>
        <h6>The color of this paragraph is defined using SASS.</h6>
      </header>
    </div>
  );
};

export default WelcomePage;
