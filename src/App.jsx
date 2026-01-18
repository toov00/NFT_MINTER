import React from 'react';
import './App.css';
import Minter from './components/Minter.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';

/**
 * Main App component
 * @returns {JSX.Element} The application root
 */
function App() {
  return (
    <ErrorBoundary>
      <div className="App">
        <Minter />
      </div>
    </ErrorBoundary>
  );
}

export default App;
