import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.css'

if (window.lg) window.lg('main.tsx starting');
document.body.style.backgroundColor = '#050505'; // Visual confirmation

class ErrorBoundary extends React.Component<{children: React.ReactNode}, {hasError: boolean, error: any}> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error: any) {
    return { hasError: true, error };
  }
  componentDidCatch(error: any, errorInfo: any) {
    if (window.lg) window.lg('CATCH: ' + error, 'red');
    console.error(error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return <div style={{padding: 20, color: 'red', background: 'white'}}>RUNTIME_ERROR: {this.state.error?.toString()}</div>;
    }
    return this.props.children;
  }
}

try {
  if (window.lg) window.lg('Attempting React render');
  ReactDOM.createRoot(document.getElementById('root')!).render(
    <ErrorBoundary>
      <App />
    </ErrorBoundary>
  )
  if (window.lg) window.lg('Render call complete');
} catch (e) {
  if (window.lg) window.lg('ROOT_FAIL: ' + e, 'red');
}
