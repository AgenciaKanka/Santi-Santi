import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App.tsx';
import { AuthProvider } from './contexts/AuthContext.tsx';
import './index.css';

/** React Router: basename sem barra final; `BASE_URL` do Vite passa a ter barra final */
const routerBasename =
  (import.meta.env.BASE_URL || '/').replace(/\/$/, '') || '/';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <BrowserRouter basename={routerBasename}>
      <AuthProvider>
        <App />
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>,
);
