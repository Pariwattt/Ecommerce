// main.jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import Test from '../src/components/Menu.jsx'; // Importing test.jsx component

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Test />  {/* Use the Test component here */}
  </React.StrictMode>
);
