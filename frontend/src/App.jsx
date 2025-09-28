import React, { useState, useEffect } from 'react';
import Manifest from '@mnfst/sdk';
import LandingPage from './screens/LandingPage';
import DashboardPage from './screens/DashboardPage';
import { testBackendConnection } from './services/apiService';
import './index.css';

function App() {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [backendConnected, setBackendConnected] = useState(false);
  const manifest = new Manifest();

  useEffect(() => {
    const checkConnectionAndSession = async () => {
      console.log('🚀 [APP] Starting backend connection test...');
      const result = await testBackendConnection();
      setBackendConnected(result.success);

      if (result.success) {
        console.log('✅ [APP] Backend connection successful.');
        try {
          const currentUser = await manifest.from('User').me();
          if (currentUser) {
            setUser(currentUser);
            console.log('✅ [APP] User session found.');
          }
        } catch (error) {
          console.log('ℹ️ [APP] No active user session.');
          setUser(null);
        }
      } else {
        console.error('❌ [APP] Backend connection failed.');
      }
      setIsLoading(false);
    };

    checkConnectionAndSession();
  }, []);

  const handleLogin = async (email, password) => {
    try {
      await manifest.login(email, password);
      const currentUser = await manifest.from('User').me();
      setUser(currentUser);
    } catch (error) {
      console.error('Login failed:', error);
      alert('Login failed. Please check your credentials.');
    }
  };

  const handleLogout = async () => {
    await manifest.logout();
    setUser(null);
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-orange-500"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 font-sans">
      <div className="fixed top-4 right-4 z-50 flex items-center space-x-2 bg-white p-2 rounded-full shadow-md">
        <div className={`w-3 h-3 rounded-full ${backendConnected ? 'bg-green-500' : 'bg-red-500'}`}></div>
        <span className="text-sm text-gray-600 font-medium">{backendConnected ? 'Connected' : 'Error'}</span>
      </div>

      {user ? (
        <DashboardPage user={user} onLogout={handleLogout} />
      ) : (
        <LandingPage onLogin={handleLogin} />
      )}
    </div>
  );
}

export default App;
