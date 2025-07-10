import React from 'react';

export default function App() {
  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      {/* Navigation Bar */}
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Minecraft Dashboard</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Home</a></li>
          <li><a href="/settings" className="hover:underline">Settings</a></li>
          <li><button className="text-red-600 hover:underline">Logout</button></li>
        </ul>
      </nav>

      {/* Main content */}
      <main className="p-6">
        <h1 className="text-2xl font-bold mb-4">Welcome to the Dashboard</h1>
        <p className="text-gray-700">This is your main panel.</p>
      </main>
    </div>
  );
}
