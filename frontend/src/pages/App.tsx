import React from 'react';

interface AppProps {
  onLogout: () => void;
}

export default function App({ onLogout }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* ✅ NAVIGATION BAR */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Minecraft Dashboard</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Dashboard</a></li>
          <li><a href="/profile" className="hover:underline">Profile</a></li>
          <li><button onClick={onLogout} className="text-red-600 hover:underline">Logout</button></li>
        </ul>
      </nav>

      {/* MAIN CONTENT */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Admin Dashboard</h1>
        <p className="text-gray-700">This is your main panel.</p>
      </main>
    </div>
  );
}
