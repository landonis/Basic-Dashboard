import React, { useState } from 'react';

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.ok) {
      setMessage('Password changed successfully');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setMessage('Failed to change password');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 text-gray-900 font-sans">
      <nav className="bg-white border-b shadow-sm px-6 py-4 flex justify-between items-center">
        <span className="text-2xl font-bold text-blue-600">Minecraft Manager</span>
        <ul className="flex space-x-6 text-sm font-medium">
          <li><a href="/" className="hover:text-blue-600">Dashboard</a></li>
          <li><button onClick={onLogout} className="text-red-500 hover:text-red-700">Logout</button></li>
        </ul>
      </nav>
      <main className="p-10 max-w-lg mx-auto">
        <h2 className="text-2xl font-semibold mb-4">Change Password</h2>
        <form onSubmit={handleSubmit} className="bg-white rounded shadow p-6 space-y-4">
          <div>
            <label className="block text-sm mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <div>
            <label className="block text-sm mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full border rounded px-3 py-2"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700">
            Change Password
          </button>
          {message && <p className="text-sm mt-2 text-green-600">{message}</p>}
        </form>
      </main>
    </div>
  );
}
