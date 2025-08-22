import { BrowserRouter } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';
import Chatbot from './components/common/Chatbot';
import ErrorBoundary from './components/common/ErrorBoundary';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import React from 'react';
import './styles/app.css';

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
