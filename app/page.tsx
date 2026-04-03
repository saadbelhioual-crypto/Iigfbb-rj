'use client';

import { useState, useEffect, useRef } from 'react';
import Terminal from './components/Terminal';
import ControlPanel from './components/ControlPanel';
import MusicPlayer from './components/MusicPlayer';

const STATIC_PASSWORD = 'admin123'; // Change as needed

export default function Home() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (password === STATIC_PASSWORD) {
      setIsAuthenticated(true);
      setError('');
    } else {
      setError('Invalid password');
    }
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-900 via-gray-900 to-blue-900 flex items-center justify-center">
        <div className="bg-black/40 backdrop-blur-md p-8 rounded-2xl shadow-2xl w-96 border border-white/20">
          <h2 className="text-3xl font-bold text-center mb-6 bg-gradient-to-r from-[#ff6666] to-[#6666ff] bg-clip-text text-transparent">
            Bot Manager Login
          </h2>
          <form onSubmit={handleLogin} className="space-y-4">
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#6666ff]"
            />
            {error && <p className="text-red-400 text-sm">{error}</p>}
            <button
              type="submit"
              className="w-full py-2 rounded-lg bg-gradient-to-r from-[#ff6666] to-[#6666ff] hover:opacity-90 transition-opacity font-semibold"
            >
              Enter
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <main className="min-h-screen bg-gradient-to-br from-red-950 via-gray-950 to-blue-950 p-6">
      <div className="max-w-6xl mx-auto space-y-6">
        <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-[#ff6666] to-[#6666ff] bg-clip-text text-transparent">
          FreeFire Bot Manager
        </h1>
        <div className="grid md:grid-cols-2 gap-6">
          <ControlPanel />
          <MusicPlayer />
        </div>
        <Terminal />
      </div>
    </main>
  );
}
