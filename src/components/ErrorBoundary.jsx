import React from 'react';

/**
 * Error boundary component to catch React errors
 */
class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ 
          padding: '2rem', 
          textAlign: 'center',
          color: '#721c24',
          backgroundColor: '#f8d7da',
          border: '1px solid #f5c6cb',
          borderRadius: '0.5rem',
          margin: '2rem'
        }}>
          <h2>Something went wrong</h2>
          <p>An unexpected error occurred. Please refresh the page and try again.</p>
          {import.meta.env.DEV && this.state.error && (
            <details style={{ marginTop: '1rem', textAlign: 'left' }}>
              <summary>Error details</summary>
              <pre style={{ 
                marginTop: '0.5rem', 
                padding: '1rem', 
                backgroundColor: '#fff',
                borderRadius: '0.25rem',
                overflow: 'auto'
              }}>
                {this.state.error.toString()}
                {this.state.error.stack && `\n${this.state.error.stack}`}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
