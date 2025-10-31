import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import AppContextProvider from './context/AppContext.jsx'

// Register Service Worker for offline functionality
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then((registration) => {
        console.log('Service Worker registered successfully:', registration.scope);
        
        // Listen for updates
        registration.addEventListener('updatefound', () => {
          const newWorker = registration.installing;
          newWorker.addEventListener('statechange', () => {
            if (newWorker.state === 'installed' && navigator.serviceWorker.controller) {
              console.log('New service worker available');
            }
          });
        });
      })
      .catch((error) => {
        console.error('Service Worker registration failed:', error);
      });
  });

  // Handle online/offline events
  window.addEventListener('online', () => {
    console.log('Back online!');
    // Notify service worker to process queued requests
    if (navigator.serviceWorker.controller) {
      navigator.serviceWorker.controller.postMessage({ type: 'ONLINE' });
    }
    // Show notification to user
    const event = new CustomEvent('connectionStatus', { detail: { online: true } });
    window.dispatchEvent(event);
  });

  window.addEventListener('offline', () => {
    console.log('Went offline!');
    // Show notification to user
    const event = new CustomEvent('connectionStatus', { detail: { online: false } });
    window.dispatchEvent(event);
  });
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <AppContextProvider>
      <App />
    </AppContextProvider>
  </BrowserRouter>,
)
