import { useState, useEffect, useRef, useMemo } from 'react';

const Index = () => {
  const [isFlashing, setIsFlashing] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const snowflakes = useMemo(() => {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i,
      left: Math.random() * 100,
      delay: Math.random() * 5,
      duration: 5 + Math.random() * 10
    }));
  }, []);

  useEffect(() => {

    const bgAudio = new Audio('https://cdn.pixabay.com/audio/2022/11/23/audio_97983ba9f5.mp3');
    bgAudio.loop = true;
    bgAudio.volume = 0.5;
    bgAudio.play().catch(err => console.log('Background music play failed:', err));
    audioRef.current = bgAudio;

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
    };
  }, []);

  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = volume;
    }
  }, [volume]);

  const playRocketSound = () => {
    const audio = new Audio('https://assets.mixkit.co/active_storage/sfx/2158/2158-preview.mp3');
    audio.volume = 0.6;
    audio.play().catch(err => console.log('Audio play failed:', err));
    
    setIsFlashing(true);
    setTimeout(() => setIsFlashing(false), 300);
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <div 
        className="absolute inset-0 z-0 transition-opacity duration-300"
        style={{
          background: 'linear-gradient(135deg, #CE422B 0%, #1A1A1A 50%, #884513 100%)',
          opacity: isFlashing ? 0.3 : 1,
        }}
      />
      
      {isFlashing && (
        <div 
          className="absolute inset-0 z-0 animate-pulse"
          style={{
            background: 'radial-gradient(circle, rgba(255,140,0,0.8) 0%, rgba(206,66,43,0.4) 50%, transparent 100%)',
          }}
        />
      )}

      {snowflakes.map((flake) => (
        <div
          key={flake.id}
          className="absolute text-white opacity-70 pointer-events-none"
          style={{
            left: `${flake.left}%`,
            top: '-10px',
            animation: `fall ${flake.duration}s linear infinite`,
            animationDelay: `${flake.delay}s`,
            fontSize: `${Math.random() * 10 + 10}px`,
          }}
        >
          ❄
        </div>
      ))}

      <style>{`
        @keyframes fall {
          to {
            transform: translateY(100vh) translateX(${Math.random() * 100 - 50}px);
          }
        }
      `}</style>
      
      <div className="relative z-10 flex flex-col items-center justify-center gap-20">
        <p 
          className="text-2xl font-bold tracking-wide text-[#E8E8E8] drop-shadow-lg"
          style={{ fontFamily: 'Montserrat, sans-serif' }}
        >
          CHEATERS ARE BAD
        </p>
        
        <div 
          className="flex flex-col items-center gap-2 cursor-pointer select-none transition-transform hover:scale-105 active:scale-95"
          onClick={playRocketSound}
        >
          <h1 
            className="text-7xl font-black tracking-wider text-[#E8E8E8] drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)]"
            style={{ fontFamily: 'Montserrat, sans-serif' }}
          >
            SENIOR
          </h1>
          <div className="flex items-center gap-4">
            <h2 
              className="text-7xl font-black tracking-wider text-[#E8E8E8] drop-shadow-[0_4px_20px_rgba(206,66,43,0.5)]"
              style={{ fontFamily: 'Montserrat, sans-serif' }}
            >
              MODERATOR
            </h2>
            <img 
              src="https://cdn.poehali.dev/files/50deea39-8a1a-4189-ac12-3da18238a504.jpg" 
              alt="Rust Logo"
              className="w-20 h-20 object-contain drop-shadow-2xl"
            />
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex items-center gap-4 bg-black/30 backdrop-blur-sm px-6 py-3 rounded-full">
        <span className="text-white text-sm">🔊</span>
        <input
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={(e) => setVolume(parseFloat(e.target.value))}
          className="w-32 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
          style={{
            background: `linear-gradient(to right, #CE422B 0%, #CE422B ${volume * 100}%, #4a4a4a ${volume * 100}%, #4a4a4a 100%)`
          }}
        />
        <span className="text-white text-sm">{Math.round(volume * 100)}%</span>
      </div>
    </div>
  );
};

export default Index;