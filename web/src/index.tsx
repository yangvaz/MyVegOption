import React from 'react';
import ReactDOM from 'react-dom'; //Integração do React com o DOM, que é árvore de elementos HTML
import App from './App';

ReactDOM.render( // render: recebe conteúdo JSX (JavaScript XML), Javascript ou HTML, e coloca no index.html
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root') //Joga o conteúdo recebido acima na div com nome de 'root' no index.html
);