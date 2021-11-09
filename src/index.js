import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import reportWebVitals from './reportWebVitals';
import App from './App.js';

ReactDOM.render(
    <App/>,
    document.getElementById('root')
);

console.log(`These are the envars: ${process.env}`)

reportWebVitals();
