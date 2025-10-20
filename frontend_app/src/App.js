import React from 'react';
import './App.css';
import './styles/theme.css';
import './styles/utilities.css';
import Router from './router/Router';
import Header from './layout/Header';
import Navigation from './layout/Navigation';
import Sidebar from './layout/Sidebar';
import Footer from './layout/Footer';
import { StoreProvider } from './state/store';

/**
 * Root application shell that composes layout and routes.
 * Applies Ocean Professional theme classes and provides global state context.
 */
function App() {
  return (
    <div className="app-root bg-app min-h-screen text-app">
      <StoreProvider>
        <Header />
        <Navigation />
        <main className="app-main container">
          <div className="app-content">
            <div className="app-page" role="region" aria-label="Main content">
              <Router />
            </div>
            <aside className="app-sidebar" aria-label="Progress and resources">
              <Sidebar />
            </aside>
          </div>
        </main>
        <Footer />
      </StoreProvider>
    </div>
  );
}

export default App;
