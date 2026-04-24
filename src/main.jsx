import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { DashboardDataProvider } from './context/DashboardDataContext.jsx';
import './styles/theme.css';
import './App.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <DashboardDataProvider>
      <App />
    </DashboardDataProvider>
  </React.StrictMode>
);
