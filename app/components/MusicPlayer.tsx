'use client';

import { useState, useRef } from 'react';

export default function MusicPlayer() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const toggleMusic = () => {
    if (!audioRef.current) {
      audioRef.current = new Audio('/ambient.mp3');
      audioRef.current.loop = true;
    }
    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play().catch(e => console.error('Audio play failed:', e));
    }
    setIsPlaying(!isPlaying);
  };

  return (
    <div className="bg-black/40 backdrop-blur-md rounded-2xl p-6 border border-white/10 flex items-center justify-between">
      <span className="text-lg">🎵 Background Music</span>
      <button
        onClick={toggleMusic}
        className={`px-6 py-2 rounded-lg font-semibold transition ${
          isPlaying
            ? 'bg-[#ff6666] hover:bg-red-500'
            : 'bg-[#6666ff] hover:bg-blue-500'
        }`}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );
}
