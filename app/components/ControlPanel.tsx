'use client';

import { useState } from 'react';

export default function ControlPanel() {
  const [guestId, setGuestId] = useState('');
  const [guestPassword, setGuestPassword] = useState('');
  const [isBotRunning, setIsBotRunning] = useState(false);
  const [loading, setLoading] = useState(false);

  const saveCredentials = async () => {
    const res = await fetch('/api/save_credentials', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guest_id: guestId, guest_password: guestPassword }),
    });
    if (!res.ok) throw new Error('Failed to save credentials');
  };

  const startBot = async () => {
    if (!guestId || !guestPassword) {
      alert('Please enter both GUEST ID and PASSWORD');
      return;
    }
    setLoading(true);
    try {
      await saveCredentials();
      const res = await fetch('/api/start', { method: 'POST' });
      const data = await res.json();
      if (res.ok) {
        setIsBotRunning(true);
      } else {
        alert(data.error || 'Failed to start bot');
      }
    } catch (err) {
      alert('Error starting bot');
    } finally {
      setLoading(false);
    }
  };

  const stopBot = async () => {
    setLoading(true);
    try {
      const res = await fetch('/api/stop', { method: 'POST' });
      if (res.ok) {
        setIsBotRunning(false);
      } else {
        const data = await res.json();
        alert(data.error || 'Failed to stop bot');
      }
    } catch (err) {
      alert('Error stopping bot');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10">
      <h2 className="text-xl font-semibold mb-4 text-[#6666ff]">Bot Control</h2>
      <div className="space-y-4">
        <input
          type="text"
          placeholder="GUEST ID"
          value={guestId}
          onChange={(e) => setGuestId(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#6666ff]"
        />
        <input
          type="password"
          placeholder="GUEST PASSWORD"
          value={guestPassword}
          onChange={(e) => setGuestPassword(e.target.value)}
          className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white focus:outline-none focus:ring-2 focus:ring-[#6666ff]"
        />
        <div className="flex gap-4">
          <button
            onClick={startBot}
            disabled={loading || isBotRunning}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              isBotRunning
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-gradient-to-r from-[#ff6666] to-[#6666ff] hover:opacity-90'
            }`}
          >
            {loading ? '...' : 'Start Bot'}
          </button>
          <button
            onClick={stopBot}
            disabled={loading || !isBotRunning}
            className={`flex-1 py-2 rounded-lg font-semibold transition ${
              !isBotRunning
                ? 'bg-gray-600 cursor-not-allowed'
                : 'bg-red-600 hover:bg-red-700'
            }`}
          >
            Stop Bot
          </button>
        </div>
      </div>
    </div>
  );
}
