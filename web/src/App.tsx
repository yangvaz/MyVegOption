import React from 'react';

import './styles/global.css';
import './styles/pages/landing.css';

import logoImg from './images/lanche.svg';

function App() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="MyVegLogo" id="logo" />
        <p id="MyVeg"> My Veg Option </p>

        <main>
          <h1> Sua opção veg a um click. </h1>
          <p> Encontre o lugar veggie mais perto de você. </p>
        </main>

        <div className="location">
          <strong> Belo Horizonte </strong>
          <span> Minas Gerais </span>
        </div>

        <a href="" className="enter-app">
          &gt;
        </a>

      </div>
    </div>
  );
}

export default App;

