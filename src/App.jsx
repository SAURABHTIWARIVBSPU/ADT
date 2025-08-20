import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Chatbot from './components/common/Chatbot';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import './App.css';

// ErrorBoundary to catch component errors
class ErrorBoundary extends React.Component {
  state = { hasError: false, error: null };
  
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  
  componentDidCatch(error, errorInfo) {
    console.log("Error in component:", errorInfo.componentStack);
  }
  
  render() {
    if (this.state.hasError) {
      return (
        <div className="p-4 text-center">
          <h2 className="text-xl font-bold text-red-600">Component Error</h2>
          <p className="text-gray-700">{this.state.error.message}</p>
          <pre className="text-xs text-left">{this.state.error.stack}</pre>
          <button 
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
            onClick={() => this.setState({ hasError: false })}
          >
            Try Again
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}

function App() {
  return (
    <BrowserRouter>
      <div style={{ position: "relative", zIndex: 1 }}>
        {/* Wrap AppRoutes with ErrorBoundary */}
        <ErrorBoundary>
          <AppRoutes />
        </ErrorBoundary>
        
        <Chatbot />
        <ToastContainer 
          position="top-right" 
          autoClose={3000} 
          hideProgressBar={false} 
          newestOnTop={false} 
          closeOnClick 
          rtl={false} 
          pauseOnFocusLoss 
          draggable 
          pauseOnHover 
        />
      </div>
    </BrowserRouter>
  );
}

export default App;
