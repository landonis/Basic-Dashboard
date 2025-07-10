import React from 'react';

interface AppProps {
  onLogout: () => void;
}

export default function App({ onLogout }: AppProps) {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">Minecraft Manager</span>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><a href="/" className="hover:text-blue-600">Dashboard</a></li>
          <li><a href="/profile" className="hover:text-blue-600">Profile</a></li>
          <li><button onClick={onLogout} className="text-red-500 hover:text-red-700">Logout</button></li>
        </ul>
      </nav>
      <main className="p-10">
        <h1 className="text-3xl font-bold mb-4">Welcome to Your Dashboard</h1>
        <p className="text-gray-700">Manage your Minecraft server with ease.</p>
      </main>
    </div>
  );
}
