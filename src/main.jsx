import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Please ensure there is an element with id="root" in your HTML.');
}

createRoot(rootElement).render(
  <StrictMode>
    <App />
  </StrictMode>
);
