import React from 'react';
import ReactDOM from 'react-dom/client';  // For React 18+ usage
import './style.css';  // Import your global styles (if any)
import App from './app';  // Import your main App component

const root = ReactDOM.createRoot(document.getElementById('root'));  // Ensure you have an element with id 'root' in your HTML
root.render(
  <React.StrictMode>
    <App />  {/* Render your App component */}
  </React.StrictMode>
);
