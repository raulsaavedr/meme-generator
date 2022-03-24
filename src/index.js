import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import Header from "./components/Header"
import Meme from './components/Meme';

ReactDOM.render(
  <React.StrictMode>
    <Header />
    <Meme />
  </React.StrictMode>,
  document.getElementById('root')
);
