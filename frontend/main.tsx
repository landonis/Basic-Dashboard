import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from 'react-router-dom';
import App from './src/pages/App';
import Login from './src/pages/Login';
import './index.css';

const Root = () => {
  const [authenticated, setAuthenticated] = React.useState<boolean | null>(null);

  React.useEffect(() => {
    fetch('/api/check')
      .then(res => res.json())
      .then(data => setAuthenticated(data.authenticated))
      .catch(() => setAuthenticated(false));
  }, []);

  if (authenticated === null) return <div className="p-4">Loading...</div>;

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={authenticated ? <App /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/login"
          element={authenticated ? <Navigate to="/" replace /> : <Login onSuccess={() => setAuthenticated(true)} />}
        />
      </Routes>
    </Router>
  );
};

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>
);
