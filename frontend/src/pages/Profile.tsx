import React, { useState } from 'react';

interface ProfileProps {
  onLogout: () => void;
}

export default function Profile({ onLogout }: ProfileProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleChangePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ currentPassword, newPassword }),
    });
    if (res.ok) {
      setMessage('Password changed successfully.');
      setCurrentPassword('');
      setNewPassword('');
    } else {
      setMessage('Error changing password.');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 text-gray-900">
      <nav className="bg-white shadow px-6 py-4 flex justify-between items-center">
        <div className="text-xl font-semibold">Minecraft Dashboard</div>
        <ul className="flex space-x-4">
          <li><a href="/" className="hover:underline">Dashboard</a></li>
          <li><button onClick={onLogout} className="text-red-600 hover:underline">Logout</button></li>
        </ul>
      </nav>

      <main className="p-6 max-w-md mx-auto">
        <h1 className="text-2xl font-bold mb-4">Profile</h1>
        <form onSubmit={handleChangePassword} className="space-y-4 bg-white p-4 rounded shadow">
          <div>
            <label className="block mb-1">Current Password</label>
            <input
              type="password"
              value={currentPassword}
              onChange={e => setCurrentPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <div>
            <label className="block mb-1">New Password</label>
            <input
              type="password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              className="w-full border p-2 rounded"
              required
            />
          </div>
          <button type="submit" className="bg-blue-600 text-white py-2 px-4 rounded">
            Change Password
          </button>
          {message && <p className="text-sm mt-2">{message}</p>}
        </form>
      </main>
    </div>
  );
}
