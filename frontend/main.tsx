import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import Login from './src/pages/Login';

function Dashboard() {
  return <h1>Welcome to the Admin Dashboard</h1>;
}

const Root = () => {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch('/api/check', { credentials: 'include' })
      .then(res => res.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  const handleLogout = async () => {
    await fetch('/api/logout', { method: 'POST', credentials: 'include' });
    setAuthenticated(false);
  };

  if (authenticated === null) return <div>Loading...</div>;

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={authenticated ? <Dashboard /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login onSuccess={() => setAuthenticated(true)} />} />
      </Routes>
    </BrowserRouter>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(<Root />);
