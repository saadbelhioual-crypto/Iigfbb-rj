'use client';

import { useState, useEffect, useRef } from 'react';

export default function Terminal() {
  const [logs, setLogs] = useState<string[]>([]);
  const [eventSource, setEventSource] = useState<EventSource | null>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Connect to SSE stream for real-time logs
    const es = new EventSource('/api/stream_logs');
    setEventSource(es);

    es.onmessage = (event) => {
      const newLog = event.data;
      setLogs((prev) => [...prev, newLog]);
    };

    es.onerror = () => {
      console.error('SSE connection error');
      es.close();
    };

    return () => {
      es.close();
    };
  }, []);

  // Auto-scroll to bottom when new logs arrive
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [logs]);

  const clearLogs = async () => {
    try {
      await fetch('/api/clear_logs', { method: 'POST' });
      setLogs([]);
    } catch (err) {
      console.error('Failed to clear logs', err);
    }
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-4 border border-white/10">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-semibold text-[#ff6666]">Terminal Output</h2>
        <button
          onClick={clearLogs}
          className="px-3 py-1 bg-gray-800 hover:bg-gray-700 rounded-lg text-sm transition"
        >
          Clear Terminal
        </button>
      </div>
      <div
        ref={terminalRef}
        className="terminal-scroll bg-black/60 rounded-lg p-3 h-80 overflow-y-auto font-mono text-sm text-green-300"
      >
        {logs.length === 0 ? (
          <p className="text-gray-500">Waiting for bot logs...</p>
        ) : (
          logs.map((log, idx) => (
            <div key={idx} className="border-b border-gray-800 py-1">
              <span className="text-gray-400 mr-2">{`[${new Date().toLocaleTimeString()}]`}</span>
              {log}
            </div>
          ))
        )}
      </div>
    </div>
  );
}
