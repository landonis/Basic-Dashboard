import React, { useEffect, useState } from 'react';
import LoginForm from './components/LoginForm';

function App() {
  const [authenticated, setAuthenticated] = useState(false);

  useEffect(() => {
    fetch('/api/check')
      .then(res => res.json())
      .then(data => {
        setAuthenticated(data.authenticated);
      });
  }, []);

  return (
    <div className="p-10">
      {authenticated ? (
        <h1 className="text-2xl font-bold">Welcome to the Admin Dashboard</h1>
      ) : (
        <LoginForm onSuccess={() => setAuthenticated(true)} />
      )}
    </div>
  );
}

export default App;
