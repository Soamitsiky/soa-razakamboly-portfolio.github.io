import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';  // ← Cette ligne importe ton CSS global

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
