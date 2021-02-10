import React from 'react';
import { FiArrowRight } from 'react-icons/fi';
import { Link } from 'react-router-dom';

import '../styles/pages/landing.css';

import logoImg from '../images/lanche.svg';

function Landing() {
  return (
    <div id="page-landing">
      <div className="content-wrapper">
        <img src={logoImg} alt="MyVegLogo" id="logoImg" />
        <p id="MyVeg"> my veg option </p>

        <main>
          <h1> Sua opção veg a um click. </h1>
          <p> Encontre o lugar veggie mais perto de você. </p>
        </main>

        <div className="location">
          <strong> Belo Horizonte </strong>
          <span> Minas Gerais </span>
        </div>

        <Link to="/app" className="enter-app">
          <FiArrowRight size={26} color="rgba(0, 0, 0, 0.6)" />
        </Link>

      </div>
    </div>
  );
}

export default Landing;